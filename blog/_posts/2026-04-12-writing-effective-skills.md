---
layout: post
title: "Agentic Software Engineering Series: Writing Effective Skills"
series: "Agentic Software Engineering"
date: 2026-04-12
reading_time: 2
slug: writing-effective-skills
excerpt: ""
---

> **Note:** This post is a work in progress and will be updated over time.

Software Engineering as we see it today is slowly transforming itself towards a more Agentic workflow. This is not new; there was a time where software was packaged and manually SCP'd into individual servers and executed. We have automated that process and it is now part of our SDLC phase called CI/CD.

What was a manual process earlier slowly automated by writing Terraform or Helm scripts that can be configured and deployed using a single-click operation. We are seeing a similar shift happening in the process of writing code itself - what used to be a manual process involving IDEs is now being done through Agents.

## Agent and Agentic Loop

At their core, an Agent is a loop that runs continuously - capturing user instructions and executing operations on an environment (local or remote) using tools. Tools are simply pre-configured operations on that environment. The so-called magic is making this loop as efficient as possible.

### The LLM as Decision Engine

LLMs play an important role in the agentic loop. They serve as the core inference engine - determining what instructions to capture, which tools to call, and how to execute them.

A simple example of an agentic loop:

```python
while True:
    user_instruction: str = await capture_user_instruction()
    tool_calls: list[Callable] = await engine.get_required_tools()
    for tool_fn in tool_calls:
        # execute tool
```

From the above example, you can see that the instruction capture is performed outside of the engine but the tool-calling operations are controlled by the engine (LLM in our case). This process can be done without an LLM by simply having a pre-defined rules engine and pattern matching - but LLMs bring flexibility and natural language understanding that static rules cannot. The goal of agentic development is continuously making this loop work efficiently.

So how do we make this loop efficient? One key mechanism is skills - which enable specialized agent behaviors for specific tasks.

### Skills

Skills are composable, reusable prompts that define how an agent should behave during specialized workflows. They are invoked on-demand - loaded into the agent's context only when a matching task is detected.
