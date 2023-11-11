import multiprocessing as mp
import time
from multiprocessing.synchronize import Lock


def job(v, num: int, lock: Lock):
    lock.acquire()
    for _ in range(10):
        time.sleep(0.1)
        v.value += num
        print(v.value)
    lock.release()


def multicore():
    lock = mp.Lock()
    val = mp.Value("i", 0)
    p1 = mp.Process(target=job, args=(val, 1, lock))
    p2 = mp.Process(target=job, args=(val, 3, lock))
    p1.start()
    p2.start()
    p1.join()
    p2.join()


if __name__ == "__main__":
    multicore()
