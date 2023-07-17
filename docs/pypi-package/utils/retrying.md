# retrying - 重试任务

[[TOC]]

## 1. 项目简介

`retrying` 是一个 Python 重试任务的工具包。

```python
import random
from retrying import retry

@retry
def do_something_unreliable():
    if random.randint(0, 10) > 1:
        raise IOError("Broken sauce, everything is hosed!!!111one")
    else:
        return "Awesome sauce!"

print(do_something_unreliable())
```

还可以包含参数：

```python
@retry(stop_max_attempt_number=7)
def stop_after_7_attempts():
    print("Stopping after 7 attempts")
```

可用参数：

- `stop_max_attempt_number`：最大重试次数
- `stop_max_delay`：重试指定在指定时间内完成
- `wait_fixed`：固定的重试等待时间
- `wait_random_min`：最小随机等待时间（毫秒）
- `wait_random_max`：最大随机等待时间（毫秒）
- `wait_exponential_multiplier`：指数等待时间的基数（毫秒）
- `wait_exponential_max`：指数等待时间的最大值（毫秒）
- `retry_on_exception`：传入判断异常是否重试的函数
- `wrap_exception`：抛出错误的异常类型
- `retry_on_result`：在结果为指定条件时重试
