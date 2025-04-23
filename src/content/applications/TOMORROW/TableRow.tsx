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
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LockClockIcon from '@mui/icons-material/LockClock';
import {getStatusIcon,labelWithColor,labelColorByNumber,getDayAbbreviation} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  console.log('data',data);

  const {id,date,daily,isBusyDay,succssRate,isMeditation,usefulTimeInMinutes,wastedTimeInMinutes,hasPlan} = data;
  console.log(succssRate,date);
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
                <Label color={labelColorByNumber(succssRate)}>
                  SR: {succssRate} %
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
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: isBusyDay ? (
              <HourglassTopIcon sx={{ fontSize: '2rem', color: 'primary.main' }}/>
            ) : (<LockClockIcon sx={{ fontSize: '2rem', color: 'error.main' }}/>),
            styleType: 1
          },
          {
            text: (
              <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }} spacing={1}>
                {labelWithColor(`${usefulTimeInMinutes} min`, labelColorByNumber((usefulTimeInMinutes / 3)))}
                {labelWithColor(`${wastedTimeInMinutes} min`,labelColorByNumber(Math.abs(100-wastedTimeInMinutes / 3)))}
              </Stack>
            ),
            styleType: 2
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {text: hasPlan ? (
            <BeenhereIcon sx={{ fontSize: '2rem', color: 'primary.main' }}/>
          ) : (
            <EventBusyIcon sx={{ fontSize: '2rem', color: 'error.main' }}/>
          ),
            styleType: 1}
        ]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
