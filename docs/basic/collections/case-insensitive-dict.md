# 大小写不敏感的字典

`requests` 内有一个大小写不敏感的字典类型 `CaseInsensitiveDict`，例如 `response.headers` 即是这个类型：

```python
import requests

url = 'http://www.bing.com'
res = requests.get(url)
print(res.headers['Connection'])
print(res.headers['connection'])
```

这两个结果一致。下面我们通过魔术方法实现一个大小写不敏感的字典，参考了网络上的其他方法[^1]

```python
class CaseInsensitiveDict(dict):

    def lower_key(self, key):
        if isinstance(key, str):
            return key.lower()
        return key

    def __setitem__(self, key, value):
        super().__setitem__(self.lower_key(key), value)

    def __getitem__(self, item):
        return super().__getitem__(self.lower_key(item))

    def __delitem__(self, key):
        super().__delitem__(self.lower_key(key))

    def update(self, another=None, **F):
        for key, value in another.items():
            self.__setitem__(key, value)

    def __repr__(self):
        return f"{type(self).__name__}({super().__repr__()})"
```

[1]: Python 创建一个大小写不敏感的字典，CoolPython，<http://www.coolpython.net/informal_essay/20-03/ignore_case_dict.html>
