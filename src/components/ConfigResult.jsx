import { useState } from 'react'
import huaweiTemplate from '../configTemplates/huawei.js'
import h3cTemplate from '../configTemplates/h3c.js'
import maipu_is230Template from '../configTemplates/maipu_is230.js'
import maipu_s3230Template from '../configTemplates/maipu_s3230.js'

export default function ConfigResult({ data, onReset }) {
  const [copied, setCopied] = useState(false)
  const [vendor, setVendor] = useState(data?.switchType || '')

  let template = 'No template selected'

  if (vendor) {
    switch (vendor) {
      case 'Huawei': template = huaweiTemplate(data); break
      case 'H3C': template = h3cTemplate(data); break
      case 'MAIPU_is230': template = maipu_is230Template(data); break
      case 'MAIPU_s3230': template = maipu_s3230Template(data); break
      default: template = 'No template selected'
    }
  }

  const handleCopy = () => {
    if (!navigator.clipboard) return alert('Clipboard API not supported')
    navigator.clipboard.writeText(template)
      .then(() => setCopied(true))
      .catch(err => alert('Failed to copy: ' + err))
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white text-center">Конфигурация готова:</h2>

       

        {/* Блок конфигурации */}
        <pre className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-black overflow-x-auto whitespace-pre-wrap">
          {template}
        </pre>

        {/* Кнопки */}
        <div className="flex justify-between gap-3 mt-4">
          <button
            onClick={onReset}
            className="flex-1 py-2 px-4 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white font-semibold transition bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4"
          >
            На главную
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 py-2 px-4 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white font-semibold transition bg-gradient-to-r from-green-400 via-green-500 to-green-800 p-4"
          >
            {copied ? 'Скопировано!' : 'Скопировать'}
          </button>
		  
        </div>
		 {/* Выбор вендора */}
        <select
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          className="w-full bg-white/30 backdrop-blur-sm p-2 rounded-lg text-black font-semibold"
        >
          <option value="">Select vendor</option>
          <option value="Huawei">Huawei</option>
          <option value="H3C">H3C</option>
          <option value="MAIPU_is230">MAIPU_is230</option>
          <option value="MAIPU_s3230">MAIPU_s3230</option>
        </select>
      </div>
    </div>
  )
}
