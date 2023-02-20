---
title: 大小写不敏感的字典
description: 大小写不敏感的字典
---

# 从绝对路径上导入 Python 模块

对于 Python 3.5+，使用 `importlib.util` 库的函数来导入模块：

```python
import importlib.util


def load_file(path: str):
    spec = importlib.util.spec_from_file_location('module_name', path)
    modulevar = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modulevar)
    return modulevar
```
