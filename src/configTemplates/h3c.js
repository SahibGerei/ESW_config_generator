export default d => `

# 
sys
#
 sysname ${d.sysname}
#
 irf mac-address persistent timer
 irf auto-update enable
 undo irf link-delay
 irf member 1 priority 1
#
 lldp global enable
#
 password-recovery enable
#
vlan 1
#
vlan ${d.vlan}
 description OMC_${d.sysname}
#
 stp global enable
#
interface NULL0
#
interface Vlan-interface${d.vlan}
 ip address ${d.ip} ${d.mask}
#
interface ${d.portType}${d.port}
 description Uplink
 port link-type trunk
 port trunk permit vlan ${d.vlan}
#
 scheduler logfile size 16
#
line class aux
 user-role network-admin
#
line class vty
 user-role network-operator
#
line aux 0
 authentication-mode password
 user-role level-15
 set  authentication password simple superman@H3C
 idle-timeout 60 0
#
line vty 0 63
 authentication-mode scheme
 user-role network-operator
protocol inbound all
 idle-timeout 20 0
#
 ip route-static 0.0.0.0 0 ${d.gw}
#
 ssh server enable
#
radius scheme system
 user-name-format without-domain
#
domain system
#
 domain default enable system
#
user-group system
#
local-user config class manage
 password simple superman@H3C  
 service-type ssh terminal
 authorization-attribute user-role level-15
 authorization-attribute user-role network-operator
#
return
#
save
#
y
#

После применения конфигурации доступ к оборудованию H3C будет под учетной записью config с  паролем superman@H3C.