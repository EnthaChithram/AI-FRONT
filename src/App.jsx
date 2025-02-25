import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {

  const [inputValue, setInputValue] = useState('')
  const [color, setColor] = useState("black")
  const [loading, setLoading] = useState(false)


  const [serverStatus, setServerStatus] = useState(2)

  const checkServerStatus = async () => {
    setServerStatus(2)
    const response = await fetch('https://aiaiai-zfg6.onrender.com/check')
    if (response.ok) {
      setServerStatus(1)
    } else {
      setServerStatus(0)
    }
  }

  useEffect(() => {
    checkServerStatus()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    checkServerStatus()

    const response = await fetch('https://aiaiai-zfg6.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: inputValue }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setColor(data.color); // Handle the response data as needed
    } else {
      console.error('Error:', response.statusText);
    }
    setLoading(false)


  }




  return (
    <div style={{ backgroundColor: color }} className="trasition-all duration-500 text-white flex flex-col space-y-2 items-center justify-center h-screen">

      <div className='mb-10'><strong>server status: </strong><span>{serverStatus === 0 ? "server down" : serverStatus === 1 ? "running" : "starting server... (may take upto 30 seconds)"}</span></div>
      <br></br>
      <form className="flex flex-col  items-center justify-center  space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a word"
          className="border bg-black rounded-3xl p-2  focus:outline-none text-center "
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="text-black bg-white  px-4 py-2 rounded-3xl cursor-pointer">{loading ? "Loading..." : "Submit"}</button>
      </form>

      <p>{color}</p>

      <strong className='mt-10 text-center'>Uses MistralAI through OpenRouter API. Output might be inconsistent.</strong>
      <strong className='mt-5'>Hit submit again if it keeps loading</strong>

    </div>

  )
}

export default App
