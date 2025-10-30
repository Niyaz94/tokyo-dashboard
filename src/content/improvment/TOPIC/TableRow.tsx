import { ChangeEvent } from 'react';

import {Checkbox,TableCell,TableRow,Stack} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import {labelWithColor,createMapLabelData,getDayAbbreviation} from '../../../utility/function/main';
import { filterTopicStatusOptions } from '../../../utility/function/data';

import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import dayjs                           from "dayjs";
import {usePageContext as usePage}      from '../../../store/context/pageContext';


function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {


  const  {secondary} = usePage();

  const {type:topic_types} = secondary;


  const topicStatusMap = createMapLabelData(filterTopicStatusOptions.map((row) => row["id"]));
  const topicTypeMap = createMapLabelData(topic_types.map((row) => row.label));

  const {id,date,title,status,type_name,deadline} = data;

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
            <TableCusCell prop={
        [
          {text:`${date} (${getDayAbbreviation(date)})`,styleType:1},
          {text:<Stack direction="row"  sx={{justifyContent: "left",alignItems: "left"}} spacing={1}>
            {labelWithColor(<EventAvailableIcon/>,"info")}

            {labelWithColor(deadline?deadline:"Not Available",
              ["completed","followup"].includes(status)?"primary": dayjs().format('YYYY-MM-DD')>deadline?"error":"success"
              ,"Deadline")}
          </Stack>,styleType:2}
      ]} />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: labelWithColor(
              topicTypeMap[type_name]?.text || "N/A",
              topicTypeMap[type_name]?.color || "default"
            ),
            styleType: 1
          }
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
      <TableCell align="right">
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} onEditButtonClick={onEditButtonClick} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
