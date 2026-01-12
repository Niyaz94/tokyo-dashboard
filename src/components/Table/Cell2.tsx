import {TableCell } from '@mui/material';

interface CellProps {
  children?: any
//   React.JSX.Element | string | number | null,
  props?:any
  csx?:any
}

const Cell= ({children,props={},csx={}}:CellProps)=> {
  return (
    <TableCell {...props} sx={{...csx}}>
        {children?children:null}
    </TableCell>
  )
}
export default Cell