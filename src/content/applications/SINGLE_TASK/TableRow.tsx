import { Checkbox, TableCell, TableRow, Stack,useTheme } from '@mui/material';
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
  getDayAbbreviation,
} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const { secondary } = usePaginationContext();
  const { status:single_task_status,priority:single_task_priority,type:single_task_type } = secondary;

  const taskStatusMap = createMapLabelData(single_task_status);
  const taskTypeNameMap = createMapLabelData(single_task_type);


  // const {id,date,note,spendingTime,task_name:single_task_name,status,task_detail,isTodaySTask} = data;
  // const {status: tstatus,goal_name,prizeAmount,percentage,result} = task_detail;

  const theme = useTheme();
  const {id,date,type_name,description,title,priority,status,deadline} = data;
  // const note_text = JSON.parse(note)

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
          {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
            {labelWithColor(<EventAvailableIcon/>,"info")}
            {labelWithColor(deadline?deadline:"Not Available","warning")}
          </Stack>,styleType:2}
      ]} />
      <TableCusCell cellProps={{align:"center"}} prop={
        [{text:labelWithColor(taskTypeNameMap[type_name].text,taskTypeNameMap[type_name].color),styleType:1},]
      } />
      <TableCusCell cellProps={{align:"center"}} sx={{width:'20%',minWidth:'150px'}} child_sx={{whiteSpace:'normal',wordBreak: 'break-word' }} prop={[
          {text: title,styleType:1},
          {text: description,styleType:2}
      ]} />
       <TableCusCell cellProps={{align:"center"}} prop={
        [{text: getStatusIcon(priority.toUpperCase(),<CampaignIcon />),styleType:1}]
      } />
      <TableCusCell cellProps={{align:"center"}} prop={
        [{text:labelWithColor(taskStatusMap[status.toUpperCase()].text,taskStatusMap[status.toUpperCase()].color),styleType:1},]
      } />
      
      
      
      
      <TableCell align="right">
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
