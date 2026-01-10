import { useState } from 'react'
import SwitchForm from './components/SwitchForm'
import Confirm from './components/Confirm'
import ConfigResult from './components/ConfigResult'

export default function App() {
  const [form, setForm] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-6">
        {!form && <SwitchForm onSubmit={setForm} />}
        {form && !confirmed && <Confirm data={form} onBack={() => setForm(null)} onConfirm={() => setConfirmed(true)} />}
        {form && confirmed && <ConfigResult data={form} onReset={() => { setForm(null); setConfirmed(false) }} />}
      </div>
    </div>
  )
}
