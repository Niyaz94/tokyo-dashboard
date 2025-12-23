import { Checkbox, TableCell, TableRow, Stack } from '@mui/material';
import { ChangeEvent } from 'react';
import TableCusCell from '../../../components/Table/Cell';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ButtonTable from '../../../components/Form/ButtonTable';
import { createMapLabelData } from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {TaskStatusStatus} from '../../../utility/function/data';


import {
  labelWithColor,
  getTextWithIcon,
  getDayAbbreviation,
  capitalizeFirstLetterOfWords,getDeepText
} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const { secondary } = usePaginationContext();
  const { task_type } = secondary;
  const taskNameMap = createMapLabelData(task_type.map(({label}) => label));
  const taskStatusMap = createMapLabelData(TaskStatusStatus.map(({value})=>value), [3, 0, 2, 4]);
  const taskMap = createMapLabelData(['active', 'inactive', 'archive'],[3, 2, 4]);
  const {id,date,note,spendingTime,task_name:single_task_name,status,task_detail,isTodaySTask,importance_level} = data;
  const {status: tstatus,goal_name,prizeAmount,percentage,result} = task_detail ;


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
        cellProps={{ align: 'center' }}
        prop={[
          { text: `${date} (${getDayAbbreviation(date)})`, styleType: 1 },
          {
            text: (
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
                spacing={1}
              >
                {labelWithColor(
                  `TCS: ${taskMap[tstatus].text}`,
                  taskMap[tstatus].color,
                  'Task Current Status'
                )}
                {labelWithColor(
                  `SP: ${spendingTime}`,
                  'secondary',
                  'Spending Time'
                )}
              </Stack>
            ),
            styleType: 2
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }} sx={{minWidth: '150px' ,maxWidth:'250px'}}
        prop={[
          {
            text: labelWithColor(
              `${capitalizeFirstLetterOfWords(taskNameMap[single_task_name].text)}`,taskNameMap[single_task_name].color,'Task Name'
            ),
            styleType: 1
          },
          { text: capitalizeFirstLetterOfWords(goal_name), styleType: 2 }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{ width: '20%' }}
        child_sx={{ whiteSpace: 'normal', wordBreak: 'break-word' ,overflowY: 'auto'}}
        prop={[{ text: getDeepText(note), styleType: 2 }]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: getTextWithIcon(
              `${prizeAmount.toString()} PLN `,
              <EmojiEventsIcon />,
              prizeAmount > 0 ? 'success' : 'secondary'
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
                {labelWithColor(`SP: ${percentage}%`,'info','Success Percentage')}
                {labelWithColor(`AP: ${result}%`,'success','Achieved Percentage')}
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
            text: labelWithColor(
              taskStatusMap[status]?.text || 'N/A',
              taskStatusMap[status]?.color || 'error'
            ),
            styleType: 1
          },
          {
            text:(
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
                spacing={1}
              >
                {isTodaySTask && labelWithColor('TMIT', 'primary', "Today's Most Important Task")}
                {labelWithColor(`L${importance_level}`,'success','Importance Level')}
                {labelWithColor(`${(Math.pow(2,importance_level)*(spendingTime/60)).toFixed(2).replace(/[.,]00$/, "")}%`,'secondary','Total SR Percentage')}
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
