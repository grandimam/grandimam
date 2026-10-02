---
layout: page
title: About
permalink: /about/
description: "My vision for Karak: owning and understanding the HTTP request path, from connection to response."
---

<header class="about-header">
  <p class="eyebrow">About</p>
  <h1 class="about-title">Owning the HTTP stack.</h1>
  <p class="about-intro">I’m Fauzan Baig, known online as grandimam. I’m building Karak to own and understand the HTTP request path, from connection to response.</p>
</header>

<section class="about-section" aria-labelledby="about-building">
  <h2 id="about-building">My vision for Karak</h2>
  <div class="prose">
    <h3><a class="inline-link" href="https://github.com/grandimam/karak">Karak</a></h3>
    <p>I want to understand what happens between a connection arriving and a response leaving, and have the freedom to shape that path. That means thinking about the server, execution model, routing, and application code together.</p>
    <p>The boundaries between those layers matter. Where does a request wait? What owns its resources? What happens when it times out or the client disconnects? I want to be able to trace those decisions through the stack and make their behavior explicit.</p>
    <p>Owning the stack gives me room to question the assumptions each layer inherits. It lets me explore how concurrency, performance, and the experience of writing an application influence one another.</p>
    <p>This is the direction I want to take Karak. It is still experimental; the complete stack is an ambition I’m working toward. This blog is where I’ll share the implementation decisions, experiments, and lessons along the way.</p>
  </div>
</section>

<section class="about-section" aria-labelledby="about-framework">
  <h2 id="about-framework">How I operate</h2>
  <div class="prose">
    <p class="about-principles">Build judgment. Make things happen. Take bigger bets. Make others care. Build what compounds.</p>
    <p>These principles guide what I pursue and how I approach my work.</p>
    <p><a class="inline-link" href="{{ '/framework/' | relative_url }}">Read my framework</a></p>
  </div>
</section>
