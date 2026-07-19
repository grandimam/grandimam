---
layout: post
topic: python
title: "Part I: Foundation"
series: "Building Python ASGI Framework"
date: 2026-03-27
reading_time: 2
slug: foundation
excerpt: "Understanding ASGI - the Asynchronous Server Gateway Interface that defines how servers communicate with Python applications."
---

ASGI stands for Asynchronous Server Gateway Interface. It is the interface (or protocol) that defines how a server hands off requests to an application and how that application responds.

The server part maybe confusing for some, so lets define it. A server is an application on our end that listens to HTTP requests. In our case, its Uvicorn. In contrast, a client is either a browser or any application that sends us the request.

An example of how we run server on our side (in FastAPI):

```python
uvicorn main:app --reload
```

Lets take a moment to understand what is happening? Uvicorn is an application server (similar to Tomcat for Java) that listens to TCP connections from the client, and calls a coroutine inside the main.py module. Following is an example of ASGI main.py module:

```python
# main.py

async def app(...):
    ...
```

The app from the above example is an async function (or a co-routine) that is will be awaited by the uvicorn server. We do not need to know or understand how that is done, we simply need to ensure that we have an app or some other async function that satisties the ASGI protocol. You can might as well do:

```python
# main.py

async def example(...):
    ...
```

And run the uvicorn server using the following command:

```bash
uvicorn main:example --reload
```

## Components

Our 'app' co-routine has the following components or parameters:

- **scope: Dict** - request info (path, method, headers)
- **receive: Callable** - reads incoming body/events
- **send: Callable** - sends response back

Client sends a request. Our server listens to requests and invokes the app (coroutine) - which is an async co-routine that define how an application must listen and respond to HTTP requests.

```python
async def app(scope, receive, send):
    ...
```

Note, the app doesn't have any return value. We receive an event, parse it, then send (or respond) to those events.

## What's Next

Now that you understand the basics, let's write some code. In the [next lesson](/posts/hello-world/), we'll build a simple "Hello, World!" ASGI application.
