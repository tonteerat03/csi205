import { useEffect, useRef, useState } from 'react'
import BasketballImg from './Animation/Basketball.png'
import FootballImg from './Animation/Football.png'
import VolleyballImg from './Animation/Volleyball.png'
import CartoonImg from './Animation/Cartoon.png'
import HumanImg from './Animation/Human.gif'

const Animation = () => {
  // constants
  const fieldWidth = 800
  const fieldHeight = 400
  const ballDiameter = 150

  // velocity
  const vxRef = useRef(4)
  const vyRef = useRef(4)

  const maxX = fieldWidth - ballDiameter - 2 // account for 1px border each side
  const maxY = fieldHeight - ballDiameter - 2

  // refs
  const xRef = useRef(0)
  const yRef = useRef(0)
  const goRightRef = useRef(true)
  const goDownRef = useRef(true)

  // react state
  const [run, setRun] = useState(false)
  const [ballImage, setBallImage] = useState(null)

  // dom refs
  const ballRef = useRef(null)
  const fieldRef = useRef(null)

  // initialize sizes once
  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.style.width = fieldWidth + 'px'
      fieldRef.current.style.height = fieldHeight + 'px'
    }
    if (ballRef.current) {
      ballRef.current.style.width = ballDiameter + 'px'
      ballRef.current.style.height = ballDiameter + 'px'
    }
  }, [])

  // animation loop
  useEffect(() => {
    const process = () => {
      if (!run) return

      // x
      if (goRightRef.current) {
        xRef.current += vxRef.current
        if (xRef.current >= maxX) goRightRef.current = false
      } else {
        xRef.current -= vxRef.current
        if (xRef.current <= 0) goRightRef.current = true
      }

      // y
      if (goDownRef.current) {
        yRef.current += vyRef.current
        if (yRef.current >= maxY) goDownRef.current = false
      } else {
        yRef.current -= vyRef.current
        if (yRef.current <= 0) goDownRef.current = true
      }

      // render
      if (ballRef.current) {
        ballRef.current.style.left = xRef.current + 'px'
        ballRef.current.style.top = yRef.current + 'px'
      }
    }

    const id = setInterval(process, 25)
    return () => clearInterval(id)
  }, [run, maxX, maxY])

  // keyboard handlers
  useEffect(() => {
    const handler = (event) => {
      // Spacebar toggles run/pause
      if (event.code === 'Space') {
        event.preventDefault()
        setRun((r) => !r)
        return
      }

      // numeric shortcuts
      switch (event.key) {
        case '0':
          changeBall(null)
          break
        case '1':
          changeBall(BasketballImg)
          break
        case '2':
          changeBall(FootballImg)
          break
        case '3':
          changeBall(VolleyballImg)
          break
        case '4':
          changeBall(HumanImg)
          break
        case '5':
          changeBall(CartoonImg)
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleRun = () => setRun((r) => !r)

  const changeBall = (imageFile) => {
    // imageFile should be an imported module URL (or null). Use it directly.
    setBallImage(imageFile || null)
    // bg color
    if (!imageFile && ballRef.current) {
      ballRef.current.style.backgroundImage = 'none'
      ballRef.current.style.backgroundColor = 'rgb(138, 213, 213)'
    }
    if (imageFile && ballRef.current) {
      ballRef.current.style.backgroundImage = `url('${imageFile}')`
      ballRef.current.style.backgroundSize = 'cover'
      ballRef.current.style.backgroundColor = 'transparent'
    }
  }

  // update run button
  const runButtonClass = run ? 'btn btn-warning custom-gap' : 'btn btn-success custom-gap'
  const runButtonLabel = run ? (<><i className="bi bi-pause"></i> PAUSE</>) : (<><i className="bi bi-play"></i> RUN</>)

  return (
    <>
      
      <style>{`
        .animate-container { margin: auto; width: fit-content; border: 1px solid black; border-radius: 10px; padding: 10px; }
  .animate-field { border: 1px solid black; border-radius: 10px; width: ${fieldWidth}px; height: ${fieldHeight}px; margin-bottom: 1rem; background-position: center; background-size: cover; background-image: url('/images.jpg'); overflow: hidden; position: relative; }
        .animate-ball { border-radius: 50%; border: 1px solid black; background-color: rgb(138, 213, 213); background-position: center; background-size: cover; width: ${ballDiameter}px; height: ${ballDiameter}px; position: absolute; left: 0px; top: 0px; }
        .custom-gap { margin-right: 15px; }
      `}</style>

      <div className="animate-container">
        <div id="field" ref={fieldRef} className="animate-field">
          <div id="ball" ref={ballRef} className="animate-ball" style={{ backgroundImage: ballImage ? `url('${ballImage}')` : 'none' }} />
        </div>

        <div className="animate-control">
          <button id="run" className={runButtonClass} onClick={toggleRun}>{runButtonLabel}</button>
          <button className="btn btn-secondary" onClick={() => changeBall(null)}>None</button>
          <button className="btn btn-outline-primary" onClick={() => changeBall(BasketballImg)}>Basketball</button>
          <button className="btn btn-outline-primary" onClick={() => changeBall(FootballImg)}>Football</button>
          <button className="btn btn-outline-primary" onClick={() => changeBall(VolleyballImg)}>Volleyball</button>
          <button className="btn btn-outline-primary" onClick={() => changeBall(HumanImg)}>Human</button>
          <button className="btn btn-outline-primary" onClick={() => changeBall(CartoonImg)}>Cartoon</button>
        </div>
      </div>
    </>
  )
}

export default Animation
