---
title: click - 增强的命令行参数处理
description: click - 增强的命令行参数处理
---

# click - 增强的命令行参数处理

[[TOC]]

## 1. 项目简介

| 项目        | 信息                                                                                  |
| ----------- | ------------------------------------------------------------------------------------- |
| 项目地址    | [PyPI](https://pypi.org/project/click/) \| [GitHub](https://github.com/pallets/click) |
| 官方文档    | [palletsprojects.com](https://click.palletsprojects.com/)                             |
| 开源协议    | BSD 3                                                                                 |
| Python 版本 | >= Python 3.7                                                                         |
| 标签        | 工具                                                                                  |

Click 用于以可组合的方式用尽可能少的代码创建漂亮的命令行界面。它是命令行界面创建工具包。它是高度可配置的，并且开箱即用的合理默认值。

它的目的是使编写命令行工具的过程变得快速而有趣，同时也防止因无法实现预定的 CLI API 而引起的任何错误。

特点是：
- 命令的任意嵌套
- 自动生成帮助页
- 支持在运行时偷懒加载子命令

安装：

```bash
pip install -U click
```

简单示例：

```python
import click

@click.command()
@click.option("--count", default=1, help="Number of greetings.")
@click.option("--name", prompt="Your name", help="The person to greet.")
def hello(count, name):
    """Simple program that greets NAME for a total of COUNT times."""
    for _ in range(count):
        click.echo(f"Hello, {name}!")

if __name__ == '__main__':
    hello()
```
