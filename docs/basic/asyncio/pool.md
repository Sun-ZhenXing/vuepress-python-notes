# 池化异步执行任务

[[TOC]]

## 1. 异步线程池

```python
import asyncio
import time
from concurrent.futures import ThreadPoolExecutor

async def main():
    start = time.perf_counter()
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor(max_workers=4) as executor:
        tasks_list = [loop.run_in_executor(executor, time.sleep, 2) for _ in range(16)]
        await asyncio.gather(*tasks_list)
        end = time.perf_counter()
        print(f"Time elapsed: {end - start}")

asyncio.run(main())
```

## 2. 异步进程池

```python
from multiprocessing import Pool
import time

def say_hello(name) -> str:
    time.sleep(1)
    return f"hello, {name}"

if __name__ == "__main__":
    time_start = time.perf_counter()
    with Pool() as pool:
        hi1_async = pool.apply_async(say_hello, args=("satori",))
        hi2_async = pool.apply_async(say_hello, args=("koishi",))
        print(hi1_async.get())
        print(hi2_async.get())
    time_end = time.perf_counter()
    print(f"Time elapsed: {time_end - time_start:.2f}s")
```
