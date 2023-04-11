# paramiko - 优雅的 SSH 协议实现

<div class="no-link">

[![version](https://img.shields.io/pypi/v/paramiko)](https://pypi.org/project/paramiko/)
[![python](https://img.shields.io/pypi/pyversions/paramiko)](https://pypi.org/project/paramiko/)
[![license](https://img.shields.io/pypi/l/paramiko)](https://github.com/paramiko/paramiko/blob/main/LICENSE)
[![ci](https://img.shields.io/circleci/build/github/paramiko/paramiko/main)](https://app.circleci.com/pipelines/github/paramiko/paramiko)
[![coverage](https://img.shields.io/codecov/c/gh/paramiko/paramiko)](https://app.codecov.io/gh/paramiko/paramiko)

</div>

[[TOC]]

## 1. 项目简介

| 项目        | 信息                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------- |
| 项目地址    | [PyPI](https://pypi.org/project/paramiko/) \| [GitHub](https://github.com/paramiko/paramiko) |
| 官方文档    | [paramiko.org](http://paramiko.org/)                                                         |
| 开源协议    | LGPL-2.1                                                                                     |
| Python 版本 | Python 3.7 ~ 3.11                                                                            |
| 标签        | 工具                                                                                         |

Paramiko 是 SSHv2 协议的纯 Python 实现，同时提供客户端和服务器功能。Paramiko 多用于客户端，并且多用于远程连接到 Linux 服务器，查看上面的日志状态，批量配置远程服务器，文件上传，文件下载等。

安装：

```bash
pip install paramiko
```

## 2. 快速入门

Paramiko 是一个基于 SSH 用于连接远程服务器并执行相关操作（`SSHClient` 和 `SFTPClinet`，即一个是远程连接，一个是上传下载服务），使用该模块可以对远程服务器进行命令或文件操作，值得一说的是，Fabric 和 Ansible 内部的远程管理就是使用的 Paramiko 来实现的。

Paramiko 最常用的两个类为 `SSHClient` 类和 `SFTPClient` 类，分别提供 SSH 和 SFTP 功能。

核心 SSH 协议类：
- `Channel`：是一种 `Socket`、安全的 SSH 传输通道
- `Client`：客户端的封装
- `Message`：包含向流中写入字节，提取字节等方法
- `Packetizer`：检查握手，获取 Channel ID 等方法
- `Transport`：是一种加密的会话，使用时会同步创建了一个加密的通道（即 `Tunnels`），这个通道叫做 `Channel`，此类包含公钥认证，打开 Channel 通道等方法

秘钥相关类：
- SSH Agent 类：`Agent`
- Host Key 类：`HostKeys`
- Key handling 类
    - `PKey`
    - `PublicBlob`
    - `DSSKey`
    - `RSAKey`
    - `ECDSAKey`
    - `Ed25519Key`

GSS API 认证和秘钥交换：
- `ssh_gss`
- `kex_gss`

## 3. API 与示例

### 3.1 SSHClient 常用方法

下面是方法和参数含义：

| `connect()`          | 实现远程服务器的连接与认证          |
| -------------------- | ----------------------------------- |
| `hostname`           | 目标主机，必须字段                  |
| `port=22`            | 端口                                |
| `username=None`      | 验证的用户名                        |
| `password=None`      | 验证的用户密码                      |
| `pkey=None`          | 私钥方式用于身份验证                |
| `key_filename=None`  | 一个文件名或文件列表，指定私钥文件  |
| `timeout=None`       | TCP 连接超时时间                    |
| `allow_agent=True`   | 是否允许连接到 SSH 代理，默认为允许 |
| `look_for_keys=True` | 是否在 `~/.ssh` 中搜索私钥文件      |
| `compress=False`     | 是否打开压缩                        |

我们连接之前通常要设置远程服务器没有在 `know_hosts` 文件中记录时的策略，`SSHClient` 对象有一个方法 `set_missing_host_key_policy()` 就是用于设置缺失的策略。

| `set_missing_host_key_policy()` | 不存在记录时的策略     |
| ------------------------------- | ---------------------- |
| `policy`                        | 必须为下面所提供的策略 |

有三种策略可用：
1. `paramiko.AutoAddPolicy` 自动添加主机名及主机密钥到本地 `HostKeys` 对象，不依赖 `load_system_host_key()` 的配置。即新建立 SSH 连接时不需要再输入 `"yes"` 或 `"no"` 进行确认
2. `paramiko.WarningPolicy` 用于记录一个未知的主机密钥的 Python 警告。并接受，功能上和 `AutoAddPolicy` 类似，但是会提示是新连接
3. `paramiko.RejectPolicy` 自动拒绝未知的主机名和密钥，依赖 `load_system_host_key()` 的配置。此为默认选项

执行命令方法：

| `exec_command()`   | 在远程服务器执行 Linux 命令的方法 |
| ------------------ | --------------------------------- |
| `command`          | 命令                              |
| `bufsize=-1`       | 缓冲区大小                        |
| `timeout=None`     | 超时时间                          |
| `get_pty=False`    | 请求一个伪终端                    |
| `environment=None` | 给定一个环境变量字典              |

创建 SFTP 方法 `open_sftp()`，在当前 SSH 会话的基础上创建一个 SFTP 会话。该方法会返回一个 `SFTPClient` 对象。

| `open_sftp()` | 创建 SFTP 方法 |
| ------------- | -------------- |

### 3.2 SSHClient 示例

账号密码登录：

```python
import paramiko

# 实例化 SSHClient
ssh_client = paramiko.SSHClient()
# 自动添加策略
ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# 连接 SSH 服务端，以用户名和密码进行认证，调用 connect() 方法连接服务器
ssh_client.connect(hostname='192.168.137.105', port=22,
                   username='root', password='123456')
# 打开一个 Channel 并执行命令
stdin, stdout, stderr = ssh_client.exec_command('df -hT')
# 关闭 SSHClient 连接
ssh_client.close()
```

私钥登录：

```python
import paramiko

# 配置私人密钥文件位置
private = paramiko.RSAKey.from_private_key_file('/root/.ssh/id_rsa')
# 实例化 SSHClient
ssh_client = paramiko.SSHClient()
# 自动添加策略
ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# 连接 SSH 服务端，使用 RSA 认证
ssh_client.connect(
    hostname='192.168.137.100',
    port=22,
    username='root',
    pkey=private
)
# 打开一个 Channel 并执行命令
stdin, stdout, stderr = ssh_client.exec_command('df -hT')
# 关闭 SSHClient 连接
ssh_client.close()
```

### 3.3 SFTPClient 常用方法

`SFTPCLient` 作为一个 SFTP 的客户端对象，根据 SSH 传输协议的 SFTP 会话，实现远程文件操作，如上传、下载、权限、状态。

| 常用方法           | 功能                             |
| ------------------ | -------------------------------- |
| `from_transport()` | 创建一个已连通的 SFTP 客户端通道 |
| `put()`            | 将本地文件上传到服务器           |
| `get()`            | 从服务器下载文件到本地           |
| `mkdir()`          | 在服务器上创建目录               |
| `remove()`         | 在服务器上删除目录               |
| `rename()`         | 在服务器上重命名目录             |
| `stat()`           | 查看服务器文件状态               |
| `listdir()`        | 列出服务器目录下的文件           |

### 3.4 SFTPClient 示例

```python
import paramiko

# 实例化一个 Transport 对象
tran = paramiko.Transport(('192.168.137.100', 22))
# 连接 SSH 服务端，使用密码登录
tran.connect(username='root', password='123456')
# 获取 SFTP 实例
sftp = paramiko.SFTPClient.from_transport(tran)
# 设置上传的本地、远程文件路径
local_path = '/home/1.txt'
remote_path = '/tmp/1.txt'
# 执行上传动作
sftp.put(local_path, remote_path)
# 执行下载动作
sftp.get(remote_path, local_path)
# 关闭 Transport 通道
tran.close()
```

## 4. 示例代码

### 4.1 单台主机操作

```python
import paramiko

hostname = '192.168.137.100'
host_port = 22
username = 'root'
password = '123456'

def ssh_client_con():
    """创建 SSH 连接，并执行 Shell 命令
    """
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy)

    ssh_client.connect(
        port=host_port,
        hostname=hostname,
        username=username,
        password=password
    )

    shell_command = 'ps aux'
    stdin, stdout, stderr = ssh_client.exec_command(shell_command)
    stdout_info = stdout.read().decode('utf8')
    print(stdout_info)

    stderr_info = stderr.read().decode('utf8')
    print(stderr_info)

def sftp_client_con():
    """创建 SFTP 连接并上传文件
    """
    tran = paramiko.Transport((hostname, host_port))
    tran.connect(username=username, password=password)
    sftp = paramiko.SFTPClient.from_transport(tran)

    local_path = 'demo.jpg'
    remote_path = '/home/333.jpg'
    put_info = sftp.put(local_path, remote_path, confirm=True)
    print(put_info)
    print('上传完成')

    save_path = '7.jpg'
    sftp.get(remotepath=remote_path, localpath=save_path)
    print('下载完成')

    tran.close()

if __name__ == '__main__':
    ssh_client_con()
    sftp_client_con()
```

### 4.2 批量操作主机

```py
import paramiko

def ssh_client_con():
    """创建 SSH 连接，并执行 Shell 命令
    """
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy)

    ssh_client.connect(
        port=host_port,
        hostname=hostname,
        username=username,
        password=password
    )

    shell_command = '''
    path = '/tmp'
    tree ${path}
    if [ $? -ne 0 ]
    then
        yum install -y tree
        tree ${path}
    fi
    '''
    stdin, stdout, stderr = ssh_client.exec_command(shell_command)

    stdout_info = stdout.read().decode('utf8')
    print(stdout_info)

    stderr_info = stderr.read().decode('utf8')
    print(stderr_info)

def sftp_client_con():
    """创建 SFTP 连接并上传文件
    """
    tran = paramiko.Transport((hostname, host_port))
    tran.connect(username=username, password=password)
    sftp = paramiko.SFTPClient.from_transport(tran)

    local_path = 'demo.jpg'
    remote_path = '/home/333.jpg'
    put_info = sftp.put(local_path, remote_path, confirm=True)
    print(put_info)
    print('上传完成')

    save_path = '7.jpg'
    sftp.get(remotepath=remote_path, localpath=save_path)
    print('下载完成')

    tran.close()

try:
    with open('host_site.txt', 'r', encoding='utf-8') as host_file:
        for host_info in host_file:
            line = host_info.strip('\n')
            hostname, host_port, username, password = line.split(',')
            print(f'[Info] {hostname} 执行结果')
            ssh_client_con()
except FileNotFoundError as file_error:
    print(file_error)
except Exception as e:
    print(e)
```

其中 `host_site.txt` 文件内容格式如下：主机地址、端口、用户、密码：

```csv
192.168.137.100,22,root,123456
192.168.137.101,22,root,123456
192.168.137.102,22,root,123456
192.168.137.103,22,root,123456
192.168.137.104,22,root,123456
```
