import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {

  const [inputValue, setInputValue] = useState('')
  const [color, setColor] = useState("black")
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

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

    const check = await fetch('https://aiaiai-zfg6.onrender.com/check')


    console.log(check)
  }




  return (
    <div style={{ backgroundColor: color }} className="trasition-all duration-500 text-white flex flex-col items-center justify-center h-screen">
      <form className=" flex flex-col  items-center justify-center  space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a word"
          className="border bg-black rounded-lg p-2 focus:outline-none "
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="text-black bg-white  px-4 py-2 rounded-lg cursor-pointer">{loading ? "Loading..." : "Submit"}</button>
      </form>

      <p>{color}</p>

      <p className='mt-10 text-center'>The answers are from an LLM called "mistral". Its a free API and the output might be inconsistent.</p>
      <p className='mt-5'>Hit submit again if it keeps loading</p>

    </div>

  )
}

export default App
