# Python 获取系统桌面

## 1. Windows 系统

通过注册表：

```python
import winreg

def get_desktop_path() -> str:
    key = winreg.OpenKey(
        winreg.HKEY_CURRENT_USER,
        "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Shell Folders",
    )
    path = winreg.QueryValueEx(key, "Desktop")[0]
    return path
```

通过 Windows API `SHGetFolderPathW`：

```python
import ctypes

def get_desktop_path() -> str:
    CSIDL_DESKTOPDIRECTORY = 0x0010
    buf = ctypes.create_unicode_buffer(260)
    ctypes.windll.shell32.SHGetFolderPathW(
        None,
        CSIDL_DESKTOPDIRECTORY,
        None,
        0,
        buf,
    )
    desktop_path = buf.value
    return desktop_path
```
