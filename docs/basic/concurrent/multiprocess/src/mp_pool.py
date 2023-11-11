import multiprocessing as mp


def job(x: int):
    return x**x


def multicore():
    pool = mp.Pool(processes=2)
    res = pool.map(job, range(1000))
    print(len(res))


if __name__ == "__main__":
    multicore()
