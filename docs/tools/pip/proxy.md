---
title: Pip 使用代理
description: Pip 使用代理
---

# Pip 使用代理

[[TOC]]

## 方法 1：使用系统代理

不推荐使用系统代理直接安装，因为在以前的 Python 中获取代理时不能识别 HTTPS 代理，或者没有正确的证书导致 SSL 错误。

通过下面的代码查看系统代理的差异，您可能在一些爬虫任务中需要解决代理问题：

```python
import sys
import urllib.request

def get_sys_proxies():
    proxies = urllib.request.getproxies()
    if sys.platform == 'win32':
        if 'https' in proxies:
            proxies['https'] = proxies['https'].replace('https://', 'http://')
    return proxies

if __name__ == '__main__':
    print(urllib.request.getproxies())
    print(get_sys_proxies())
```

如果您需要使用这种方法，请查看 [pip: HTTPS Certificates](https://pip.pypa.io/en/stable/topics/https-certificates/) 了解更多。

## 方法 2：指定变量

指定 `http_proxy` 和 `https_proxy` 变量。其值需要为 `scheme://[user:passwd@]proxy.server:port` 格式。

::: warning SOCKS 协议

需要注意的是，SOCKS 协议的格式 `socks://` 可能不能被识别，可以写为 `socks5://`，因为当前版本的 Python 不能识别 SOCKS 协议的版本，而普遍使用的 SOCKS 协议是版本 5。

:::

示例：

::: code-tabs#sys

@tab Linux/Mac

```bash
export https_proxy='socks5://127.0.0.1:10808'
export http_proxy='http://127.0.0.1:10809'
# pip3 install ...
```

@tab Windows

```bash
set https_proxy=socks5://127.0.0.1:10808
set http_proxy=http://127.0.0.1:10809
# pip install ...
```

:::

如果当前系统没有 SOCKS 协议支持，可以安装其支持包：

::: code-tabs#sys

@tab Linux/Mac

```bash
pip3 install pysocks
```

@tab Windows

```bash
pip install pysocks
```

:::

## 方法 3：使用命令行参数

使用 `pip` 时指定 `--proxy` 可指定代理，规则和方法 1 一致，需要符合 `scheme://[user:passwd@]proxy.server:port` 格式。

例如：

::: code-tabs#sys

@tab Linux/Mac

```bash
pip3 install opencv-python --proxy socks5://127.0.0.1:10808
```

@tab Windows

```bash
pip install opencv-python --proxy socks5://127.0.0.1:10808
```

:::
