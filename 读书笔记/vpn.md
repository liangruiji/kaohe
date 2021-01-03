# ------------------------------
#  设置VPN客户端配置
# ------------------------------
client
dev tun
proto udp
# remote telking.3322.org 51194
remote vpn.telking.com 51194
resolv-retry infinite
nobind
persist-key
persist-tun
ca ca.crt
cert LiangRuiJi.crt
key LiangRuiJi.key
verb 3
# 不存储验证缓存
auth-nocache
remote-cert-tls server

# cipher AES-256-CBC

