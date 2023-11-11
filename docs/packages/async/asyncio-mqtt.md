# asyncio-mqtt - 异步 MQTT 客户端

<div class="no-link">

[![](https://img.shields.io/github/license/sbtinstruments/asyncio-mqtt)](https://github.com/sbtinstruments/asyncio-mqtt/blob/main/LICENSE)
[![](https://img.shields.io/pypi/v/asyncio-mqtt)](https://pypi.org/project/asyncio-mqtt)
[![](https://img.shields.io/pypi/pyversions/asyncio-mqtt.svg)](https://pypi.org/project/asyncio-mqtt)
[![](https://img.shields.io/pypi/dm/asyncio-mqtt)](https://pypi.org/project/asyncio-mqtt)
[![](https://github.com/sbtinstruments/asyncio-mqtt/actions/workflows/test.yml/badge.svg)](https://github.com/sbtinstruments/asyncio-mqtt/actions/workflows/test.yml)
[![](https://github.com/sbtinstruments/asyncio-mqtt/actions/workflows/docs.yml/badge.svg)](https://github.com/sbtinstruments/asyncio-mqtt/actions/workflows/docs.yml)
[![](https://img.shields.io/codecov/c/github/sbtinstruments/asyncio-mqtt)](https://codecov.io/gh/sbtinstruments/asyncio-mqtt)
[![](https://results.pre-commit.ci/badge/github/sbtinstruments/asyncio-mqtt/main.svg)](https://results.pre-commit.ci/latest/github/sbtinstruments/asyncio-mqtt/main)
[![](https://img.shields.io/badge/typing-strict-green.svg)](https://github.com/sbtinstruments/asyncio-mqtt)
[![](https://img.shields.io/badge/code%20style-black-black)](https://github.com/sbtinstruments/asyncio-mqtt)
[![](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/charliermarsh/ruff/main/assets/badge/v1.json)](https://github.com/charliermarsh/ruff)

</div>

[[TOC]]

## 1. 项目简介

| 项目        | 信息                                                                                                      |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| 项目地址    | [PyPI](https://pypi.org/project/asyncio-mqtt) \| [GitHub](https://github.com/sbtinstruments/asyncio-mqtt) |
| 官方文档    | [sbtinstruments.github.io](https://sbtinstruments.github.io/asyncio-mqtt)                                 |
| 开源协议    | BSD-3-Clause                                                                                              |
| Python 版本 | Python 3.7 ~ 3.11                                                                                         |
| 标签        | asyncio                                                                                                   |

`asyncio-mqtt` 提供了基于 [`paho-mqtt`](https://github.com/eclipse/paho.mqtt.python) 的现代的、异步的接口。

- 没有回调
- 没有更多的返回代码（使用 `MqttError` 就够了）
- 优雅的断开连接
- 与异步代码兼容
- 完全的类型提示
- 整个系统只有不到 900 行的代码。

`asyncio-mqtt` 安装后同样也会安装 `paho.mqtt`，部分配置可能用到 `paho.mqtt` 库中的内容。

安装：

```bash
pip install asyncio-mqtt
```

直接安装 GitHub 上的最新版本：

```bash
pip install git+https://github.com/sbtinstruments/asyncio-mqtt
```

::: warning Windows 使用注意

从 Python 3.8 开始，`asyncio` 的默认事件循环是 `ProactorEventLoop`。该循环不支持 `asyncio-mqtt` 需要的 `add_reader` 方法。请切换到一个支持 `add_reader` 方法的事件循环，比如内置的 `SelectorEventLoop`。

```python
# 修改为 Windows 的 "Selector" 事件循环
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
# 正常使用即可
asyncio.run(main())
```

:::

## 2. 快速开始

发布：

```python
async with Client("test.mosquitto.org") as client:
    await client.publish("humidity/outside", payload=0.38)
```

订阅：

```python
async with Client("test.mosquitto.org") as client:
    async with client.messages() as messages:
        await client.subscribe("humidity/#")
        async for message in messages:
            print(message.payload)
```

`payload` 可以是 `int`、`float`、`str`、`bytes`、`bytearray` 和 `None`。

数字被默认转换为字符串，如果需要数字原始值，可以使用 `struct.pack()`。`None` 代表零长度负载。

## 3. 客户端配置

在初始化客户端时，可参考下面的配置，下面的值均为默认值。关于各个参数的更多信息，请看 [paho-mqtt 的文档](https://github.com/eclipse/paho.mqtt.python)。

```python
import asyncio_mqtt as aiomqtt
import paho.mqtt as mqtt


aiomqtt.Client(
    hostname="test.mosquitto.org",  # 唯一的必须参数
    port=1883,
    username=None,
    password=None,
    logger=None,
    client_id=None,
    tls_context=None,
    tls_params=None,
    proxy=None,
    protocol=None,
    will=None,
    clean_session=None,
    transport="tcp",
    keepalive=60,
    bind_address="",
    bind_port=0,
    clean_start=mqtt.client.MQTT_CLEAN_START_FIRST_ONLY,
    properties=None,
    message_retry_set=20,
    socket_options=(),
    max_concurrent_outgoing_calls=None,
    websocket_path=None,
    websocket_headers=None,
)
```

## 4. 最佳实战

### 4.1 重新连接

```python
import asyncio
import asyncio_mqtt as aiomqtt

async def main():
    reconnect_interval = 5  # In seconds
    while True:
        try:
            async with aiomqtt.Client("test.mosquitto.org") as client:
                async with client.messages() as messages:
                    await client.subscribe("humidity/#")
                    async for message in messages:
                        print(message.payload.decode())
        except aiomqtt.MqttError as error:
            print(f'Error "{error}". Reconnecting in {reconnect_interval} seconds.')
            await asyncio.sleep(reconnect_interval)

asyncio.run(main())
```

### 4.2 取消任务

*@3.11+* Python 3.11 新增了 `asyncio.timeout`，可用监听一段时间的消息。

```python
import asyncio
import asyncio_mqtt as aiomqtt

async def listen():
    async with aiomqtt.Client("test.mosquitto.org") as client:
        async with client.messages() as messages:
            await client.subscribe("humidity/#")
            async for message in messages:
                print(message.payload)

async def main():
    try:
        # 5 秒后取消请求
        async with asyncio.timeout(5):
            await listen()
    # 忽略 TimeoutError
    except asyncio.TimeoutError:
        pass

asyncio.run(main())
```

Python 3.11 之前的版本可用 `task.cancel` 来取消：

```python
import asyncio
import asyncio_mqtt as aiomqtt

async def listen():
    async with aiomqtt.Client("test.mosquitto.org") as client:
        async with client.messages() as messages:
            await client.subscribe("humidity/#")
            async for message in messages:
                print(message.payload)

async def main():
    loop = asyncio.get_event_loop()
    # 创建任务
    task = loop.create_task(listen())
    # 等待特定的任务
    await asyncio.sleep(5)
    # 取消任务
    task.cancel()
    # 等待任务取消
    try:
        await task
    except asyncio.CancelledError:
        pass

asyncio.run(main())
```

### 4.3 分享客户端

```python
import asyncio
import asyncio_mqtt as aiomqtt

async def publish_humidity(client):
    await client.publish("humidity/outside", payload=0.38)

async def publish_temperature(client):
    await client.publish("temperature/outside", payload=28.3)

async def main():
    async with aiomqtt.Client("test.mosquitto.org") as client:
        await publish_humidity(client)
        await publish_temperature(client)

asyncio.run(main())
```

### 4.4 过滤请求

```python
import asyncio
import asyncio_mqtt as aiomqtt

async def main():
    async with aiomqtt.Client("test.mosquitto.org") as client:
        async with client.messages() as messages:
            await client.subscribe("#")
            async for message in messages:
                if message.topic.matches("humidity/outside"):
                    print(f"[humidity/outside] {message.payload}")
                if message.topic.matches("+/inside"):
                    print(f"[+/inside] {message.payload}")
                if message.topic.matches("temperature/#"):
                    print(f"[temperature/#] {message.payload}")

asyncio.run(main())
```

### 4.5 不阻塞运行

使用 `asyncio.TaskGroup`（或 `asyncio.gather`，要求 Python < 3.11）来运行多个任务：

```python
import asyncio
import asyncio_mqtt as aiomqtt

async def sleep(seconds):
    await asyncio.sleep(seconds)
    print(f"Slept for {seconds} seconds!")

async def listen():
    async with aiomqtt.Client("test.mosquitto.org") as client:
        async with client.messages() as messages:
            await client.subscribe("humidity/#")
            async for message in messages:
                print(message.payload)

async def main():
    async with asyncio.TaskGroup() as group:
        group.create_task(sleep(2))
        group.create_task(listen())  # 此处开始监听
        group.create_task(sleep(3))
        group.create_task(sleep(1))

asyncio.run(main())
```

如果需要和其他异步 Web 框架等结合，我们有下面的方案：

```python
import asyncio
import asyncio_mqtt as aiomqtt

async def listen():
    async with aiomqtt.Client("test.mosquitto.org") as client:
        async with client.messages() as messages:
            await client.subscribe("humidity/#")
            async for message in messages:
                print(message.payload)

background_tasks = set()

async def main():
    loop = asyncio.get_event_loop()
    # 创建任务
    task = loop.create_task(listen())
    # 创建引用以避免被垃圾回收
    background_tasks.add(task)
    task.add_done_callback(background_tasks.remove)

    # 持续运行别的任务
    while True:
        await asyncio.sleep(2)

asyncio.run(main())
```

### 4.6 TLS

```python
import asyncio
import asyncio_mqtt as aiomqtt
import ssl

tls_params = aiomqtt.TLSParameters(
    ca_certs=None,
    certfile=None,
    keyfile=None,
    cert_reqs=ssl.CERT_REQUIRED,
    tls_version=ssl.PROTOCOL_TLS,
    ciphers=None,
)

async def main():
    async with aiomqtt.Client("test.mosquitto.org", tls_params=tls_params) as client:
        await client.publish("humidity/outside", payload=0.38)

asyncio.run(main())
```

### 4.7 代理

```python
import asyncio
import asyncio_mqtt as aiomqtt
import socks

proxy_params = aiomqtt.ProxySettings(
    proxy_type=socks.HTTP,
    proxy_addr="www.example.com",
    proxy_rdns=True,
    proxy_username=None,
    proxy_password=None,
)

async def main():
    async with aiomqtt.Client("test.mosquitto.org", proxy=proxy_params) as client:
        await client.publish("humidity/outside", payload=0.38)

asyncio.run(main())
```
