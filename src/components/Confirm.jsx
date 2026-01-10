export default function Confirm({ data, onBack, onConfirm }) {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white text-center">Проверьте данные:</h2>

        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-black">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-white/30 py-2 last:border-b-0">
              <span className="font-semibold text-white">{key}</span>
              <span className="text-white/90 ml-2 text-right">{String(value)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-3 mt-4">
          <button
            onClick={onBack}
            className="flex-1 py-2 px-4 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white font-semibold transition bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4"
          >
            Назад
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white font-semibold transition bg-gradient-to-r from-green-400 via-green-500 to-green-800 p-4"
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  )
}
