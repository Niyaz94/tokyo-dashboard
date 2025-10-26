import { ChangeEvent } from 'react';

import {Checkbox,TableCell,TableRow,Stack} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import {labelWithColor,createMapLabelData,getDayAbbreviation} from '../../../utility/function/main';
import { filterTopicStatusOptions } from '../../../utility/function/data';

import {usePageContext as usePage}      from '../../../store/context/pageContext';


function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const {setPageDefault}         = usePage();

  const topicStatusMap = createMapLabelData(filterTopicStatusOptions.map((row) => row["id"]));

  const {id,date,title,status,updated_at} = data;

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
        prop={[
          { text: `${date} (${getDayAbbreviation(date)})`, styleType: 1 },
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: title,
            styleType: 1
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: labelWithColor(
              topicStatusMap[status].text,
              topicStatusMap[status].color
            ),
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
      <TableCell align="right">
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} onEditButtonClick={onEditButtonClick} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
