---
layout: post
title: "Part II: Hello World"
series: "Building Python ASGI Framework"
date: 2026-03-28
reading_time: 2
slug: hello-world
excerpt: "Build your first ASGI application - a simple Hello World server that responds to all requests."
---

Let's build a simple ASGI app - one that returns "Hello, World!" for all requests and paths.

```python
async def app(scope, receive, send):
    if scope["type"] == "http":
        await send({
            "type": "http.response.start",
            "status": 200,
            "headers": [(b"content-type", b"text/plain")],
        })
        await send({
            "type": "http.response.body",
            "body": b"Hello, World!",
        })
```

That's the complete ASGI application. As mentioned in the [previous lesson](/posts/foundation/), ASGI is event-based - `http.response.start` and `http.response.body` are two such event types.

## Implementation

As highlighted in [Foundation](/posts/foundation/), the scope represents request info that doesn't change for the overall lifecycle of that request. The scope is a dict that has many items, but for now let's only worry about `type` which can be one of the following - http, lifespan, or websocket.

> A small tangent here - what's the difference between WSGI and ASGI? WSGI is synchronous - one request in, one response out. ASGI is async and event-based, which allows it to handle long-lived connections like WebSockets.

## The Response Events

We send two events to complete an HTTP response:

**`http.response.start`** - Sends the status code and headers. Must be sent first.

- `status` - HTTP status code (200, 404, 500, etc.)
- `headers` - list of `(name, value)` tuples, both as bytes

**`http.response.body`** - Sends the actual content.

- `body` - the response body as bytes

That's the minimum. Status and headers first, then body.

## Run It

Save the code in a file called `main.py` and run:

```bash
uvicorn main:app --reload
```

Open `http://127.0.0.1:8000` in your browser or use curl:

```bash
curl http://127.0.0.1:8000
```

You should see:

```text
Hello, World!
```

Try any path - `/foo`, `/bar/baz` - you'll get the same response. We're not doing any routing yet.

## What's Next

This works, but it's not very useful. In the next lesson, we'll look at what's inside `scope` and how to read the request path, method, and headers.
