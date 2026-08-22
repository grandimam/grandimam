---
layout: post
topic: opinions
title: "Does Python Still Need to Be Async-First?"
date: 2026-08-22
reading_time: 3
slug: does-python-still-need-to-be-async-first
---

If you are building APIs in Python that handle a lot of concurrent I/O, the standard answer today is often `asyncio` or a framework built around it. As a result, application code increasingly looks like this:

```python
async def get_user():
    user = await repository.get_user()
    return user
```

The `async` keyword turns the function into a coroutine, allowing its execution to be cooperatively scheduled by an event loop.

For I/O-bound applications, this model works well. While one coroutine is waiting for the network, database, or filesystem, another can make progress. The problem with this is that it forces one particular type of programming model, and you'd need a sort of escape hatch in case you want to do CPU computation. 

## Async Programming Model

Once an operation becomes asynchronous it tends to propagate through the call stack.

```python
async def get_user():
    return await repository.get_user()
```

The above code is asynchronous, it forces its caller to be asynchronous as well:

```python
async def handle_request():
    user = await get_user()
```

And the caller of that function may need to be asynchronous too. This is often called **function coloring**: synchronous and asynchronous functions effectively belong to different worlds, and crossing between them requires explicit machinery.

For I/O-heavy workloads, the trade-off can be acceptable. But `asyncio` doesn't make CPU-bound Python code parallel. If a coroutine performs substantial CPU work without yielding, it blocks the event-loop thread and prevents other coroutines on that loop from making progress.

## Escaping GIL

Traditional CPython has the **Global Interpreter Lock (GIL)**.

The GIL means that, within a single interpreter, only one thread can execute Python bytecode at a time. So threads can provide excellent concurrency for many I/O workloads, but they traditionally haven't provided true parallel execution of Python code.

For CPU-bound parallelism, Python applications have commonly turned to multiple processes, native extensions, or other mechanisms. 

Since Python 3.13, we now have a free-threaded build where the GIL can be disabled. This completely changes the assumption that has shaped Python architecture for a long time: **multiple threads can execute Python code in parallel.**

So, if we are moving towards this as a default architecture, shouldn't the application level also support this by default?

### What If?

What if application code stayed synchronous, while the framework owned the concurrency and parallelism?

Instead of writing:

```python
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return await users.get(user_id)
```

what if we simply wrote:

```python
@app.get("/users/{user_id}")
def get_user(user_id: int):
    return users.get(user_id)
```

The developer describes **what the application does**. The framework decides **how to execute it**. On traditional GIL-enabled Python, that could mean executing requests concurrently using threads.

On free-threaded Python, the same application model could potentially execute independent Python workloads in parallel. The application itself doesn't need to change.

## An Experiment: [Mitti](https://github.com/grandimam/mitti)

I am building a small ASGI framework called **mitti** to explore this idea. The central premise is simple:

> **Application code should be synchronous by default. Concurrency and parallelism should be concerns of the execution layer.**

It is still very early. I am deliberately building the core pieces from first principles: request handling, routing, execution, dependency injection, validation, middleware, and the other machinery required by a modern Python web framework.

The goal isn't simply to build another FastAPI. I am interested in a more fundamental question: **What should a Python web framework look like in a free-threaded world?**

[Mitti is my attempt to find out](https://github.com/grandimam/mitti)
