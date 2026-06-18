---
layout: post
title: "Speed is Cheap, Capability is Expensive"
series: "Agentic Software Engineering"
date: 2026-06-19
reading_time: 3
slug: speed-is-cheap-capability-is-expensive
excerpt: "After 8+ months of heavy agentic coding, here is how I think about LLM costs and capability."
---

## The 80/20 of LLM Costs

Here is how I have come to think about LLMs after 8+ months of heavy agentic coding (200K+ lines, 30 PRs a month). If you are already strong in your tooling, a large chunk of the agentic advantage disappears. The model moves away from compensating for gaps in my knowledge, and just optimizing for speed.

And low-cost models deliver that same speed at a fraction of the price. I hit my quarterly KPIs buying the frontier models for only 20-30% of the work. The remaining 70-80% that fills most of my quarter - features, code reviews, bug fixes, hot fixes, general platform maintenance - runs fine on low-cost models (Qwen, Kimi, etc.). The most capable model only earns its worth on that 20-30% tied to quarterly goals, which matches exactly what I have seen tracking my own KPIs.

## The Harness Problem

So paying $200 to run mostly Haiku-tier work is over-subscribing. I am paying for capability I have already built the expertise around. The harness is limiting too. Claude Code works well when I want everything pre-baked and it is great for someone new to agentic development, but for any real customization, it falls short.
