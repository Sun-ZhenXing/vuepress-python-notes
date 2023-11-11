import multiprocessing as mp
import threading as td
import time


def job(q: mp.Queue) -> None:
    res = 0
    for i in range(10000000):
        res += i + i * i + i**3
    q.put(res)


def multicore():
    q = mp.Queue()
    p1 = mp.Process(target=job, args=(q,))
    p2 = mp.Process(target=job, args=(q,))
    p1.start()
    p2.start()
    p1.join()
    p2.join()
    print("multicore:", q.get(), q.get())


def normal():
    res = 0
    for _ in range(2):
        for i in range(10000000):
            res += i + i * i + i**3
    print("normal:", res)


def multithread():
    q = mp.Queue()
    t1 = td.Thread(target=job, args=(q,))
    t2 = td.Thread(target=job, args=(q,))
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    res1 = q.get()
    res2 = q.get()
    print("multithread:", res1, res2)


if __name__ == "__main__":
    st = time.time()
    normal()
    et = time.time()
    print("Time:", et - st)
    st = time.time()
    multicore()
    et = time.time()
    print("Time:", et - st)
    st = time.time()
    multithread()
    et = time.time()
    print("Time:", et - st)
