import React from 'react'
import styled, {css} from 'styled-components'

const tableStyles = css`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`

const Table = styled.table`
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
`

const TableRowStyle = styled.tr`
  ${tableStyles}
`
const TableDataStyle = styled.td`
  ${tableStyles}
`

const TableHeaderStyle = styled.th`
  ${tableStyles}
`
      
const TableRow = ({rowItems, rowKeys, headers}) => {
  return (
      <Table>
        <TableRowStyle key='header'>
          {headers.map((header,i) => <TableHeaderStyle key={i}>{header}</TableHeaderStyle>)}
        </TableRowStyle>
        {
          rowItems.map((item, i) => {
            const list = rowKeys ? rowKeys : Object.keys(item)
            return (
               <TableRowStyle key={i}> { 
                  list.map((key, i) => {
                    return <TableDataStyle key={i}>{item[key]}</TableDataStyle>
                 })}
               </TableRowStyle >
            )
          }) 
        }
      </ Table>
  )
}

export default TableRow
