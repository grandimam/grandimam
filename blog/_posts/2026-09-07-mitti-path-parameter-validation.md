---
layout: post
topic: projects
title: "Mitti: Path Parameter Validation"
date: 2026-09-07
reading_time: 1
slug: introducing-mitti
excerpt: "I have been experimenting with a small ASGI web server called Mitti to better understand routing, validation, and framework overhead."
---

I have been experimenting with building a small ASGI web server called **Mitti**.

The goal is not to replace FastAPI overnight, but to better understand how routing, validation, and framework overhead work under the hood.

I just added path parameter validation.

So when a request hits something like `/users/1234`, Mitti can extract `1234`, convert it to the expected type, validate it, and reject bad input before it reaches the handler.

I ran a quick benchmark:

```bash
hey -n 10000 -c 100 http://127.0.0.1:8001/users/1234
```

Results:

- Mitti: ~14K requests/sec
- FastAPI: ~10K requests/sec

In this specific test, Mitti is about 40% faster, even with validation enabled.

Still experimental. Not production ready. But a useful way to learn ASGI internals.

Code: [github.com/grandimam/mitti](https://github.com/grandimam/mitti/)
