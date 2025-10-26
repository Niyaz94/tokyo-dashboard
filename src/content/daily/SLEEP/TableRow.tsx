import { 
  getStatusLabel,labelWithColor,labelColorByNumber,getTimeDifferenceInMinutes,getDayAbbreviation 
}             from '../../../utility/function/main';
import {ChangeEvent }      from 'react';
import {Checkbox,TableCell,TableRow,Stack}  from '@mui/material';
import Label                                from 'src/components/Label';
import TableCusCell                         from '../../../components/Table/Cell';
import ButtonTable                          from "../../../components/Form/ButtonTable"       
import { usePaginationContext as usePage} from '../../../store/context/paginationContext';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PsychologyIcon from '@mui/icons-material/Psychology';
import NoFoodIcon from '@mui/icons-material/NoFood';
import FastfoodIcon from '@mui/icons-material/Fastfood';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {
  
    const {
      id,date,daily,success,worrying,isSleepControl,activity_level,morningFeeling,is_busy,bedTime,approxFellSleepTime,
      peeCountDuringNight,isEatDrinkBeforeSleep,SleepState,approxWakingNum,morningWakingUp,dayTimeSleepInMinutes,burn_calories
    } = data;
    const {setPageDefault}         = usePage();


    const onEditButtonClick = () => {
      setPageDefault(prev => ({...prev, date:{label:date,value: daily}}));
    }

    
    const sleepInHour=(getTimeDifferenceInMinutes(approxFellSleepTime.slice(0,5),morningWakingUp.slice(0,5))+dayTimeSleepInMinutes)/60
    const wastedTime=getTimeDifferenceInMinutes(bedTime.slice(0,5),approxFellSleepTime.slice(0,5))

  return (
    <TableRow hover  key={id}  selected={isDataSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary" checked={isDataSelected} value={isDataSelected}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>handleSelectOneData(event, id)} 
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
          {
            text: 
            <Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
            {isSleepControl ? (
              <PsychologyIcon sx={{ fontSize: '2rem', color: 'primary.main' }}/>
            ) : (
              <EmojiObjectsIcon
                sx={{ fontSize: '2rem', color: 'error.main' }}
              />
            )}
            {isEatDrinkBeforeSleep ? (
              <FastfoodIcon sx={{ fontSize: '2rem', color: 'warning.main' }}/>
            ) : (
              <NoFoodIcon sx={{ fontSize: '2rem', color: 'success.main' }} />
            )}
            </Stack>,
            styleType: 1
          },
          {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
            {getStatusLabel(worrying,"WL: ")}
            {labelWithColor(`BC: ${burn_calories} kcal`,labelColorByNumber(burn_calories/300*100))}
            </Stack>,styleType:2}
        ]
      } />
      <TableCell align="right">
        <ButtonTable id={id} text="sleep" onDeleteRow={onDeleteRow} onEditButtonClick={onEditButtonClick} />
      </TableCell>
    </TableRow>
  )
}
export default CustomTableRow