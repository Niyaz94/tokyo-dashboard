import { Checkbox, TableRow, Stack,Typography } from '@mui/material';
import { ChangeEvent } from 'react';

import {Cell as TableCusCell,NewCell} from '../../../components/Table';
import ButtonTable from '../../../components/Form/ButtonTable';
import { createMapLabelData } from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';
import CampaignIcon                       from '@mui/icons-material/Campaign';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { filterStatusOptions_2 as single_task_status } from '../../../utility/function/data';
import {
  getStatusIcon,ColorLabelComponent,getDayAbbreviation,getDeepText
} from '../../../utility/function/main';
import dayjs                           from "dayjs";


function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const { secondary } = usePaginationContext();
  const {type:single_task_type } = secondary;

  const taskStatusMap = createMapLabelData(single_task_status.map(({value})=>value.toLowerCase()));
  const taskTypeNameMap = createMapLabelData(single_task_type.map(({label}) => label));

  const numPriorityMap ={
    400:"error",
    350:"warning",
    300:"info",
    250:"success",
    200:"primary",
    150:"secondary",
    100:"tertiary",
    0:"default"
  }

  const {id,date,note,title,priority,status,deadline,numPriority,type_names,spendingTime,expectedSpendingTime} = data;


  return (
    <TableRow hover key={id} selected={isDataSelected}>

      <NewCell props={{padding:"checkbox"}}>
        <Checkbox
          color="primary"
          checked={isDataSelected}
          value={isDataSelected}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>handleSelectOneData(event, id)}
        />
      </NewCell>
      <NewCell csx={{width:'10%'}}>
          <Typography  variant='body1' color='text.primary' fontWeight='bold' gutterBottom={true} noWrap={true}>
              {`${date} (${getDayAbbreviation(date)})`}
          </Typography>
          <Stack direction="row"  sx={{justifyContent: "left",alignItems: "left"}} spacing={1}>
            <ColorLabelComponent color={"info"} tooltip={"Deadline Icon"}>
              <EventAvailableIcon/>
            </ColorLabelComponent>
            <ColorLabelComponent color={["completed","followup"].includes(status)?"primary": dayjs().format('YYYY-MM-DD')>deadline?"error":"success"} tooltip={"Deadline"}>
              {deadline?deadline:"Not Available"}
            </ColorLabelComponent>
          </Stack>
      </NewCell>
      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{width:'25%'}} 
        prop={[
          {
            text: (<Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' ,flexWrap: 'wrap',rowGap:"3px",columnGap:"2px"}} spacing={1}> 
            {type_names.map((type_name)=>(<ColorLabelComponent color={taskTypeNameMap[type_name]?.color ?? "error"} tooltip={"Single Task Type Name"}>
              {`${taskTypeNameMap[type_name]?.text ?? "Not Found"}`}
            </ColorLabelComponent>))}
            </Stack>),
            styleType: 1
          }
        ]}
      />
      <TableCusCell cellProps={{align:"center"}} sx={{width:'10%',minWidth:'150px'}} child_sx={{whiteSpace:'normal',wordBreak: 'break-word' }} prop={[
          {text: title,styleType:1},{text: getDeepText(note),styleType:2}
      ]} />

      <TableCusCell cellProps={{align:"center"}} prop={
        [
          {text:getStatusIcon(priority.toUpperCase(),<CampaignIcon />),styleType:1},

          {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
            <ColorLabelComponent color={numPriorityMap[Object.keys(numPriorityMap).sort().reverse().find((key) => key <= numPriority)] ?? "error"}>
              {numPriority}
            </ColorLabelComponent>
          </Stack>,styleType:2}
      ]} />

      <TableCusCell cellProps={{align:"center"}} prop={
        [{text:(<ColorLabelComponent color={taskStatusMap[status]?.color  ?? "error"} tooltip={"Task Status"}>
              {taskStatusMap[status]?.text ?? "Not Found"}
            </ColorLabelComponent>),
          styleType:1},
        {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
            <ColorLabelComponent color={"secondary"} tooltip={"Expected Spending Time"}>
              {expectedSpendingTime}
            </ColorLabelComponent>
            <ColorLabelComponent color={"primary"} tooltip={"Spending Time"}>
              {spendingTime}
            </ColorLabelComponent>
        </Stack>,styleType:2}
      ]
      } />
      
      <NewCell props={{align:"right"}}>
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} />
      </NewCell>
    </TableRow>
  );
}

export default CustomTableRow;
