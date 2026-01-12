export default function SwitchForm({ onSubmit }) {
  return (
    <form 
      onSubmit={e => { e.preventDefault(); const data = Object.fromEntries(new FormData(e.target)); onSubmit(data) }}
      className="flex flex-col gap-4"
    >
	<h2 className="lg-heading text-center">Введите данные для создания конфигурации </h2>

<label className="lg-label">Наименнование оборудования</label>
      <input name="sysname" placeholder="Sysname" className="input-glass" />
<label className="lg-label">Сетевые настройки</label>
      <input type="number"  inputMode="numeric" pattern="[0-9]*"  min={2} max={4094} name="vlan" placeholder="VLAN управления ,от 2 до 4094" className="input-glass" />
      <input type="text"  inputMode="decimal" pattern="[0-9.]*" name="ip" placeholder="IP-Address, вида 10.10.0.1" className="input-glass" />
      <input type="text"  name="mask" placeholder="Subnet Mask, вида 255.255.255.0 или /30 для N3COM" className="input-glass" />
      <input type="text"  inputMode="decimal" pattern="[0-9.]*" name="gw" placeholder="Gateway, вида 10.10.0.1" className="input-glass" />
<label className="lg-label">Настройки порта управления:</label>	 
	 <select name="portType" className="select-container">
        <option>Ethernet</option>
        <option>GigabitEthernet</option>
       </select>
	  <input type="text" pattern="^([0-9]+/){1,2}[0-9]+$" name="port" placeholder="Номер порта, например 1/0/1" className="input-glass" /> 
<div className="note">
  <h2>Примечание:</h2>
  <div className="note-line"><span className="vendor">Huawei:</span> 0/0/*</div>
  <div className="note-line"><span className="vendor">H3C/N3COM:</span> 1/0/*</div>
  <div className="note-line"><span className="vendor">MAIPU IS230:</span> 0/0/*</div>
  <div className="note-line"><span className="vendor">MAIPU S3230:</span> 0/*</div>
  <div className="note-line explanation">* — порядковый номер порта, например 0/0/1</div>
</div>
<label className="lg-label">Выберите производителя оборудования:</label>	 
      <select name="switchType" className="select-container">
        <option>Huawei</option>
        <option>H3C</option>
		<option>N3COM</option>
        <option>MAIPU_is230</option>
        <option>MAIPU_s3230</option>
      </select>
      <button type="submit"  className="flex-1 py-2 px-4 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white font-semibold transition bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4" >Generate</button>
    </form>
  )
}