import { TextField, Stack, Button } from '@mui/material'
import './App.css'
import { useState } from 'react'

function App() {

  // create state to store data
  const [interest, setInterest] = useState(0)
  const [principal, setPrincipal] = useState(0)
  const [rate, setRate] = useState(0)
  const [year, setYear] = useState(0)

  const [principalAmountValid, setPrincipalAmountValid] = useState(true)
  const [rateAmountValid, setRateAmountValid] = useState(true)
  const [yearAmountValid, setYearAmountValid] = useState(true)

  const handleReset = () => {
    console.log("inside handlreset function");
    //reset all state
    setInterest(0)
    setPrincipal(0)
    setRate(0)
    setYear(0)
    setPrincipalAmountValid(true)
    setRateAmountValid(true)
    setYearAmountValid(true)
  }

  const handleValidation = (tag) => {
    console.log("handleValidation");
    const {value, name} = tag
    console.log(value,name);
    console.log(!!value.match(/^[0-9]*.?[0-9]+$/))

    if(!!value.match(/^\d*\.?\d+$/)){
      //valid
      if(name=="principal"){
        setPrincipal(value)
        setPrincipalAmountValid(true)
      }else if(name=="rate"){
        setRate(value)
        setRateAmountValid(true)
      }else {
        setYear(value)
        setYearAmountValid(true)
      }
    }else{
      //invalid
      if(name=="principal"){
        setPrincipal(value)
        setPrincipalAmountValid(false)
      }else if(name=="rate"){
        setRate(value)
        setRateAmountValid(false)
      }else {
        setYear(value)
        setYearAmountValid(false)
      }
    }
  }

  const handleCalculate = () => {
    if(principal && rate && year){
      setInterest(principal*year*rate/100)
    }else {
      alert("please fill the form completely!!")
    }
  }

  return (
    <div style={{width:'100%' , height: '100vh'}} className='d-flex justify-content-center align-items-center bg-dark'>
      <div style={{width:'600px'}} className='bg-light p-5 rounded'>
        <h3>Simple interset calculator</h3>
        <p>calculate your simple interest easily</p>
        <div className="d-flex justify-content-center align-items-center bg-warning p-3 rounded shadow flex-column text-light">
          <h1>₹ {interest}</h1>
          <p className='fa-border'>total simple interest</p>
        </div>

        <form className='mt-5' action="">
          {/* principal */}
          <div className="mb-3">
          <TextField className='w-100' id="outlined-basic-principal" label="₹ principle amount" variant="outlined" value={principal || ""} name='principal' onChange= {tag =>{handleValidation(tag.target)}} />
          </div>
         { !principalAmountValid && <div className="text-danger mb-3">*invalid principal input</div>}
          {/* rate */}
          <div className="mb-3">
          <TextField className='w-100' id="outlined-basic-rate" label="rate of interest" variant="outlined" value={rate || ""} name='rate' onChange= {tag =>{handleValidation(tag.target)}} />
          </div>
         { !rateAmountValid && <div className="text-danger mb-3">*invalid user input</div>}
          {/* time */}
          <div className="mb-3">
          <TextField className='w-100' id="outlined-basic-time" label="Time period (Yr)" variant="outlined" value={year || ""} name='year' onChange= {tag =>{handleValidation(tag.target)}} />
          </div>
          { !yearAmountValid && <div className="text-danger mb-3">*invalid user input</div>}
          {/* btn collection */}
          <Stack direction="row" spacing={2}>
          <Button onClick={handleCalculate} disabled={!principalAmountValid || !rateAmountValid || !yearAmountValid} style={{width:'50%', height:'70px'}} variant="contained" className='bg-dark'>Calculate</Button>
          <Button onClick={handleReset}  style={{width:'50%', height:'70px'}} variant="outlined">Reset</Button>
          </Stack>
        </form>
        </div>
    </div>
  )
}

export default App
