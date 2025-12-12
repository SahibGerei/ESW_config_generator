import React, { useState } from 'react';

export default function FormInput({ setData, next }) {
  const [form, setForm] = useState({
    sysname: '',
    vlan: '',
    ip: '',
    mask: '',
    gw: '',
    portType: 'GigabitEthernet',
    portNumber: '',
    switchType: 'Huawei'
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setData(form);
    next();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="sysname" placeholder="Sysname" onChange={handleChange} required />
      <input name="vlan" placeholder="VLAN" type="number" min="2" max="4094" onChange={handleChange} required />
      <input name="ip" placeholder="IP Address" onChange={handleChange} required />
      <input name="mask" placeholder="Subnet Mask" onChange={handleChange} required />
      <input name="gw" placeholder="Gateway" onChange={handleChange} required />
      <select name="portType" onChange={handleChange} value={form.portType}>
        <option>Ethernet</option>
        <option>GigabitEthernet</option>
      </select>
      <input name="portNumber" placeholder="Port Number" onChange={handleChange} required />
      <select name="switchType" onChange={handleChange} value={form.switchType}>
        <option>Huawei</option>
        <option>H3C</option>
        <option>MAIPU</option>
      </select>
      <button type="submit">Next</button>
    </form>
  );
}