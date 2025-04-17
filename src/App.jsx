import { useState } from 'react'
import './index.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-[100vw] text-center h-[100vh] flex flex-col justify-center items-center' >
      <h1>Bug Management</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
