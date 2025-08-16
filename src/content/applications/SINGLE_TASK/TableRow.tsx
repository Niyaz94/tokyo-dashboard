import { Checkbox, TableCell, TableRow, Stack } from '@mui/material';
import { ChangeEvent } from 'react';
import TableCusCell from '../../../components/Table/Cell';
import ButtonTable from '../../../components/Form/ButtonTable';
import { createMapLabelData } from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';
import CampaignIcon                       from '@mui/icons-material/Campaign';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import {
  getStatusIcon,
  labelWithColor,
  getDayAbbreviation,getDeepText
} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const { secondary } = usePaginationContext();
  const { status:single_task_status,type:single_task_type } = secondary;

  const taskStatusMap = createMapLabelData(single_task_status);
  const taskTypeNameMap = createMapLabelData(single_task_type.map((item) => item[1]));


  const numPriorityMap ={
    90:"error",
    80:"warning",
    70:"info",
    60:"success",
    50:"primary",
    40:"secondary",
    30:"tertiary",
    20:"quaternary",
    10:"quinary",
    0:"default"
  }

  const {id,date,type_name,note,title,priority,status,deadline,numPriority,type_names} = data;


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
            {labelWithColor(deadline?deadline:"Not Available","warning")}
          </Stack>,styleType:2}
      ]} />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: (<Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' ,flexWrap: 'wrap',rowGap:"3px",columnGap:"2px"}} spacing={1}> 
            {type_names.map((type_name)=>labelWithColor(`${taskTypeNameMap[type_name]?.text ?? "Not Found"}`,taskTypeNameMap[type_name]?.color ?? "error",'Single Task Type Name'))}
            </Stack>),
            styleType: 1
          }
        ]}
      />
      <TableCusCell cellProps={{align:"center"}} sx={{width:'20%',minWidth:'150px'}} child_sx={{whiteSpace:'normal',wordBreak: 'break-word' }} prop={[
          {text: title,styleType:1},{text: getDeepText(note),styleType:2}
      ]} />

      <TableCusCell cellProps={{align:"center"}} prop={
        [
          {text:getStatusIcon(priority.toUpperCase(),<CampaignIcon />),styleType:1},

          {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
            {labelWithColor(numPriority,numPriorityMap[Object.keys(numPriorityMap).sort().reverse().find((key) => key <= numPriority)] ?? "error")}
          </Stack>,styleType:2}
      ]} />

      <TableCusCell cellProps={{align:"center"}} prop={
        [{text:labelWithColor(taskStatusMap[status]?.text ?? "Not Found",taskStatusMap[status]?.color  ?? "error"),styleType:1},]
      } />
      
      <TableCell align="right">
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
