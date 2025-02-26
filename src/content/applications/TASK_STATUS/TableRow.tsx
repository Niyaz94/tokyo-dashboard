import {ChangeEvent }      from 'react';

import {Tooltip,Checkbox,IconButton,TableCell,TableRow,Stack,useTheme} from '@mui/material';
import EditTwoToneIcon                    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon                  from '@mui/icons-material/DeleteTwoTone';
import TableCusCell                       from '../../../components/Table/Cell';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import { labelWithColor,getTextWithIcon,getDayAbbreviation,capitalizeFirstLetterOfWords } from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,taskNameMap,taskStatusMap,taskMap}) {

    const theme = useTheme();

    const {id,date,note,spendingTime,task_name,status,task_detail,isTodaySTask}=data;
    const {status:task_status,goal_name,prizeAmount,percentage,result} =task_detail;

  return (
    <TableRow hover  key={id}  selected={isDataSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary" checked={isDataSelected} value={isDataSelected}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>handleSelectOneData(event, id)} 
        />
      </TableCell>
      <TableCusCell cellProps={{align:"center"}} prop={[
        {text:`${date} (${getDayAbbreviation(date)})`,styleType:1},
        {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
          {labelWithColor(`TCS: ${taskMap[task_status].text}`,taskMap[task_status].color,"Task Current Status")}
          {labelWithColor(`SP: ${spendingTime}`,"secondary","Spending Time")}
        </Stack>,styleType:2}
      ]}  />
      <TableCusCell cellProps={{align:"center"}} prop={[
        {text:labelWithColor(`${capitalizeFirstLetterOfWords(taskNameMap[task_name].text)}`,taskNameMap[task_name].color,"Task Name"),styleType:1},
        {text:capitalizeFirstLetterOfWords(goal_name),styleType:1}
      ]} />
      <TableCusCell cellProps={{align:"center"}} sx={{width:'20%'}} child_sx={{whiteSpace:'normal',wordBreak: 'break-word' }} prop={
        [{text: note[0],styleType:2}]
      } />
      <TableCusCell cellProps={{align:"center"}} prop={
        [
          {text: getTextWithIcon(`${prizeAmount.toString()} PLN `,<EmojiEventsIcon />,(prizeAmount>0?"success":"secondary"))
            ,styleType:1},
            {
              text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
              {labelWithColor(`SP: ${percentage}%`,"info","Success Percentage")}
              {labelWithColor(`AP: ${result}%`,"success","Achieved Percentage")}
            </Stack>,styleType:2}
        ]
      } />
      <TableCusCell cellProps={{align:"center"}} prop={[
        {text:labelWithColor(taskStatusMap[status].text,taskStatusMap[status].color),styleType:1},
        {text:(isTodaySTask && labelWithColor("TMIT","primary","Today's Most Important Task")),styleType:2}
      ]} />
      <TableCell align="right">
        <Tooltip title="Edit Order" arrow>
          <IconButton color="inherit" size="small" sx={{'&:hover': {background: theme.colors.primary.lighter},color: theme.palette.primary.main}} >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Order" arrow>
          <IconButton color="inherit" size="small" sx={{'&:hover': { background: theme.colors.error.lighter },color: theme.palette.error.main}}  >
            <DeleteTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default CustomTableRow