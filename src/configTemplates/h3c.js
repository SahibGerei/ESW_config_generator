export default d => `
sys
#
sysname ${d.sysname}
#
vlan ${d.vlan}
description OMC_${d.sysname}
#
interface Vlan-interface${d.vlan}
ip address ${d.ip} ${d.mask}
#
interface ${d.portType}${d.port}
description Uplink
port link-type trunk
port trunk permit vlan ${d.vlan}
#
ip route-static 0.0.0.0 0 ${d.gw}
#
ssh server enable
return
save
y
`
