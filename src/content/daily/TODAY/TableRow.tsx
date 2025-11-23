import { ChangeEvent } from 'react';

import {
  Checkbox,
  TableCell,
  TableRow,
  Stack,
  useTheme
} from '@mui/material';
import Label from 'src/components/Label';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import {getStatusIcon,labelWithColor,labelColorByNumber,getDayAbbreviation,getTimeDifferenceInMinutes} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const {
    id,date,isBusyDay,successStatus,successRate, activity, sleep, beingGrateful,
    worryingLevel, infoConsumptionLevel, usefulTimeInMinutes, wastedTimeInMinutes, isMeditation,isListenToMusic,meditation, pray
  } = data;

  const {isGoingGym, weight, mbNumber} = activity || {isGoingGym:false,weight:70,mbNumber:0};
  const {SleepState, bedTime, approxFellSleepTime, morningWakingUp, dayTimeSleepInMinutes} = sleep || {SleepState:null, bedTime:"00:00", approxFellSleepTime:"00:00", morningWakingUp:"00:00", dayTimeSleepInMinutes:0};
  const sleepInHour=(getTimeDifferenceInMinutes(approxFellSleepTime.slice(0,5),morningWakingUp.slice(0,5))+dayTimeSleepInMinutes)/60


  const worryingLevelIcon=(value)=>{
    if(value=="HIGH"){
      return <SentimentDissatisfiedIcon sx={{ fontSize: '1.7rem', color: 'warning.main' }}/>
    }else if(value=="VERY_HIGH"){
      return <SentimentVeryDissatisfiedIcon sx={{ fontSize: '1.7rem', color: 'error.main' }}/>
    }else if(value=="LOW"){
      return <SentimentSatisfiedIcon sx={{ fontSize: '1.7rem', color: 'info.main' }}/>
    }else if(value=="VERY_LOW"){
      return <SentimentNeutralIcon sx={{ fontSize: '1.7rem', color: 'success.main' }}/>
    }else{
      return <SentimentNeutralIcon sx={{ fontSize: '1.7rem', color: 'secondary.main' }}/>
    }
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
      <TableCusCell
        prop={[
          { text: `${date} (${getDayAbbreviation(date)})`, styleType: 1 },
          {
            text: (
              <Stack direction="row" spacing={1}>
                <Label color={isBusyDay ? 'primary' : 'warning'}>
                  {isBusyDay ? 'B' : 'N'}
                </Label>
                {successStatus==='neutral' ? labelWithColor(<SentimentNeutralIcon />, 'secondary')
                  : successStatus==='success'
                  ? labelWithColor(<ThumbUpOffAltIcon />, 'success')
                  : labelWithColor(<ThumbDownOffAltIcon />, 'error')} 
                <Label color={labelColorByNumber(successRate)}>
                  SR: {successRate} %
                </Label>
              </Stack>
            ),
            styleType: 2
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: isMeditation ? (
              <SelfImprovementIcon sx={{ fontSize: '2rem', color: 'primary.main' }}/>
            ) : (<RemoveCircleOutlineIcon sx={{ fontSize: '2rem', color: 'error.main' }}/>),
            styleType: 1
          },
          {
            text: (
              <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }} spacing={1}>
                {labelWithColor(worryingLevelIcon(worryingLevel),'error',`Warring Level: ${worryingLevel}`,"",13,true)}
                {
                isListenToMusic ? 
                labelWithColor(<MusicNoteIcon sx={{ fontSize: '1.4rem', color: 'error.main' }}/>,'error',"Listening to Music") 
                : 
                labelWithColor(<MusicOffIcon sx={{ fontSize: '1.4rem', color: 'success.main' }}/>,'success',"Not Listening to Music")
                }
                {beingGrateful? 
                labelWithColor(<SentimentSatisfiedAltIcon sx={{ fontSize: '1.4rem', color: 'success.main' }}/>,'success',"Listening to Music") 
                : 
                labelWithColor(<SentimentVeryDissatisfiedIcon sx={{ fontSize: '1.4rem', color: 'error.main' }}/>,'error',"Not Listening to Music")}
              </Stack>
            ),
            styleType: 2
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: getStatusIcon(infoConsumptionLevel, <ManageHistoryIcon />),
            styleType: 1
          },
          {
            text: (
              <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }} spacing={1}>
                {labelWithColor(`${usefulTimeInMinutes} MIN`, 'success', 'Useful Time in Minutes')}
                {labelWithColor(`${wastedTimeInMinutes} MIN`, 'error', 'Wasted Time in Minutes')}
              </Stack>
            ),
            styleType: 2
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: getStatusIcon(SleepState, <AirlineSeatFlatIcon />),
            styleType: 1
          },
          {
            text: (
              <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }} spacing={1}>
                {labelWithColor(`M: ${meditation}`,"primary","Meditation Pattern")}
                {labelWithColor(`P: ${pray}`,'success',"Pray Pattern")}
                {labelWithColor(`ST: ${(sleepInHour.toFixed(2))}`,labelColorByNumber(sleepInHour/10*100),"Sleep Hour")}
              </Stack>
            ),
            styleType: 2
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: isGoingGym ? (<FitnessCenterIcon sx={{ fontSize: '2rem', color: 'primary.main' }}/>
            ) : (<AirlineSeatReclineNormalIcon sx={{ fontSize: '2rem', color: 'warning.main' }} />),
            styleType: 1
          },
          {
            text: (
              <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }} spacing={1}
              >
                {labelWithColor(<FavoriteBorderIcon />,mbNumber>0?'error':'info',"MB",mbNumber)}
                {labelWithColor(`${weight} Kg`, weight>=70?'error':'success')}
              </Stack>
            ),
            styleType: 2
          }
        ]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
