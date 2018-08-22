import {evolve, curry, compose, concat} from 'ramda'
import moment from 'moment'

const dateFormatter = ts => {
  return moment(new Date(ts)).format('MMM YYYY')
}

const currency = compose(concat('$'), new Intl.NumberFormat().format, Math.round);

const transformations = {
  formattedDate : dateFormatter,
  interest: currency,
  principal: currency,
  principalPaid: currency,
  balance: currency,
};


const applyTransformation = curry((list,  transformation = transformations) => {
    const transformed = list.map(period => {
      return evolve(transformation, period)
    })
    return transformed
})

const amatorizationSchedule = (loanAmount, rate, payment, startDate = new Date(), formatDate = true, formatter = dateFormatter) => {
  let balance = loanAmount
  let periods = []
  let counter = 0
  let principalPaid = 0
  rate = rate/100/12 // expect rate as 4.25 format. Could make more resilient...
  
  while (balance > 0) {
    const interest = balance * rate
    const principal = payment - interest
    principalPaid = principalPaid + principal
    balance = balance - principal
    const date = moment(startDate).add(counter, 'months').valueOf()
    const year = moment(date).year()
    const periodInfo = {
      formattedDate : formatDate ? formatter(date) : date,
      date,
      interest,
      year,
      principal,
      principalPaid,
      balance,
      month : counter +1
    }
    counter++;
    periods.push(periodInfo)
  }
  return periods
}


export {
  amatorizationSchedule,
  applyTransformation,
}