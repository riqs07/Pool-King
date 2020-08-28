import React,{useState} from 'react'
import ReactDOM from 'react-dom';
import dateUtils from 'date/'

import Button from '@material-ui/core/Button';
import { DateTimePicker ,MuiPickersUtilsProvider } from '@material-ui/pickers'
import TextField from '@material-ui/core/TextField';
const Home = () => {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <div>
            <h1>Hello.</h1>
            <Button variant="contained" color="primary">
      Hello World
    </Button>
    
   


return (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DateTimePicker
      label="DateTimePicker"
      inputVariant="outlined"
      value={selectedDate}
      onChange={handleDateChange}
    />

    <DateTimePicker
      autoOk
      ampm={false}
      disableFuture
      value={selectedDate}
      onChange={handleDateChange}
      label="24h clock"
    />

    <DateTimePicker
      value={selectedDate}
      disablePast
      onChange={handleDateChange}
      label="With Today Button"
      showTodayButton
    />
  </MuiPickersUtilsProvider>


        </div>
    )
}

export default Home
