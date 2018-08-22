import {amatorizationSchedule,  applyTransformation} from './api'
import {find, propEq} from 'ramda'

    let expected = {
      formattedDate: 'Nov 2026',
      date: 1794530962079,
      year: 2026,
      interest: 1126.4697113137427,
      principal: 530.1402886862572,
      principalPaid: 43051.34913125921,
      balance: 256948.65086874066,
      month: 100
    }

describe('API', () => {
  it('default amatorizationSchedule', () => {
    let schedule = amatorizationSchedule(300000,5.25,1656.61,1534117762079)
    let value = find(propEq('formattedDate', 'Nov 2026'))(schedule)

    expect(value).toEqual(expected);
  });
  
  it('uses false "formatDate" amatorizationSchedule', () => {
    let schedule = amatorizationSchedule(300000,5.25,1656.61,1534117762079,false)
    let value = find(propEq('formattedDate', 1794530962079))(schedule)
    let expect1 = {...expected, formattedDate: 1794530962079}
    expect(value).toEqual(expect1);
  });
  
  it('applyTransformation with custom transformation', () => {
    
    let expected = {
      formattedDate: 'Nov 2026',
      date: 1794530962079,
      year: 2026,
      interest: 1126.47,
      principal: 530.14,
      principalPaid: 43051.35,
      balance: 256948.65,
      month: 100
    }
    
    const fix2 = val => parseFloat(val.toFixed(2))
    const transformations = {
      interest: fix2,
      principal: fix2,
      principalPaid: fix2,
      balance: fix2,
    };
    
    let schedule = amatorizationSchedule(300000,5.25,1656.61,1534117762079)
    schedule = applyTransformation(schedule, transformations)
    let value = find(propEq('formattedDate', 'Nov 2026'))(schedule)
    expect(value).toEqual(expected);
  }); 
  
  
  
});