# glob - Unix 风格路径名模式扩展

[[TOC]]

## 1. glob 模块简介

| 项目        | 信息                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| 源代码      | [Lib/glob.py](https://github.com/python/cpython/tree/3.11/Lib/glob.py) |
| Python 版本 | 全版本                                                                 |
| 标签        | 文件和目录                                                             |

`glob` 模块可根据 Unix 终端所用规则找出所有匹配特定模式的路径名，但会按不确定的顺序返回结果。

- 波浪号 `~` 扩展不会生效
- 但 `*`、`?` 以及表示为 `[]` 的字符范围将被正确地匹配

::: info glob 实现

这是通过配合使用 `os.scandir()` 和 `fnmatch.fnmatch()` 函数来实现的，而不是通过实际发起调用子终端。请注意不同于 `fnmatch.fnmatch()`，`glob` 会将以点号 `"."` 开头的文件名作为特殊情况来处理。对于波浪号和终端变量扩展，请使用 `os.path.expanduser()` 和 `os.path.expandvars()`。

:::

## 2. 库函数

| 函数                                                                  |
| --------------------------------------------------------------------- |
| `glob.glob(pathname, *, root_dir=None, dir_fd=None, recursive=False)` |

返回匹配 `pathname` 的可能为空的路径名列表，请注意路径的任何开头部分都将被保留。

如果 `recursive` 为真值，则模式 `"**"` 将匹配目录中的任何文件以及零个或多个目录、子目录和符号链接。

*@3.5+* 支持使用 `"**"` 的递归 `glob`。

*@3.10+* 添加了 `root_dir` 和 `dir_fd` 形参。

*@3.11+* 添加 `include_hidden` 形参。

| 函数                                                                   |
| ---------------------------------------------------------------------- |
| `glob.iglob(pathname, *, root_dir=None, dir_fd=None, recursive=False)` |

返回一个 `iterator`，它会产生与 `glob()` 相同的结果，但不会实际地同时保存它们。

| 函数 *@3.4+*            |
| ----------------------- |
| `glob.escape(pathname)` |

转义所有特殊字符（`'?'`, `'*'` 和 `'['`）。

这适用于当你想要匹配可能带有特殊字符的任意字符串字面值的情况。在 `drive/UNC` 共享点中的特殊字符不会被转义，例如在 Windows 上 `escape('//?/c:/Quo vadis?.txt')` 将返回 `'//?/c:/Quo vadis[?].txt'`。

## 3. 示例

### 3.1 匹配文件名

考虑一个包含以下内容的目录：

- `1.gif`
- `2.txt`
- `card.gif`
- `sub/`
  - `3.txt`

`glob()` 将产生如下结果：

```python
import glob

glob.glob('./[0-9].*')  # ['./1.gif', './2.txt']

glob.glob('*.gif')      # ['1.gif', 'card.gif']

glob.glob('?.gif')      # ['1.gif']

glob.glob('**/*.txt', recursive=True)   # ['2.txt', 'sub/3.txt']

glob.glob('./**/', recursive=True)      # ['./', './sub/']
```

### 3.2 匹配点（.）开头的文件

如果目录包含以 `"."` 打头的文件，它们默认将不会被匹配。

例如，考虑一个包含 `card.gif` 和 `.card.gif` 的目录：

```python
glob.glob('*.gif')  # ['card.gif']

glob.glob('.c*')    # ['.card.gif']
```
