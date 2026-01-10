export default d => `
enable
configure terminal
hostname ${d.sysname}
vlan ${d.vlan}
interface vlan-interface ${d.vlan}
ip address ${d.ip} ${d.mask}
interface ethernet ${d.port}
switchport mode trunk
switchport trunk allowed vlan ${d.vlan}
ip route 0.0.0.0 0.0.0.0 ${d.gw}
write running-config startup-config
`
