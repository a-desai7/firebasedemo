import { useState, useEffect } from 'react'
import { InputField } from './InputField'

export const InputSection = () => {

  const [dormList, setDormList] = useState([])
  const [floorList, setFloorList] = useState([])
  const [dorm, setDorm] = useState("")
  const [floor, setFloor] = useState("")

  // no dependency means it will only run on first load
  useEffect(() => {
    
    //fetch dorm information 
    setDormList(["uhjggh", "dfgsgsd", "fwre"])

    //fetch floor information 
    setFloorList(["waawa", "sdiadiaowa", "nisdadaw"])
    
  }, [])

  return (
    <section className="container mx-auto flex flex-col justify-center items-center">
      <InputField dataList={dormList} setData={setDorm} label={"dorm"}/>
      <InputField dataList={floorList} setData={setFloor} label={"floor"}/>
    </section>
  )
}

