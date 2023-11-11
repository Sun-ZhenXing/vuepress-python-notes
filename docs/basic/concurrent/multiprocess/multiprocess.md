# Python 多进程

[[TOC]]

## 1. 进程

多进程可以避免 Python 多线程的劣势，充分发挥多核优势。

## 2. 创建进程

创建过程与多线程一致：

@[code python](./src/mp_1.py)

## 3. 使用 `Queue` 进行进程间通信

使用 `multiprocessing.Queue` 返回输出的值：

@[code python](./src/mp_queue.py)

## 4. 多线程与多进程对比

性能对比

@[code python](./src/mp_2.py)

## 5. `Pool` 进程池

@[code python](./src/mp_pool.py)

`apply_async()` 函数一次使用一个值

```python
res = pool.apply_async(job, (2,))
print(res.get())
pool = mp.Pool(processes=2)
```

## 6. 共享内存

定义共享内存变量：

```python
val = mp.Value('d', 1)
array = mp.Array('i', [1, 2, 3])
```

变量的类型值可以参考[标准库文档](https://docs.python.org/zh-cn/3/library/array.html#module-array)。

## 7. `Lock` 锁

使用锁：

@[code python](./src/mp_lock.py)
