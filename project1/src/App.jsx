import { useState } from 'react'
import './App.css'


function App() {
  //conditional rendering example
  // const [isLogged, setIsLogged] = useState(false)

  //event handling examples
  // const [message, setMessage] = useState('')
  // const handelClick = () => {
  //   setMessage('Button clicked!')
  // }
  // const handlerMouseOver = () => {
  //   setMessage('Mouse over!')
  // }
  // const handlerMouseOut = () => {
  //   setMessage('Mouse out!')
  // }
  // const handleKeyPress = (e) => {
  //   setMessage(`Key pressed: ${e.key}`)
  // }

  //Prop Drilling Example

  return (
      <div>

        {/* <p>{message}</p>
        <button onClick={handelClick}>Click me</button>
        <button onMouseOver={handlerMouseOver} onMouseOut={handlerMouseOut}>
          Hover me
        </button>
        <input type="text" onKeyPress={handleKeyPress} placeholder="Type something..." /> */}

        
        {/* {isLogged ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>}
        <button onClick={() => setIsLogged(!isLogged)}>
          {isLogged ? 'Log out' : 'Log in'}
        </button> */}


      </div>
  )
}

export default App
