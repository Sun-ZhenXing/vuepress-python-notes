# pip 错误合集

[[TOC]]

## 1. 网络问题列表

出现下面任何一种情况：
- `These Packages Do Not Match The Hashes From The Requirements File.`
- `THESE PACKAGES DO NOT MATCH THE HASHES FROM THE REQUIREMENTS FILE`

哈希校验错误，原因可能是使用不安全传输时出现错误，重复尝试或者更换网络环境即可，一般是网络环境过差。

如果正在使用 HTTPS，可能出现下面的情况：
- `pip decryption failed or bad record mac (_ssl.c:2309)`
- `ERROR: Could not install packages due to an EnvironmentError: [SSL: DECRYPTION_FAILED_OR_BAD_RECORD_MAC]`

可能是网络受到攻击，或者是网络环境过差，可以尝试更换网络环境或者使用代理。

::: tip 解决

可以在其他环境使用 `pip download` 下载包，然后在当前环境使用 `pip install` 安装。在 Linux 下使用 `md5sum` 或者 `sha256sum` 命令计算哈希值。如果哈希值于服务器提供的不同则是网络传输问题。

:::
