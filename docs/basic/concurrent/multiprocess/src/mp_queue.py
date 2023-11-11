import multiprocessing as mp


def job(q: mp.Queue, index: int) -> None:
    res = 0
    for i in range(1000):
        res += i + i * i + i**3
    q.put(res + index)


if __name__ == "__main__":
    q = mp.Queue()
    p1 = mp.Process(target=job, args=(q, 1))
    p2 = mp.Process(target=job, args=(q, 2))
    p1.start()
    p2.start()
    p1.join()
    p2.join()
    print(q.get())
    print(q.get())
