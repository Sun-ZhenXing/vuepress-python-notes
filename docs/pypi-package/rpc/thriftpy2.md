# thriftpy2 - Thrift RPC 框架的

<div class="no-link">

[![](https://travis-ci.com/Thriftpy/thriftpy2.svg?branch=develop)](https://travis-ci.com/Thriftpy/thriftpy2)
[![](https://img.shields.io/codecov/c/github/Thriftpy/thriftpy2.svg)](https://codecov.io/gh/Thriftpy/thriftpy2)
[![](https://img.shields.io/pypi/dm/thriftpy2.svg)](https://pypi.org/project/thriftpy2/)
[![](https://img.shields.io/pypi/v/thriftpy2.svg)](https://pypi.org/project/thriftpy2/)
[![](https://img.shields.io/pypi/pyversions/thriftpy2.svg)](https://pypi.org/project/thriftpy2/)
[![](https://img.shields.io/pypi/implementation/thriftpy2.svg)](https://pypi.org/project/thriftpy2/)

</div>

[[TOC]]

## 1. 项目简介

| 项目        | 信息                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------- |
| 项目地址    | [PyPI](https://pypi.org/project/thriftpy2/) \| [GitHub](https://github.com/Thriftpy/thriftpy2) |
| 官方文档    | [官方文档](https://thriftpy2.readthedocs.io/en/latest/)                                        |
| 开源协议    | MIT                                                                                            |
| Python 版本 | Python 2.7 ~ 3.11                                                                              |
| 标签        | RPC、asyncio                                                                                   |

ThriftPy2 是 Thrift RPC 框架的 Python 实现，它是官方 Thrift Python 包的另一个实现，兼容 `thriftpy`，并且提供了无需编译 `.thrift` 文件即可直接使用的功能。

ThriftPy2 的速度比 `thriftpy` 快许多，这可以从官方的 [benchmark](https://thriftpy2.readthedocs.io/en/latest/#benchmarks) 中找到。

如果你需要使用 ThriftPy2，你需要安装 `cython` 和 `thriftpy2`：

```bash
pip install cython thriftpy2
```

由于 ThriftPy2 兼容 `thriftpy`，所以你可以使用 `thriftpy` 的方式来使用 ThriftPy2：

```python
import thriftpy2 as thriftpy
```

## 2. 快速开始

下面所使用的 Thrift 文件如下：

```go
service PingPong {
    string ping(),
}
```

基本示例：

::: code-tabs

@tab Server

```python :no-line-numbers
import thriftpy2
from thriftpy2.rpc import make_server

pingpong_thrift = thriftpy2.load("pingpong.thrift", module_name="pingpong_thrift")

class Dispatcher(object):
    def ping(self):
        return "pong"

server = make_server(pingpong_thrift.PingPong, Dispatcher(), '127.0.0.1', 6000)
server.serve()
```

@tab Client

```python :no-line-numbers
import thriftpy2
from thriftpy2.rpc import make_client

pingpong_thrift = thriftpy2.load("pingpong.thrift", module_name="pingpong_thrift")

client = make_client(pingpong_thrift.PingPong, '127.0.0.1', 6000)
print(client.ping())
```

:::

同样支持 `asyncio`，使用上述 Thrift 文件，我们可以这样写：

::: code-tabs

@tab Server

```python :no-line-numbers
import asyncio
import thriftpy2
from thriftpy2.rpc import make_aio_server

echo_thrift = thriftpy2.load("echo.thrift", module_name="echo_thrift")

class Dispatcher(object):
    async def echo(self, param):
        print(param)
        await asyncio.sleep(0.1)
        return param

def main():
    server = make_aio_server(
        echo_thrift.EchoService, Dispatcher(), '127.0.0.1', 6000)
    server.serve()

if __name__ == '__main__':
    main()
```

@tab Client

```python :no-line-numbers
import thriftpy2
import asyncio
from thriftpy2.rpc import make_aio_client

echo_thrift = thriftpy2.load("echo.thrift", module_name="echo_thrift")

async def request():
    client = await make_aio_client(
        echo_thrift.EchoService, '127.0.0.1', 6000)
    print(await client.echo('hello, world'))
    client.close()

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(request())
```

:::
