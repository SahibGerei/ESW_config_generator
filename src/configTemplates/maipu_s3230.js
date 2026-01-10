export default d => `
enable
configure terminal
hostname ${d.sysname}
vlan ${d.vlan}
interface vlan ${d.vlan}
ip address ${d.ip} ${d.mask}
ip route 0.0.0.0 0.0.0.0 ${d.gw}
interface g${d.port}
switchport mode trunk
switchport trunk allowed vlan add ${d.vlan}
write running-config startup-config
`
