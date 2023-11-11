# Python 协程

::: info 参考

[官方文档术语对照表](https://docs.python.org/zh-cn/3/glossary.html#term-coroutine)

:::

## 1. 协程

协程是子例程的更一般形式。

子例程可以在某一点进入并在另一点退出。协程则可以在许多不同的点上进入、退出和恢复。它们可通过 [async def](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#async-def) 语句来实现。参见 [PEP 492](https://www.python.org/dev/peps/pep-0492) 。

- *@3.5+* **协程**（coroutine）可以在多个位置上挂起和恢复执行
- `await` 表达式，`async for` 以及 `async with` 只能在协程函数体中使用
- 使用 `async def` 语法定义的函数总是为协程函数，即使它们不包含 `await` 或 `async` 关键字
- 在协程函数体中使用 `yield from` 表达式将引发 `SyntaxError`

详细解释见 [官方文档语言参考手册](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#coroutines)。

## 2. 协程函数

返回一个 [`Coroutine`](https://docs.python.org/zh-cn/3/glossary.html#term-coroutine) 对象的函数。

协程函数可通过 [`async def`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#async-def) 语句来定义，并可能包含 [`await`](https://docs.python.org/zh-cn/3/reference/expressions.html#await)、[`async for`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#async-for) 和 [`async with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#async-with) 关键字。这些特性是由 [PEP 492](https://www.python.org/dev/peps/pep-0492) 引入的。

## 3. PEP 492

PEP 是 Python 语言发展的提案。

[PEP 492](https://www.python.org/dev/peps/pep-0492) 提出使用 `async` 和 `await` 语法实现协程，将协程作为 Python 中的一个正式的单独概念，并增加相应的支持语法。

该提案在 Python 3.5 版本实现。
