import React from 'react'
import Table from './Table'
import {amatorizationSchedule, applyTransformation} from '../api/api'
import {withSlider, addOpen} from '../withSlider'

const periods = applyTransformation(amatorizationSchedule(300000,5.25,1656.61))
//const periods = applyTransformation(amatorizationSchedule(242000,3.5,1659,1397577476000))

const SliderTable = withSlider(Table)

const rowKeys = ['formattedDate', 'interest', 'principal', 'balance', 'principalPaid', 'month']
const headers = ['Date', 'Interest', 'Principal', 'Balance', 'Principal Paid', 'Month']

const App = ({open, onOpen, onClose}) => {
  return (
    <div className="App">
       <button href="#" onClick={onOpen}>
          Click me
       </button>
      <SliderTable rowItems={periods} rowKeys={rowKeys} headers={headers}
        transition='.4s' open={open} onClose={onClose} />
    </div>
  );
}

export default addOpen(App)