export default d => `

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
interface vlan ${d.vlan}
ip address ${d.ip} ${d.mask}
no shutdown
exit
!
ip route 0.0.0.0 0.0.0.0 ${d.gw}
!
enable password superman@Maipu 
!
configure terminal
local-user config class manager
password 0 superman@Maipu
service-type telnet ssh web console
privilege 15
exit
!
ip ssh server sshv1-compatible
line vty 0 15
login aaa
exit
!
interface g${d.port}  #Для GE-порта
description UPLINK_GE
switchport mode trunk
switchport trunk allowed vlan add ${d.vlan}
switchport trunk pvid vlan 1
exit
!
interface tengigabitethernet${d.port}  #Для xGE-порта 
description UPLINK_xGE
switchport mode trunk
switchport trunk allowed vlan add ${d.vlan}
switchport trunk pvid vlan 1
exit
!
write running-config startup-config 
!

После применения конфигурации доступ к оборудованию Maipu будет под учетной записью config с  паролем superman@Maipu
`