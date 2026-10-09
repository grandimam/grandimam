---
title: About
permalink: /about/
updated: 2026-10-10
description: "Fauzan Baig is a software engineer who builds things to understand them: Python and HTTP systems, agentic software engineering, and the work of building software."
---

<header class="about-header">
  <h1 class="about-title">I build things I wish existed.</h1>
  <p class="about-intro">I’m Fauzan Baig, a software engineer since the late 2010s, mostly working on Python backends. I learn by building, and I don’t trust that I understand something until I’ve built it myself.</p>
</header>

<section class="about-section" aria-labelledby="about-understanding">
  <h2 id="about-understanding">Understanding over output</h2>
  <div class="prose">
    <p>Most of what I build comes from the same itch. I wrote an ASGI framework to see where routing and validation overhead actually come from. I’m building an HTTP framework because I want to know what happens between a connection arriving and a response leaving. I made a tool to help me understand what AI wrote, and another for building a curriculum and proving you’ve learned it.</p>
    <p>I write a lot of code with AI agents, more than 200K lines in the past year. That has made me more interested in understanding, not less. When code is cheap, the scarce things are judgment, knowing what’s worth building, and being able to tell whether it’s any good.</p>
    <p>I start a lot of things and some don’t last. When an experiment has taught me what it can, I say so and move on to the next one.</p>
  </div>
</section>

<section class="about-section" aria-labelledby="about-now">
  <h2 id="about-now">Now</h2>
  <div class="prose">
    <p><a class="inline-link" href="https://github.com/grandimam/karak">Karak</a> is an HTTP framework for free-threaded Python. I want to own the whole request path: server, execution model, routing, and application code, designed together. The questions I keep returning to: where does a request wait, what owns its resources, and what happens when it times out or the client disconnects? It’s still experimental, and I write up the decisions here as I make them.</p>
    <p>Alongside it I’m working on <a class="inline-link" href="https://github.com/grandimam/wy">wy</a> and <a class="inline-link" href="https://github.com/grandimam/loha">loha</a>. Everything else I’ve built is on the <a class="inline-link" href="{{ '/projects/' | relative_url }}">projects</a> page.</p>
    <p class="about-updated">Updated <time datetime="{{ page.updated | date_to_xmlschema }}">{{ page.updated | date: "%B %Y" }}</time></p>
  </div>
</section>

<section class="about-section" aria-labelledby="about-writing">
  <h2 id="about-writing">What I write about</h2>
  <ul class="about-topics">
    {% for t in site.topics %}
      {% assign t_count = site.posts | where: "topic", t.name | size %}
      {% if t_count > 0 %}
        <li><a class="inline-link" href="{{ '/' | append: t.name | append: '/' | relative_url }}">{{ t.title }}</a>: {{ t.description }}</li>
      {% endif %}
    {% endfor %}
  </ul>
  <div class="prose">
    <p>I write the way I build: in the open and before everything is figured out. Some posts are finished arguments, others are notes from the middle of the work.</p>
  </div>
</section>


<section class="about-section" aria-labelledby="about-contact">
  <h2 id="about-contact">Elsewhere</h2>
  <div class="prose">
    <p><a class="inline-link" href="https://github.com/{{ site.social.github }}">GitHub</a> · <a class="inline-link" href="https://twitter.com/{{ site.social.twitter }}">X (@{{ site.social.github }})</a> · <a class="inline-link" href="{{ '/feed.xml' | relative_url }}">RSS</a></p>
  </div>
</section>
