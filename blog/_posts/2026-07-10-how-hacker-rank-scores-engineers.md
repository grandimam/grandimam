---
layout: post
title: "How HackerRank Scores Engineers"
date: 2026-07-10
reading_time: 7
slug: how-hacker-rank-scores-engineers
excerpt: "The hardest part of building an LLM scoring tool isn't the model — it's the rubric. HackerRank open-sourced theirs. I read it, ran it, and faked a few resumes to test it."
---

I have been doing my goal-setting, KPIs, and feedback assessments through LLMs. The hardest part was designing the scoring mechanism. When HackerRank open-sourced their [Hiring Agent](https://github.com/interviewstreet/hiring-agent), I wanted to understand how they had solved the same problem — and what biases their rubric encodes.


[Hiring Agent](https://github.com/interviewstreet/hiring-agent) is an LLM-based resume scoring tool that parses a PDF, enriches it with GitHub and blog data, and returns a score. It's straightforward to run — clone the repo, point it at a PDF:

```bash
$ git clone https://github.com/interviewstreet/hiring-agent
$ cd hiring-agent
$ python3 score.py /examples/java-engineer.pdf
```

The tool returns a structured score:

```bash
================================================================================
📊 RESUME EVALUATION RESULTS FOR: Senior Java Engineer
================================================================================

🎯 OVERALL SCORE: 71.0/100
🌐 Open Source:          12/35
🚀 Self Projects:        18/30
🏢 Production Experience: 25/25
💻 Technical Skills:      8/10

✅ KEY STRENGTHS:
------------------------------
  1. Microservices Architecture
  2. Event-Driven Systems
  3. Cloud Technologies
  4. Database Optimization
  5. API Design

🔧 AREAS FOR IMPROVEMENT:
------------------------------
  1. Lack of Open Source Contributions
  2. Limited GitHub Activity
  3. No Publicly Available Projects
```

I first provided it with a Senior Java Engineer resume. Though the profile has a near-perfect score on production experience and technical skills, the tool still evaluated the candidate at 71. I wanted to get a deeper understanding of how this tool was doing the scoring:

## 1. Resume Parsing

It starts in `score.py` where the PDF is handed off to a `PDFHandler`:

**score.py:251-252**
```python
pdf_handler = PDFHandler()
resume_data = pdf_handler.extract_json_from_pdf(pdf_path)
```

Inside extract_json_from_pdf, the PDF is parsed using PyMuPDF and converted to Markdown:

**pdf.py:54-57**
```python
resume_text = to_markdown(
    doc,
    pages=pages,
)
```

The Markdown content is then normalised into structured JSON - an internal schema (basics, work, education, skills, projects, awards) that represents the content of the resume. The normalisation step is important as it allows the tool to take in any resume regardless of the layout and represent it into a strict internal format. Now, parsing the resume from PDF to Markdown is not a foolproof step, in case of multi-column sections direct Markdown conversion is unreliable.

Let's take an example of this resume:

![Resume evaluation pipeline output](/assets/images/multi-column-resume.png)

The Markdown parser reads left-to-right, so the content is incorrectly extracted as:

**Coding, Framework, Messaging, Database, Observability, Containers, Patterns, Cloud, Java, Python...**

How well the LLM recovers from this depends on the model used. A more concrete solution would be to screenshot the resume and let the model parse it directly, rather than converting to Markdown first - similar to how Claude/Codex parses websites. The sections are then extracted individually using specialized prompts, each being an LLM call to the model. 

## 2. Scoring Criteria

Almost all the intelligence is prompts, available in `prompts/templates/` directory. Python is merely used in orchestration and plumbing. 

```
"basics": "basics.jinja",
"work": "work.jinja",
"education": "education.jinja",
"skills": "skills.jinja",
"projects": "projects.jinja",
"awards": "awards.jinja",
"system_message": "system_message.jinja",
"github_project_selection": "github_project_selection.jinja",
"resume_evaluation_criteria": "resume_evaluation_criteria.jinja",
"resume_evaluation_system_message": "resume_evaluation_system_message.jinja",
```

`resume_evaluation_system_message.jinja` and `resume_evaluation_criteria` help evaluate the scoring. The other prompts are primarily for resume parsing capability. The scoring criteria in `resume_evaluation_criteria` is heavily biased towards individuals with open-source projects and contributions:

```
### Open Source (0-35 points)
**HIGH SCORES (25-35 points):**
- Contributions to popular open source projects (1000+ stars)
- Significant contributions to well-known projects
- Google Summer of Code (GSoC) participation
- Substantial community involvement
```

There are explicit rules that mention what projects are considered open-source and what are not.

```
**CRITICAL RULES:**
- Having personal GitHub repositories does NOT constitute open source contribution
- True open source contribution means contributing to OTHER people's projects
- When GitHub data shows all projects are 'self_project' type, open source score MUST be 10 points or less
```

And one that interested me most was the following rule: 

```
**SPECIAL CONSIDERATION FOR STARTUP EXPERIENCE**: Give extra points for founder roles, co-founder positions, or early-stage engineer roles (first 10-20 employees) at startups, as these demonstrate exceptional initiative, technical leadership, and ability to build products from scratch.
```

### Testing the Bias

The prompt says to reward founder and early-stage roles. I wanted to know: does it actually? I took the same resume and changed only the job titles. Three versions:

- [Senior Java Engineer](/assets/pdfs/java-engineer.pdf)
- [Founding Engineer](/assets/pdfs/founding-engineer.pdf) - same resume, title swapped
- [Co-founder / CTO](/assets/pdfs/co-founder.pdf) - same resume, title swapped again

Everything else stayed identical: same skills, same projects, same experience. The only variable was the job title.

The results were underwhelming. The production score moved from 22 to 23 out of 25 in some iterations. The CTO title landed in the same range. I ran it multiple times with different titles, and the production score consistently sat between 20-23 regardless of what I put.

This tells two things. First, the LLM is resistant to title changes. Second, the rubric's emphasis on startup roles is more aspiration than enforcement. The prompt says to give extra points, but the model doesn't consistently apply them. A prompt rule is a suggestion, not a guarantee.

A deeper look into the criteria also rewarded the following:

```
- +3-5 points for startup founder/co-founder experience
- +2-3 points for early-stage engineer experience (first 10-20 employees at a startup)
- +2 points for portfolio website (GitHub URL in basics.url)
- +1 point for LinkedIn profile
```

Being a LinkedIn user is worth 1 point. Being a GSoC participant is worth 5. Now, apart from prompts there are rules explicitly coded wherein it checks for repo popularity:

**github.py:234**

```python
for repo in repos_data:
    if repo.get("fork") and repo.get("forks_count", 0) < 5:
        continue
```

Drops forks with fewer than 5 forks, filtering out drive-by forks of popular repos. These are opinions stated as rules.

## What I Learned

The Hiring Agent is a decently-engineered prototype. The problem is someone decided open source is 35% of an engineer's value; four commits is the threshold for "meaningful" contribution. Someone decided a LinkedIn profile is worth exactly 1 point. These are judgment stated as rules.

This is the same problem I was trying to solve in my own tool. The hard part of LLM-based scoring isn't the model, the parsing, or the pipeline. It's deciding what matters. Once you define it in the prompt, you have made a value judgment and the model will try to enforce it.

## A Caveat

The git history is also interesting. The active development spans 77 days (July 29 to October 15, 2025) followed by a 231-day silence, then a handful of cleanup commits in June 2026 before open-sourcing. The commit patterns look like a burst of internal hackathon or intern work, not a sustained effort.

This matters because the company that is open-sourcing the project is one of the players in the domain. The criteria defined: open source at 35%, technical skills at 10% feels like someone's first draft and not a thoroughly validated hiring framework. There are inconsistencies also in the project that highlight that these are the rough edges of a prototype, not a production system. This tool must be used with caution as it's a first attempt at LLM-based hiring looks like, before it's been tested against thousands of real candidates and calibrated by recruiting teams. 
