import {ChangeEvent }      from 'react';

import {Tooltip,Checkbox,IconButton,TableCell,TableRow,Stack,useTheme} from '@mui/material';
import EditTwoToneIcon                    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon                  from '@mui/icons-material/DeleteTwoTone';
import TableCusCell                       from '../../../components/Table/Cell';
import EmojiEventsIcon                    from '@mui/icons-material/EmojiEvents';
import { labelWithColor,getTextWithIcon,capitalizeFirstLetterOfWords } from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,goalStatusMap,goalLevelMap,monthMap,yearlMap,taskStatusMap}) {

    console.log(monthMap)
    const theme = useTheme();
    
    const {id,task_month,task_year,name:task_name,prizeAmount,percentage,result,status,goal}=data;
    const {title:goal_name,start_date,end_date,status:goal_status,difficulty,importance} =goal;

  return (
    <TableRow hover  key={id}  selected={isDataSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary" checked={isDataSelected} value={isDataSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>handleSelectOneData(event, id)} 
                    />
                  </TableCell>
                  <TableCusCell prop={
                    [
                      {text:labelWithColor(monthMap[task_month].text,monthMap[task_month].color,"Task's Month"),styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(yearlMap[task_year].text,yearlMap[task_year].color,"Task's Year")}
                      </Stack>,styleType:2}
                  ]} 
                  />
                  <TableCusCell cellProps={{align:"center"}} sx={{width:'20%',minWidth:'150px'}} child_sx={{whiteSpace:'normal',wordBreak: 'break-word' }} prop={
                    [{text:capitalizeFirstLetterOfWords(goal_name),styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(start_date?start_date:"Not Available","primary","Goal's Start Date")}
                        {labelWithColor(end_date?end_date:"Not Available","warning","Goal's Deadline")}
                      </Stack>,styleType:2}
                    ]
                  } />
                  <TableCusCell cellProps={{align:"center"}} sx={{width:'20%',minWidth:'150px'}} child_sx={{whiteSpace:'normal',wordBreak: 'break-word' }} prop={
                    [{text: capitalizeFirstLetterOfWords(task_name),styleType:1},
                      {
                        text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(`SP: ${percentage}%`,"info","Success Percentage")}
                        {labelWithColor(`AP: ${result}%`,"success","Achieved Percentage")}
                      </Stack>,styleType:2}
                    ]
                  } />
                   <TableCusCell cellProps={{align:"center"}} prop={
                    [{text: getTextWithIcon(`${prizeAmount.toString()} PLN `,<EmojiEventsIcon />,(prizeAmount>0?"success":"secondary")),styleType:1},
                      {
                        text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(`GDL: ${goalLevelMap[difficulty].text}`,goalLevelMap[difficulty].color,"Goal Difficulty Level")}
                        {labelWithColor(`GIL: ${goalLevelMap[importance].text}`,goalLevelMap[importance].color,"Goal Importance Level")}
                      </Stack>,styleType:2}
                    ]
                  } />
                  <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text:labelWithColor(taskStatusMap[status].text,taskStatusMap[status].color),styleType:1},
                      {text:labelWithColor(`GS: ${goalStatusMap[goal_status].text}`,goalStatusMap[goal_status].color,"Goal Status"),styleType:2}
                    ]
                  } />
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