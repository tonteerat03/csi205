import { useEffect, useState } from "react"

const Value = ({name , initial , type , value , setValue}) => {
    // const [value , setValue] = useState(0)

    useEffect( () => {
        setValue(initial || 0)
    }, [initial])

    return (

        // container

        <div 
            className="border border-black border-2 m-auto rounded-3 p-2 bg-secondary-subtle text-center mt-3" style={{width: 'fit-content'}}>
            <h1 className='text-primary'>{  name || 'VALUE' }</h1>
            <div className="d-flex justify-content-between align-items-center gap-2">
                <button className='btn btn-danger btn-lg' 
                onClick={ () => setValue ( (p) => p - 1 )  }>&minus;</button>
                <div className="fs-3 fw-bold">{ type === 'real' ? value.toFixed(2) : Math.round(value) }</div>
                <button className='btn btn-success btn-lg' 
                onClick={ () => setValue ( (p) => p + 1 )  }>+</button>
            </div>
        </div>
    )
}

export default Value