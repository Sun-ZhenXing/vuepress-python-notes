# aiofiles - 异步文件接口

<div class="no-link">

[![](https://img.shields.io/pypi/v/aiofiles.svg)](https://pypi.python.org/pypi/aiofiles)
[![](https://travis-ci.org/Tinche/aiofiles.svg?branch=master)](https://travis-ci.org/Tinche/aiofiles)
[![](https://codecov.io/gh/Tinche/aiofiles/branch/master/graph/badge.svg)](https://codecov.io/gh/Tinche/aiofiles)
[![](https://img.shields.io/pypi/pyversions/aiofiles.svg)](https://github.com/Tinche/aiofiles)

</div>

[[TOC]]

## 1. 项目简介

| 项目        | 信息                                                                                          |
| ----------- | --------------------------------------------------------------------------------------------- |
| 项目地址    | [PyPI](https://pypi.python.org/pypi/aiofiles) \| [GitHub](https://github.com/Tinche/aiofiles) |
| 开源协议    | Apache 2                                                                                      |
| Python 版本 | Python 3.6 ~ 3.10                                                                             |
| 标签        | asyncio                                                                                       |

`aiofiles` 是一个 Apache 2 许可的第三方库，用 Python 编写，用于在 `asyncio` 应用程序中处理本地磁盘文件。

```bash
pip install aiofiles
```

## 2. 特点

- 非常接机原生 API
- 支持缓冲区协议和非缓冲区协议的二进制文件
- 支持 `async` / `await`（[PEP 492](http://www.python.org/dev/peps/pep-0492)）结构
- 支持临时文件

普通的本地文件 IO 是阻塞的，不能轻易地、可移植地做成异步的。这意味着做文件 IO 可能会干扰 `asyncio` 应用程序，它不应该阻塞执行线程。`aiofiles` 通过引入文件的异步版本，支持将操作委托给一个单独的线程池来帮助解决这个问题。

## 3. 示例

```python
async with aiofiles.open('filename', mode='r') as f:
    contents = await f.read()

print(contents)
# 'My file contents'
```

异步迭代也受到支持：

```python
async with aiofiles.open('filename') as f:
    async for line in f:
        ...
```

异步接口也支持临时文件：

```python
async with aiofiles.tempfile.TemporaryFile('wb') as f:
    await f.write(b'Hello, World!')
```

文件是使用 `aiofiles.open()` 的 coroutine 打开的，它除了兼容内置的 `open()` 之外，还接受可选的 `loop` 和 `executor` 参数。如果没有 `loop`，将使用默认的 `loop`，按照设定的 `asyncio` 策略。如果没有指定 `executor`，将使用默认的事件循环执行器。

在成功的情况下，一个异步文件对象被返回，其 API 与普通文件相同，除了以下方法是 Coroutines 并委托给一个执行器。

- `close()`
- `flush()`
- `isatty()`
- `read()`
- `readall()`
- `read1()`
- `readinto()`
- `readline()`
- `readlines()`
- `seek()`
- `seekable()`
- `tell()`
- `truncate()`
- `writable()`
- `write()`
- `writelines()`

`aiofiles.os` 模块包含几个处理文件的有用的 `os` 函数的执行器启用的 Coroutine 版本。

- `stat()`
- `sendfile()`
- `rename()`
- `renames()`
- `replace()`
- `remove()`
- `unlink()`
- `mkdir()`
- `makedirs()`
- `rmdir()`
- `removedirs()`
- `link()`
- `symlink()`
- `readlink()`
- `path.exists()`
- `path.isfile()`
- `path.isdir()`
- `path.islink()`
- `path.getsize()`
- `path.getatime()`
- `path.getctime()`
- `path.samefile()`
- `path.sameopenfile()`

## 4. 临时文件支持

`aiofiles.tempfile` 实现了下列接口：
- `TemporaryFile`
- `NamedTemporaryFile`
- `SpooledTemporaryFile`
- `TemporaryDirectory`

```python
async with aiofiles.tempfile.NamedTemporaryFile('wb+') as f:
    await f.write(b'Line1\n Line2')
    await f.seek(0)
    async for line in f:
        print(line)

async with aiofiles.tempfile.TemporaryDirectory() as d:
    filename = os.path.join(d, "file.ext")
```
