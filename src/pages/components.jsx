import { useState } from "react"
import RadixCounter from "../component/RadixCounter"
import Value from "../component/Value"
import Adder from "../component/Adder"
import Timer from "../component/Timer"
import Temperature from "../component/Temperatures"

const  Components = () => {

    const [counter , setCounter] = useState (0)

    return (  
    <>
  
      {/* <RadixCounter /> */}

      <Value name={'COUNTER'} value ={counter} setValue={ setCounter}/>

      <Adder />

      <Timer />

      <Temperature />

      <p className='text-center fw-bold mt-3'>67176481 นายธีรัตม์ ศรีลัดดา</p>
    </> 
    )
}
 
export default Components