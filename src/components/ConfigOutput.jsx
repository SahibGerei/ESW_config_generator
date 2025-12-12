import React from 'react';

export default function ConfigOutput({ data }) {
  const { sysname, vlan, ip, mask, gw, portType, portNumber, switchType } = data;

  const config = `
${switchType} Configuration Example
Sysname: ${sysname}
VLAN: ${vlan}
IP: ${ip} ${mask}
Gateway: ${gw}
Port: ${portType}${portNumber}
`;

  return (
    <div>
      <h2>Generated Config</h2>
      <pre>{config}</pre>
    </div>
  );
}