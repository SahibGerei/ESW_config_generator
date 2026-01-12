export default d => `

Скорость com порта для подключения через консоль – 115200.
!!! На запрос в терминале установить пароль - ответить n !!!

! 
configure
! 
username config password cipher superman@N3COM group administrators
! 
ssh server start
! 
vlan ${d.vlan}
 description OMC
! 
interface vlan ${d.vlan}
 description OMC
 ip address ${d.ip}/30
! 
interface ge ${d.port}
 description UpLink
 port link-type trunk
 port trunk allow-pass vlan ${d.vlan}
!
ip route-static 0.0.0.0 0.0.0.0 ${d.gw}
!
end
!
save running-config
y
!

После настройки командой "show startup-config" убедиться,что конфигурация сохранилась.
Не всегда y принимается после save running-config


После применения конфигурации доступ к оборудованию  N3COM будет под учетной записью config с  паролем superman@N3COM.

`
