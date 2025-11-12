import { useState, useEffect, useRef } from "react"

const Timer = () => {
    const [second, setSecond] = useState(95696)
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef(null)

    const convertToString = (sec) => {
        const SECONDS_PER_MINUTE = 60
        const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE
        const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR

        const days = Math.floor(sec / SECONDS_PER_DAY)
        const hours = Math.floor((sec % SECONDS_PER_DAY) / SECONDS_PER_HOUR)
        const minutes = Math.floor((sec % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
        const seconds = sec % SECONDS_PER_MINUTE

        const parts = []
        if (days) parts.push(days + 'd')
        if (hours) parts.push(hours + 'h')
        parts.push(minutes + 'm')
        parts.push(seconds + 's')

        return parts.join(' ')
    }

    useEffect(() => {
        if (isRunning) {

            intervalRef.current = setInterval(() => {
                setSecond((s) => s + 1)
            }, 1000)
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [isRunning])

    const handleReset = () => {
        setIsRunning(false)
        setSecond(0)
    }

    const handleToggle = () => {
        setIsRunning((r) => !r)
    }

    return (
        <div className="border border-black border-2 m-auto rounded-3 p-2 bg-secondary-subtle text-center mt-3" style={{width: 'fit-content'}}>
            <h1 className="text-center text-primary">TIMER</h1>
            <input className="form-control mb-3 text-end fw-bold text-dark fs-3" value={convertToString(second)} readOnly></input>
            <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-danger" onClick={handleReset}><i className="bi bi-arrow-counterclockwise"></i>&nbsp;Reset</button>
                <button className={`btn ${isRunning ? 'btn-secondary' : 'btn-success'}`} onClick={handleToggle}>
                    <i className={`bi ${isRunning ? 'bi-pause' : 'bi-play'}`}></i>&nbsp;{isRunning ? 'Pause' : 'Run'}
                </button>
            </div>
        </div>
    )
}

export default Timer