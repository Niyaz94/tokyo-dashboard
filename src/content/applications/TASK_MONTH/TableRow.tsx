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


  const {id,year,name,task_number,completed_task_number,uncompleted_task_number,halfcompleted_task_number,inapplicable_task_number} = data;


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
        cellProps={{ align: 'center' }}
        prop={[
          { text: labelWithColor(name,'secondary',"Task's Month"), styleType: 1 },
          { text: labelWithColor(year,'success',"Task's Year"), styleType: 2 },
          
        ]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:
          
          labelWithColor(`${task_number}`, 'primary', 'Total Tasks Completed',"",18,true)
          ,styleType: 1},]}
      />
      
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:
          
          labelWithColor(`${completed_task_number}`, 'success', 'Total Tasks Completed',"",18,true)
          ,styleType: 1},]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:labelWithColor(`${uncompleted_task_number}`, 'info', 'Total Inprogress Tasks',"",18,true),styleType: 1},]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:labelWithColor(`${halfcompleted_task_number}`, 'error', 'Total Not Started Tasks',"",18,true),styleType: 1},]}

      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:labelWithColor(`${inapplicable_task_number}`, 'warning', 'Total Other Tasks',"",18,true),styleType: 1},]}
      />
      
      <TableCell align="right">
        <ButtonTable id={id} text="This Month" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
