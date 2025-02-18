import {ChangeEvent }      from 'react';

import {Tooltip,Checkbox,IconButton,TableCell,TableRow,Stack,useTheme} from '@mui/material';
import Label                              from 'src/components/Label';
import EditTwoToneIcon                    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon                  from '@mui/icons-material/DeleteTwoTone';
import TableCusCell                       from '../../../components/Table/Cell';
import DirectionsRunIcon                  from '@mui/icons-material/DirectionsRun';
import AirlineSeatIndividualSuiteIcon     from '@mui/icons-material/AirlineSeatIndividualSuite';
import { 
    getStatusLabel,labelWithColor,labelColorByNumber,
    getDayAbbreviation 
  } from '../../../utility/function/main';

function CustomTableRow({data,isActivityDataelected,handleSelectOneActivityData}) {

    const theme = useTheme();



    const {id,date,success,worrying,activityLevel,eatingLevel,is_busy,consumeWaterInLiter,weight,
              SleepState,minBurnCalories,isGoingGym} = data;

  return (
    <TableRow hover  key={id}  selected={isActivityDataelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary" checked={isActivityDataelected} value={isActivityDataelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>handleSelectOneActivityData(event, id)} 
                    />
                  </TableCell>
                  <TableCusCell prop={[{text:`${date} (${getDayAbbreviation(date)})`,styleType:1},{text:<Stack direction="row" spacing={1}>
                    <Label color={is_busy?'primary':'warning'} >{is_busy?'B':'N'}</Label>
                    <Label color={labelColorByNumber(success)} >SR: {success} %</Label>
                    </Stack>,styleType:2}]} 
                  />
                  <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text:getStatusLabel(SleepState),styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(`WL: ${worrying}`,"success")}
                        </Stack>,styleType:2}
                    ]
                  } />
                  <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text: (isGoingGym?<DirectionsRunIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />:<AirlineSeatIndividualSuiteIcon sx={{ fontSize: '3rem', color: 'error.main' }}/>)
                        ,styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(`${weight} Kg`,"black")}
                        {labelWithColor(`${minBurnCalories} kcal`,labelColorByNumber(minBurnCalories/300*100))}
                      </Stack>,styleType:2}
                    ]
                  } />
                   <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text:labelWithColor(`BC: ${minBurnCalories} kcal`,labelColorByNumber(minBurnCalories/300*100)),styleType:1},
                      // {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                      //   {getStatusLabel(worrying,"WL: ")}
                      //   {getStatusLabel(activity_level,"AL: ")}
                      //   </Stack>,styleType:2}
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