import { ChangeEvent } from 'react';

import {
  Tooltip,
  Checkbox,
  IconButton,
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
import {getStatusIcon,labelWithColor,labelColorByNumber,getDayAbbreviation} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {
  const theme = useTheme();
  const {id,date,success,worrying,activityLevel,eatingLevel,is_busy,consumeWaterInLiter,weight,SleepState,minBurnCalories,isGoingGym,is_meditation} = data;

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
                <Label color={is_busy ? 'primary' : 'warning'}>
                  {is_busy ? 'B' : 'N'}
                </Label>
                <Label color={labelColorByNumber(success)}>
                  SR: {success} %
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
            text: getStatusIcon(activityLevel, <DirectionsRunIcon />),
            styleType: 1
          },
          {
            text: (
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
                spacing={1}
              >
                {getStatusIcon(eatingLevel, <FastfoodIcon />)}
                {labelWithColor(`WD: ${consumeWaterInLiter}`, 'success')}
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
            text: isGoingGym ? (
              <FitnessCenterIcon
                sx={{ fontSize: '3rem', color: 'primary.main' }}
              />
            ) : (
              <AirlineSeatReclineNormalIcon
                sx={{ fontSize: '3rem', color: 'error.main' }}
              />
            ),
            styleType: 1
          },
          {
            text: (
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
                spacing={1}
              >
                {labelWithColor(`${weight} Kg`, 'black')}
                {labelWithColor(
                  `${minBurnCalories} kcal`,
                  labelColorByNumber((minBurnCalories / 300) * 100)
                )}
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
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
                spacing={1}
              >
                {getStatusIcon(worrying,<SentimentVeryDissatisfiedIcon />,true)}
                {is_meditation
                  ? labelWithColor(<SelfImprovementIcon />, 'success')
                  : labelWithColor(<RemoveCircleOutlineIcon />, 'error')}
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
