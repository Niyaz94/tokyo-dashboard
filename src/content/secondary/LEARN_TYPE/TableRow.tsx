import { ChangeEvent } from 'react';

import {Checkbox,TableCell,TableRow,Stack} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import {labelWithColor,getDeepText} from '../../../utility/function/main';



function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const {id,name,notes,updated_at} = data;

  const onEditButtonClick = () => {
    // setPageDefault(prev => ({...prev, date:{label:date,value: daily}}));
  }

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
          {
            text: name,
            styleType: 1
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {text: labelWithColor(`${updated_at.split("T")[0]}`,'info','Last Update')
            ,styleType: 1}
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        child_sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        prop={[{ text: getDeepText(notes), styleType: 2 }]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} onEditButtonClick={onEditButtonClick} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
