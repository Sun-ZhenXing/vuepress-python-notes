---
title: parso - Python 全版本解析器
description: parso - Python 全版本解析器
---

# parso - Python 全版本解析器

<div class="no-link">

[![](https://github.com/davidhalter/parso/workflows/Build/badge.svg?branch=master)](https://github.com/davidhalter/parso/actions)
[![](https://coveralls.io/repos/github/davidhalter/parso/badge.svg?branch=master)](https://coveralls.io/github/davidhalter/parso?branch=master)
[![](https://pepy.tech/badge/parso)](https://pepy.tech/project/parso)

</div>

[[TOC]]

## 1. 项目简介

| 项目        | 信息                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------- |
| 项目地址    | [PyPI](https://pypi.org/project/parso/) \| [GitHub](https://github.com/davidhalter/parso) |
| 官方文档    | [parso.readthedocs.org](https://parso.readthedocs.org/en/latest/)                         |
| 开源协议    | MIT                                                                                       |
| Python 版本 | Python 3.6 ~ 3.11                                                                         |
| 标签        | compiler                                                                                  |

Parso 是一个 Python 解析器，支持错误恢复和不同 Python 版本。Parso 还能够列出你的 Python 文件中的多个语法错误。

Parso 由很少的 API 组成，用来解析 Python 的分析语法树并查找尽可能多的错误。

> 智能语法工具 [`jedi`](https://github.com/davidhalter/jedi) 就是由 Parso 构建的。

安装非常简单：

```bash
pip install parso
```

## 2. 示例

解析语法树：

```python
>>> import parso
>>> module = parso.parse('hello + 1', version="3.9")
>>> expr = module.children[0]
>>> expr
PythonNode(arith_expr, [<Name: hello@1,0>, <Operator: +>, <Number: 1>])
>>> print(expr.get_code())
hello + 1
>>> name = expr.children[0]
>>> name
<Name: hello@1,0>
>>> name.end_pos
(1, 5)
>>> expr.end_pos
(1, 9)
```

解析错误：

```python
>>> grammar = parso.load_grammar()
>>> module = grammar.parse('foo +\nbar\ncontinue')
>>> error1, error2 = grammar.iter_errors(module)
>>> error1.message
'SyntaxError: invalid syntax'
>>> error2.message
"SyntaxError: 'continue' not properly in loop"
```
