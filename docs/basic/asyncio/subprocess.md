# 创建异步子进程

[[TOC]]

## 1. 发起异步进程

```python
import asyncio

async def run(cmd: str | bytes):
    proc = await asyncio.create_subprocess_shell(
        cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await proc.communicate()

    print(f"{cmd!r} exited with {proc.returncode}")
    if stdout:
        print(f"[stdout]\n{stdout.decode()}")
    if stderr:
        print(f"[stderr]\n{stderr.decode()}")

asyncio.run(run("ls /"))
```

## 2. Windows 下的限制

*@TODO* Windows 只有 `ProactorEventLoop` 支持异步子进程，但是许多库都不支持 `ProactorEventLoop`，所以 Windows 下的异步子进程支持不好。
