# Python EBNF 语言定义

[[TOC]]

## 1. Python 语言定义

我们在第三方库中介绍过一个 Python 语言解析器[`parso`](../../pypi-package/compiler/parso.md)，它的核心就是一个 Python 语言定义，它是一个 EBNF 语法定义，用于解析 Python 代码。[^1]

[^1]: 冷门话题，聊一聊 Python 的 EBNF，酷 Python，<http://www.coolpython.net/informal_essay/21-04/py-ebnf.html>

例如 [Python 3.10 的语言定义](https://github.com/davidhalter/parso/blob/master/parso/python/grammar310.txt) 可以从 GitHub 仓库内找到。

例如部分语句的定义：

```ebnf
compound_stmt: if_stmt | while_stmt | for_stmt | try_stmt | with_stmt | funcdef | classdef | decorated | async_stmt
async_stmt: 'async' (funcdef | with_stmt | for_stmt)
if_stmt: 'if' namedexpr_test ':' suite ('elif' namedexpr_test ':' suite)* ['else' ':' suite]
while_stmt: 'while' namedexpr_test ':' suite ['else' ':' suite]
for_stmt: 'for' exprlist 'in' testlist ':' suite ['else' ':' suite]
try_stmt: ('try' ':' suite
           ((except_clause ':' suite)+
            ['else' ':' suite]
            ['finally' ':' suite] |
           'finally' ':' suite))
with_stmt: 'with' with_item (',' with_item)*  ':' suite
with_item: test ['as' expr]
# NB compile.c makes sure that the default except clause is last
except_clause: 'except' [test ['as' NAME]]
suite: simple_stmt | NEWLINE INDENT stmt+ DEDENT
```

`parso` 的解析器通过解析 EBNF 获得对应版本的 Python 语言语法，然后通过解析 Python 代码来生成抽象语法树（AST）。

## 2. EBNF 语法

```card
title: AI 提示
desc: 解释一下 Extended Backus Naur Form（EBNF）是什么？What is the Extended Backus Naur Form (EBNF)?
link: https://chat.openai.com/
logo: /vuepress-python-notes/chatgpt.svg
color: rgba(226, 212, 255, 0.2)
```

**巴科斯-诺尔范式**（Extended Backus-Naur Form，EBNF）是一种用于描述计算机语言语法的元语言。它是 Backus-Naur Form（BNF）的扩展版本，提供了更多的元素和语法结构，以便更准确地描述一些复杂的语法规则。

EBNF 的语法规则由一系列规则组成，每个规则包含一个非终止符和一个或多个终止符或非终止符。非终止符表示语法规则的一部分，而终止符是语法规则的最基本的元素。EBNF 中的规则可以使用括号、方括号、花括号等符号来描述语法的结构。

EBNF 还支持一些元素，如 `|` 表示或，可以用于在一个语法规则中定义多个可能的选择；`+` 表示至少重复一次；`*` 表示零次或多次重复。这些元素使 EBNF 更加灵活，可以描述更复杂的语法规则。

EBNF 被广泛用于编程语言的设计和描述，它可以帮助程序员更容易地理解和实现语法规则。

| 符号  | 含义                         |
| ----- | ---------------------------- |
| `:`   | 表示定义                     |
| `[ ]` | 中是可选项                   |
| `' '` | 引号里的内容表示字符         |
| `\| ` | 两边的是可选内容，或者的关系 |
| `*`   | 表示零个或者多个             |
| `+`   | 表示一个或者多个             |
