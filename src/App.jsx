import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [chars, setChars] = useState(false)
  const [password, setPassword] = useState("")

  const [isCopied, setIsCopied] = useState(false)

  //useRef hook
  const passwordRef = useRef(null)

  const copyPassToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
    setIsCopied(true)
  }, [password])

  const passwordGenerator = useCallback(() => {
    setIsCopied(false)
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) {
      str += "0123456789"
    }
    if (chars) {
      str += "!@#$%^&*()_+"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, chars, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, chars, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-64 text-orange-500 bg-gray-700 '>
        <h1 className='text-4xl text-center text-white my-4'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type='text'
          value={password}
          placeholder='Password'
          className="w-full px-3 py-1 outline-none"
          readOnly
          ref={passwordRef}
        />
        <button 
        onClick={copyPassToClipboard}

        className={`${isCopied ? 'bg-green-700' :'bg-blue-700'} outline-none text-white px-3 py-0.5 shrink-0`}
        >{isCopied ? 'Copied!' : 'Copy'}</button>

       </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={30}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            id="numberInput"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev)=> !prev);
            }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            id="characterInput"
            defaultChecked={chars}
            onChange={() => {
              setChars((prev)=> !prev);
            }}
            />
            <label htmlFor='characterInput'>Sp. Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App