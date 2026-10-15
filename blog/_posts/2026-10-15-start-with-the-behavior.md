---
title: "Start with the behavior, then build what it needs"
topic: python
excerpt: "Adding None-aware attribute access to my CPython fork is one example of how I work backward from an outcome to the systems needed to make it possible."
---

I believe the value of software comes from the outcomes it makes possible. That belief shapes how I want to build: start with something I want software to do, then work backward to understand what needs to exist.

Sometimes the work stays inside an application. Sometimes it leads into a framework, a runtime, or the language itself.

One example is my experimental CPython fork. In [this commit](https://github.com/grandimam/cpython/commit/65d26c4e728cf1cc97357be4ebe9ec3a163e8692), I added `?.`, a None-aware attribute access operator. It is an experiment in my fork, not a feature available in official Python.

## The behavior I wanted

Suppose a response might be absent, and its customer might also be absent. If either is `None`, I want the result to be `None`. Otherwise, I want the customer's name in lowercase.

In ordinary Python, one way to express that is:

```python
name = None
if response is not None:
    customer = response.customer
    if customer is not None:
        name = customer.name.lower()
```

In my fork, I can express it as:

```python
name = response?.customer?.name.lower()
```

This assumes an existing customer has a string name. If the name can also be `None`, that boundary needs its own guard:

```python
name = response?.customer?.name?.lower()
```

Each `?.` checks the value on its left. When that value is `None`, the remaining attribute accesses, subscriptions, and calls in the chain are skipped, and the chain produces `None`.

That last part matters. Consider:

```python
result = response?.send(build_payload())
```

If `response` is `None`, `build_payload()` must never run. Returning `None` after evaluating the arguments would produce a different behavior, especially if building the payload has side effects.

## Working backward through CPython

The desired behavior creates requirements at several layers.

The tokenizer needs to recognize `?.` as a token. The grammar needs to accept it as attribute access. The AST needs to represent it, so the compiler can distinguish it from ordinary `.` access.

The commit adds a `QUESTIONDOT` token and a `NoneAwareAttribute` AST node. It also updates AST validation, scope analysis, token names, and unparsing. A language feature needs to remain understandable to the tools that inspect and reproduce Python code.

The compiler is where the short-circuiting becomes concrete. It detects a chain containing None-aware access and compiles its links with a shared destination to skip to. At each `?.`, it copies the current value and emits a `POP_JUMP_IF_NONE`. If the check succeeds, execution jumps past the rest of the chain with `None` still on the stack.

This uses existing bytecode instructions. The new syntax requires changes to how the compiler constructs control flow, without introducing a new interpreter instruction.

The result I wanted was a small expression. Making that expression meaningful required following it through the system.

## Defining what counts as correct

The happy path is only part of the behavior. The boundaries need to be explicit too.

Only `None` short-circuits. Empty strings and zero still support ordinary attribute access:

```python
''?.upper()     # ''
(0)?.real      # 0
```

The operator also preserves ordinary errors when the receiver exists. It does not turn a missing attribute into `None`.

Short-circuiting ends at the chain. With `x = None`, this still attempts to add `None` and `1`:

```python
x?.a + 1
```

Assignment and deletion through the operator are rejected. Reading through a possibly absent value does not, by itself, define what writing through that value should mean.

The commit includes tests for chained access, skipped arguments and subscript expressions, false values other than `None`, invalid syntax, tokenization, and AST unparsing. Those cases turn an appealing example into a more precise contract. They do not establish that the feature is ready for production or belongs in upstream Python.

## Why this fits what I am exploring

This is a language experiment, and it reflects the same approach that draws me to autonomous systems.

I want to start with a capability and discover its requirements. For None-aware access, that leads into grammar, representation, control flow, and tests. For a system pursuing a goal over time, it leads into state, decisions, execution, recovery, and verification.

The implementation changes with the problem. The question I keep returning to is the same: what needs to exist for this outcome to become possible, and how will I know it works?

That is what I want this blog to document. An idea becomes more useful to me when I can build it, examine its behavior, and discover where my understanding was incomplete.
