---
layout: post
title: "Part I: Foundation"
series: "Building Python ASGI Framework"
date: 2025-03-27
reading_time: 2
slug: foundation
excerpt: "Understanding ASGI - the Asynchronous Server Gateway Interface that defines how servers communicate with Python applications."
---

ASGI stands for Asynchronous Server Gateway Interface. It is the contract (or interface or protocol) that defines how a server hands off requests to an application and how that application responds.

Let's take a step back for a moment, you must have come across Python applications being executed using the following command.

```bash
uvicorn main:app --reload
```

What does it mean, and how does it work? Uvicorn is an application server (similar to Tomcat if you are coming from Java) that listens to TCP connections from the client, and simply calls app (coroutine) inside your main.py module.

This is an example of ASGI main.py module:

```python
# main.py

async def app(...):
    ...
```

Now, this app function (co-routine) is the interface (or contract) that is responsible for accepting and responding to your HTTP requests.

## Components

Clients send us a request. We have uvicorn server running on our side that listens to those requests and invokes the app (coroutine). The app coroutine is simply an async function with a few parameters that define how an application must listen and respond to HTTP requests (or events).

There are three main components of ASGI - scope, receive, and send. It's simply a coroutine that the server waits on for response.

```python
async def app(scope, receive, send):
    ...
```

- **scope** - request info (path, method, headers)
- **receive** - reads incoming body/events
- **send** - sends response back

Note, the app doesn't have any return value. It's entirely event-based. Frameworks receive an event, parse it, then send (or respond) to those events.

## What's Next

Now that you understand the basics, let's write some code. In the [next lesson](/posts/hello-world/), we'll build a simple "Hello, World!" ASGI application.
