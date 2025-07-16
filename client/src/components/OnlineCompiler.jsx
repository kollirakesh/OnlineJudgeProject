import { useState } from 'react'
import axios from 'axios'

function OnlineCompiler() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('c')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await axios.post('http://localhost:8000/run', {
        language,
        code,
      })
      setOutput(res.data.output)
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error)
      } else {
        setError('Network error')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Online Compiler</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Language</label>
          <select
            className="border rounded w-full py-2 px-3"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            {/* Add more languages as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Code</label>
          <textarea
            className="border rounded w-full py-2 px-3 font-mono"
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write your code here"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Compiling...' : 'Run Code'}
        </button>
      </form>
      {output && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-full max-w-2xl mb-2">
          <strong>Output:</strong>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full max-w-2xl">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  )
}

export default OnlineCompiler
