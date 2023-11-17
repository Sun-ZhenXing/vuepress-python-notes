# Python Launcher

[[TOC]]

## 1. Python Launcher 使用

此功能适用于 Windows。

在 Windows 上安装 Python 时，默认会安装 Python Launcher，用于管理和执行不同的 Python 版本。

安装后可以使用 `py` 命令查看和管理计算机中不同的 Python。`py` 命令默认可以代替 `python` 命令使用。

直接启动 Python：

```bash
py
```

查看已安装的 Python：

```bash
py -0
```

查看帮助：

```bash
py --help
```

除了 Python 程序默认的命令行参数外，`py` 还包括下面的参数：

| 参数                  | 说明                                              |
| --------------------- | ------------------------------------------------- |
| `-2`                  | 启动最新的 Python 2.x 版本                        |
| `-3`                  | 启动最新的 Python 3.x 版本                        |
| `-X.Y`                | 启动指定的 Python 版本如果存在匹配的 64 位 Python |
| `-X.Y-32`             | 启动指定的 32 位 Python 版本                      |
| `-X-32`               | 启动最新的 32 位 Python 版本 X                    |
| `-X.Y-64`             | 启动指定的 64 位 Python 版本                      |
| `-X-64`               | 启动最新的 64 位 Python 版本 X                    |
| `-0`，`--list`        | 列出可用的 Python                                 |
| `-0p`，`--list-paths` | 列出路径                                          |

## 2. 配置

默认 `py.exe` 被安装在 `C:\Windows\py.exe` 路径下。

如果需要修改默认启动的 Python 版本，可以创建 `C:\Windows\py.ini` 文件，内容如下：

```ini
[defaults]
python=3.10
```

这样，`py` 命令就会默认启动 Python 3.10。
