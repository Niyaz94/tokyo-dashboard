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

import {getStatusIcon,getStatusLabel,labelWithColor,labelColorByNumber,getDayAbbreviation,getTimeDifferenceInMinutes} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const {
    id,date,isBusyDay, isSuccessfulDay,successRate, activity, sleep, 
    worryingLevel, infoConsumptionLevel, usefulTimeInMinutes, wastedTimeInMinutes, isMeditation
  } = data;

  const {isGoingGym, weight, mbNumber} = activity || {isGoingGym:false,weight:70,mbNumber:0};
  const {SleepState, bedTime, approxFellSleepTime, morningWakingUp, dayTimeSleepInMinutes} = sleep || {SleepState:null, bedTime:"00:00", approxFellSleepTime:"00:00", morningWakingUp:"00:00", dayTimeSleepInMinutes:0};
  const sleepInHour=(getTimeDifferenceInMinutes(approxFellSleepTime.slice(0,5),morningWakingUp.slice(0,5))+dayTimeSleepInMinutes)/60


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
                {isSuccessfulDay
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
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
                spacing={1}
              >
                {getStatusIcon(worryingLevel,<SentimentVeryDissatisfiedIcon />,true)}
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
                {labelWithColor(`${(usefulTimeInMinutes /3).toFixed(2)} %`, 'success', 'Useful Time')}
                {labelWithColor(`${(wastedTimeInMinutes/3).toFixed(2)} %`, 'error', 'Wasted Time')}
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
                {SleepState!=null && labelWithColor(`F: ${bedTime.slice(0,5)}`,"primary","Bed Time")}
                {SleepState!=null && labelWithColor(`T: ${morningWakingUp.slice(0,5)}`,"black","Wake Up Time")}
                {SleepState!=null && labelWithColor(`ST: ${(sleepInHour.toFixed(2))}`,labelColorByNumber(sleepInHour/10*100),"Sleep Hour")}
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
