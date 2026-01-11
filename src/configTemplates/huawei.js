export default d => `

# 
sys
#
sysname  ${d.sysname}
#
undo http server enable
undo http secure-server enable
# 
vlan ${d.vlan}
description omc
q
#
#
#
aaa
local-user config password cipher huawei
y
local-user config privilege level 3
local-user config service-type telnet terminal ssh
undo local-user admin
#
q
#
#
interface Vlanif${d.vlan}
description OMC
ip address ${d.ip} ${d.mask}
#
q
# 
ip route-static 0.0.0.0 0.0.0.0 ${d.gw}
#
user-interface con 0
authentication-mode aaa
idle-timeout 0 0
#
q
#
user-interface vty 0 4
authentication-mode aaa
protocol inbound all
q
# 
# 
interface ${d.portType}${d.port}
description UpLink
port link-type trunk
undo port trunk allow-pass vlan 1
port trunk allow-pass vlan ${d.vlan}
#
#
q
#
#
q
#
save
#
y
#


После применения конфигурации доступ к оборудованию  Huawei будет под учетной записью config с  паролем huawei.
`
