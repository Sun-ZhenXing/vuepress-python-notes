---
title: Python 语言技巧
description: Python 语言技巧
---

# Python 语言技巧

[[TOC]]

## 1. 列表推导

### 1.1 从字典中提取子集

::: info 引用

引用自 *Python Cookbook*：[从字典中提取子集](https://python3-cookbook.readthedocs.io/zh_CN/latest/c01/p17_extract_subset_of_dict.html)。

:::

你想构造一个字典，它是另外一个字典的子集，最简单的方式是使用字典推导：

```python
prices = {
    'ACME': 45.23,
    'AAPL': 612.78,
    'IBM': 205.55,
    'HPQ': 37.20,
    'FB': 10.75
}
# Make a dictionary of all prices over 200
p1 = {key: value for key, value in prices.items() if value > 200}

# Make a dictionary of tech stocks
tech_names = {'AAPL', 'IBM', 'HPQ', 'MSFT'}
p2 = {key: value for key, value in prices.items() if key in tech_names}
```

大多数情况下字典推导能做到的，通过创建一个元组序列然后把它传给 `dict()` 函数也能实现：

```python
p1 = dict((key, value) for key, value in prices.items() if value > 200)
```

但是，字典推导方式表意更清晰，并且实际上也会运行的更快些（在这个例子中，实际测试几乎比 `dict()` 函数方式快整整一倍）

有时候完成同一件事会有多种方式。比如，第二个例子程序也可以像这样重写：

```python
# Make a dictionary of tech stocks
tech_names = { 'AAPL', 'IBM', 'HPQ', 'MSFT' }
p2 = { key: prices[key] for key in prices.keys() & tech_names }
```

但是，运行时间测试结果显示这种方案大概比第一种方案慢 1.6 倍。



