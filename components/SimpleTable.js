import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

export default function SimpleTable(props) {
  return (
    <TableContainer className="MuiPaper-rounded">
      <Table>
        <TableHead>
          <TableRow>
            {props && props.headers && props.headers.map(head => 
              <StyledTableCell key={head.key} align={head.align || 'center'}>
                {head.text}
              </StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props && props.data && props.data.map((item, idx) => 
            <StyledTableRow key={'tableRow'+idx}>
              {props && props.headers && props.headers.map(head => 
                <StyledTableCell key={'tableRow'+idx+head.key} component={head.component} scope={head.scope} align={head.align || 'center'}>
                  {item[head.key]}
                </StyledTableCell>
              )}
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}