export default d => `

!
configure terminal
! 
ip ssh seerver
!
ip ssh cipher aes128-ctr aes256-ctr
!
hostname ${d.sysname}
! 
vlan database
vlan ${d.vlan}
exit
! 
interface vlan ${d.vlan}
name OMC
ip address ${d.ip} ${d.mask}
exit
!
ip default-gateway 0.0.0.0 0.0.0.0 ${d.gw}
!
interface GigabitEthernet${d.port}
description UpLink_GE
switchport mode trunk
switchport trunk allowed vlan add ${d.vlan}
exit
!
interface te${d.port}
description UpLink_10GE
switchport mode trunk
switchport trunk allowed vlan add ${d.vlan}
exit
!
username config password superman@Eltex privelage 15
!
enable password level 15 superman@Eltex
!
exit
!
write
!
y

После настройки командой "show running-config" убедиться,что конфигурация сохранилась.



После применения конфигурации доступ к оборудованию  Eltex  будет под учетной записью config с  паролем superman@Eltex

`
