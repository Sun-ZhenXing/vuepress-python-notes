# Python 异步编程

::: info 转载

原文链接：[阮一峰的网络日志：Python 异步编程入门](https://www.ruanyifeng.com/blog/2019/11/python-asyncio.html)

:::

[[TOC]]

Python 3.4 引入了 `asyncio` 模块，增加了异步编程，跟 JavaScript 的 `async/await` 极为类似，大大方便了异步任务的处理。

## Python 的异步编程

历史上，Python 并不支持专门的异步编程语法，因为不需要。

有了多线程（`threading`）和多进程（`multiprocessing`），就没必要一定支持异步了。如果一个线程（或进程）阻塞，新建其他线程（或进程）就可以了，程序不会卡死。

但是，多线程有 “线程竞争” 的问题，处理起来很复杂，还涉及加锁。对于简单的异步任务来说（比如与网页互动），写起来很麻烦。

## asyncio 的设计

`asyncio` 模块最大特点就是，只存在一个线程。

由于只有一个线程，就不可能多个任务同时运行。`asyncio` 是 **多任务合作** 模式（cooperative multitasking），允许异步任务交出执行权给其他任务，等到其他任务完成，再收回执行权继续往下执行，这和 JavaScript 也是一样的。

由于代码的执行权在多个任务之间交换，所以看上去好像多个任务同时运行，其实底层只有一个线程，多个任务分享运行时间。

`asyncio` 模块在单线程上启动一个事件循环（event loop），时刻监听新进入循环的事件，加以处理，并不断重复这个过程，直到异步任务结束。

## asyncio API

下面介绍 `asyncio` 模块最主要的几个 API。注意，必须使用 Python 3.7 或更高版本，早期的语法已经改变了。

第一步，`import` 导入 `asyncio` 模块。

```python
import asyncio
```

第二步，函数前面加上 `async` 关键字，就变成了 `async` 函数。这种函数最大特点是执行可以暂停，交出执行权。

```python
async def main():
    pass
```

第三步，在 `async` 函数内部的异步任务前面，加上 `await` 命令。

```python
await asyncio.sleep(1)
```

上面代码中，`asyncio.sleep(1)` 方法可以生成一个异步任务，休眠 1 秒钟然后结束。

执行引擎遇到 `await` 命令，就会在异步任务开始执行之后，暂停当前 `async` 函数的执行，把执行权交给其他任务。等到异步任务结束，再把执行权交回 `async` 函数，继续往下执行。

第四步，`async.run()` 方法加载 `async` 函数，启动事件循环。

```python
asyncio.run(main())
```

上面代码中，`asyncio.run()` 在事件循环上监听 `async` 函数 `main()` 的执行。等到 `main()` 执行完了，事件循环才会终止。

## async 函数示例

```python
import asyncio

async def count():
    print('One')
    await asyncio.sleep(1)
    print('Two')

async def main():
    await asyncio.gather(count(), count(), count())

asyncio.run(main())
```

执行结果：

```console
$ python async.py
One
One
One
Two
Two
Two
```

脚本总的运行时间是 1 秒，而它们同步执行的时间是 3 秒。

*@TODO* 需要整理的文章：<https://www.cnblogs.com/traditional/p/17377569.html>

```python
import asyncio
import functools


def set_event(event: asyncio.Event):
    print("setting event in callback")
    event.set()


async def coro1(event: asyncio.Event):
    print("coro1 waiting for event")
    await event.wait()
    print("coro1 triggered")


async def coro2(event: asyncio.Event):
    print("coro2 waiting for event")
    await event.wait()
    print("coro2 triggered")


async def main(loop: asyncio.AbstractEventLoop):
    # Create a shared event
    event = asyncio.Event()
    print("event start state: {}".format(event.is_set()))

    loop.call_later(1, functools.partial(set_event, event))

    await asyncio.gather(coro1(event), coro2(event))
    print("event end state: {}".format(event.is_set()))


event_loop = asyncio.get_event_loop()
try:
    event_loop.run_until_complete(main(event_loop))
finally:
    event_loop.close()
```
