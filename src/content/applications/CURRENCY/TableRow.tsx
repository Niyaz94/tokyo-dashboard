import { ChangeEvent } from 'react';

import {
  Checkbox,
  TableCell,
  TableRow,
} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import {labelWithColor,getDeepText} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {


  const {id,name,note,startDay,maxAmount} = data;

  return (
    <TableRow hover key={id} selected={isDataSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isDataSelected}
          value={isDataSelected}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleSelectOneData(event, id)
          }
        />
      </TableCell>
      <TableCusCell
        prop={[{ text: `${name} `, styleType: 1 }]}
      />
      
       <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:
          
          labelWithColor(`${startDay}`, 'error', 'Start Day of Expense Cycle',"",18,false)
          ,styleType: 1},]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:
          
          labelWithColor(`${maxAmount}`, 'info', 'Maximum Expense Amount for this month',"",18,false)
          ,styleType: 1},]}
      />

      {/*<TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:labelWithColor(`${total_inprogress}`, 'info', 'Total Inprogress Tasks',"",18,true),styleType: 1},]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:labelWithColor(`${total_notstarted}`, 'error', 'Total Not Started Tasks',"",18,true),styleType: 1},]}

      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:labelWithColor(`${total_others}`, 'warning', 'Total Other Tasks',"",18,true),styleType: 1},]}
      /> */}
      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{ width: '20%' }}
        child_sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        prop={[{ text: getDeepText(note), styleType: 2 }]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="This Expense" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
