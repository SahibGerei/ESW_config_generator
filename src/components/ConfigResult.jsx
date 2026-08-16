import { useState } from 'react'
import huaweiTemplate from '../configTemplates/huawei.js'
import h3cTemplate from '../configTemplates/h3c.js'
import maipu_is230Template from '../configTemplates/maipu_is230.js'
import maipu_s3230Template from '../configTemplates/maipu_s3230.js'
import N3COMTemplate from '../configTemplates/N3COM.js'
import ELTEX_MES3300Template from '../configTemplates/ELTEX_MES3300.js'

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
      case 'N3COM': template = N3COMTemplate(data); break
      case 'ELTEX_MES3300': template = ELTEX_MES3300Template(data); break
      default: template = 'No template selected'
    }
  }

  // Запасной метод копирования через временный элемент textarea
  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea")
    textArea.value = text
    
    // Скрываем элемент, чтобы избежать визуальных скачков интерфейса
    textArea.style.position = "fixed"
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.opacity = "0"
    
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')
      if (successful) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // Возвращаем текст кнопки через 2 секунды
      } else {
        console.warn('Fallback: Copy command failed')
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
  }

  const handleCopy = () => {
    const textToCopy = typeof template === 'string' ? template : JSON.stringify(template, null, 2)

    // Сначала пробуем современный Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch((err) => {
          console.warn('Clipboard API failed, trying fallback...', err)
          fallbackCopy(textToCopy) // Если API выдало ошибку, используем запасной вариант
        })
    } else {
      // Если Clipboard API не поддерживается (или контекст небезопасный)
      fallbackCopy(textToCopy)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([template], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    // Формируем имя файла: SwitchType_Sysname_IP_config.txt
    const parts = [data?.switchType, data?.sysname, data?.ip, 'config'].filter(Boolean)
    const fileName = parts.join('_') + '.txt'

    // Создаем ссылку для скачивания
    const a = document.createElement('a')
    a.href = url
    a.download = fileName

    // Для обычных браузеров
    a.click()

    // Попытка открыть в новой вкладке (для Telegram Web/MiniApp)
    window.open(url, '_blank')

    // Очищаем объект
    setTimeout(() => URL.revokeObjectURL(url), 5000)
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

        {/* Кнопка скачать */}
        <div hidden>
          <button
            onClick={handleDownload}
            className="w-full py-2 px-4 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white font-semibold transition bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800 p-4"
          >
            Скачать (только для WEB-версии)
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
          <option value="N3COM">N3COM</option>
          <option value="MAIPU_is230">MAIPU_is230</option>
          <option value="MAIPU_s3230">MAIPU_s3230</option>
          <option value="ELTEX_MES3300">ELTEX_MES3300</option>
        </select>
      </div>
    </div>
  )
}