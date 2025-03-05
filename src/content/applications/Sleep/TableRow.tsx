import {ChangeEvent }      from 'react';

import {Tooltip,Checkbox,IconButton,TableCell,TableRow,Stack,useTheme} from '@mui/material';
import Label                              from 'src/components/Label';
import EditTwoToneIcon                    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon                  from '@mui/icons-material/DeleteTwoTone';
import TableCusCell                        from '../../../components/Table/Cell';
import { useNavigate } from 'react-router-dom';
import { 
    getStatusLabel,labelWithColor,labelColorByNumber,getTimeDifferenceInMinutes,
    getDayAbbreviation 
  } from '../../../utility/function/main';

function CustomTableRow({data,isSleepDataelected,handleSelectOneSleepData}) {

    const theme = useTheme();
    const navigate = useNavigate();

    

    const {id,date,success,worrying,activity_level,morningFeeling,is_busy,bedTime,approxFellSleepTime,peeCountDuringNight,
              SleepState,approxWakingNum,morningWakingUp,dayTimeSleepInMinutes,burn_calories} = data;

    
    const sleepInHour=(getTimeDifferenceInMinutes(approxFellSleepTime.slice(0,5),morningWakingUp.slice(0,5))+dayTimeSleepInMinutes)/60
    const wastedTime=getTimeDifferenceInMinutes(bedTime.slice(0,5),approxFellSleepTime.slice(0,5))
  return (
    <TableRow hover  key={id}  selected={isSleepDataelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary" checked={isSleepDataelected} value={isSleepDataelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>handleSelectOneSleepData(event, id)} 
                    />
                  </TableCell>
                  <TableCusCell prop={[{text:`${date} (${getDayAbbreviation(date)})`,styleType:1},{text:<Stack direction="row" spacing={1}>
                    <Label color={is_busy?'primary':'warning'} >{is_busy?'B':'N'}</Label>
                    <Label color={labelColorByNumber(success)} >SR: {success} %</Label>
                    </Stack>,styleType:2}]} 
                  />
                  <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text:getStatusLabel(morningFeeling),styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(`F: ${bedTime.slice(0,5)}`,"primary")}
                        {labelWithColor(`FS: ${approxFellSleepTime.slice(0,5)}`,"success")}
                        {labelWithColor(`T: ${morningWakingUp.slice(0,5)}`,"black")}
                        {labelWithColor(`E: ${dayTimeSleepInMinutes}`,"info")}
                        </Stack>,styleType:2}
                    ]
                  } />
                  <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text:getStatusLabel(SleepState),styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(`WT: ${wastedTime}`,labelColorByNumber(100-wastedTime/240*100))}
                        {labelWithColor(`ST: ${(sleepInHour.toFixed(2))}`,labelColorByNumber(sleepInHour/10*100))}
                        {labelWithColor(`WN: ${approxWakingNum}`,"warning")}
                        {labelWithColor(`PN: ${peeCountDuringNight}`,"primary")}
                        </Stack>,styleType:2}
                    ]
                  } />
                   <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text:labelWithColor(`BC: ${burn_calories} kcal`,labelColorByNumber(burn_calories/300*100)),styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {getStatusLabel(worrying,"WL: ")}
                        {getStatusLabel(activity_level,"AL: ")}
                        </Stack>,styleType:2}
                    ]
                  } />
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton color="inherit" onClick={()=>navigate(`${id}`)} size="small" sx={{'&:hover': {background: theme.colors.primary.lighter},color: theme.palette.primary.main}} >
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