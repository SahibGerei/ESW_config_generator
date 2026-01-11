export default d => `

!
enable
!
configure terminal
!
hostname ${d.sysname}
!
vlan ${d.vlan}
name OMC_${d.sysname}
exit
!
interface ethernet ${d.port}
description Uplink
switchport mode trunk
switchport trunk allowed vlan ${d.vlan}
exit
!
username config privilege 15 password 7 superman
!
interface vlan-interface ${d.vlan}
ip address  ${d.ip} ${d.mask}
exit
!
ip route 0.0.0.0 0.0.0.0 ${d.gw}
!
ip ssh server
!
exit
!
crypto key generate rsa
!
crypto key refresh 
!
write running-config startup-config 
!
exit

После применения конфигурации доступ к оборудованию Maipu будет под учетной записью config с  паролем superman.
`