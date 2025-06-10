import { ChangeEvent } from 'react';

import {
  Checkbox,
  TableCell,
  TableRow,
} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';



function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {


  const {id,name,description,total_completed,total_inprogress,total_notstarted,total_others} = data;


  // There are some samples that extracting note does not work for them, fix them in the future
  const note_text = JSON.parse(description)

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
        prop={[{text:total_completed,styleType: 1},]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:total_inprogress,styleType: 1},]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:total_notstarted,styleType: 1},]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{text:total_others,styleType: 1},]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{ width: '20%' }}
        child_sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        prop={[{ text: (Object.keys(note_text).length>0 ? note_text["root"]["children"][0]["children"][0].text:""), styleType: 2 }]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="This Expense" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
