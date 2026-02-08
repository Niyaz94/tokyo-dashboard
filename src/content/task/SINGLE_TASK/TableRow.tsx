import { Checkbox, TableRow, Stack,Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { colorType } from 'src/utility/types/data_types';
import {NewCell} from '../../../components/Table';
import ButtonTable from '../../../components/Form/ButtonTable';
import { createMapLabelData } from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';
import CampaignIcon                       from '@mui/icons-material/Campaign';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { filterStatusOptions_2 as single_task_status } from '../../../utility/function/data';
import {getDayAbbreviation,getDeepText,getPriorityColor} from '../../../utility/function/main';
import {ColorLabelComponent,IconLabelComponent}  from '../../../utility/function/mainComponents';
import dayjs                           from "dayjs";

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  // console.log("Rendering TableRow for id:", data, "isDataSelected:", isDataSelected);

  const { secondary } = usePaginationContext();
  const {type:single_task_type } = secondary;
  const taskStatusMap = createMapLabelData(single_task_status.map(({value})=>value.toLowerCase()));
  const taskTypeNameMap = createMapLabelData(single_task_type.map(({label}) => label));
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
      <NewCell csx={{width:'10%',padding:"8px"}}>
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
      <NewCell csx={{width:'25%', padding:"8px"}} props={{ align: 'center' }}>
        <Stack direction="row" fontWeight='bold' sx={{ justifyContent: 'center', alignItems: 'center' ,flexWrap: 'wrap',rowGap:"3px",columnGap:"2px"}} spacing={0.5}> 
            {type_names && type_names.map((type_name)=>(<ColorLabelComponent color={(taskTypeNameMap[type_name]?.color ?? "error") as colorType} tooltip={"Single Task Type Name"}>
              {`${taskTypeNameMap[type_name]?.text ?? "Not Found"}`}
            </ColorLabelComponent>))}
        </Stack>
      </NewCell>
      <NewCell csx={{width:'15%',padding:"2px"}} props={{align:"center"}} >
          <Typography  variant='body1' color='text.primary' fontWeight='bold' gutterBottom={true} noWrap={true} sx={{whiteSpace:'normal',wordBreak: 'break-word' }}>
              {title}
          </Typography>
         <Typography  variant={'body2'} color={'text.secondary'} gutterBottom={false} noWrap={false} sx={{whiteSpace:'normal',wordBreak: 'break-word' }}>
              {getDeepText(note)}
          </Typography>
      </NewCell> 
      <NewCell csx={{padding:"8px"}} props={{align:"center"}}>
          <IconLabelComponent text={priority.toUpperCase()}>
            <CampaignIcon />
          </IconLabelComponent>
          <Stack direction="row"  sx={{justifyContent: "center",alignItems: "center", paddingTop:"4px"}} spacing={1}>
            <ColorLabelComponent color={getPriorityColor(numPriority)}>
              {numPriority}
            </ColorLabelComponent>
          </Stack>
      </NewCell>
      <NewCell csx={{padding:"2px"}} props={{align:"center"}}>
          <ColorLabelComponent color={(taskStatusMap[status]?.color  ?? "error") as colorType} tooltip={"Task Status"}>
              {taskStatusMap[status]?.text ?? "Not Found"}
          </ColorLabelComponent>
          
          <Stack direction="row" sx={{justifyContent: "center",alignItems: "center", paddingTop:"4px"}} spacing={1}>
            <ColorLabelComponent color={"secondary"} tooltip={"Expected Spending Time"}>
              {expectedSpendingTime}
            </ColorLabelComponent>
            <ColorLabelComponent color={"primary"} tooltip={"Spending Time"}>
              {spendingTime}
            </ColorLabelComponent>
          </Stack>
      </NewCell>
      <NewCell props={{align:"right"}}>
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} />
      </NewCell>
    </TableRow>
  );
}
export default CustomTableRow;