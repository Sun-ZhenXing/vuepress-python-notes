# 进制转换

[[TOC]]

## 1. 字符串转换

```python

```

## 2. 数组表示的任意进制

```python
def convert_base(number: int, base: int = 10) -> list[int]:
    if number < 0 or base < 2:
        raise ValueError(
            '"number" must be positive and "base" must be greater than 1'
        )
    if number == 0 or base == 10:
        return [number]
    res = []
    while number != 0:
        number, mod = divmod(number, base)
        res.append(mod)
    res.reverse()
    return res

def from_list(l: list[int], base: int = 10) -> int:
    if base < 2:
        raise ValueError('"base" must be greater than 1')
    res = 0
    for x in l:
        res = res * base + x
    return res
```
