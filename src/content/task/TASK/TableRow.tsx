import { Checkbox, TableCell, TableRow, Stack,useTheme } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import TableCusCell from '../../../components/Table/Cell';
import ButtonTable from '../../../components/Form/ButtonTable';
import { createMapLabelData } from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import {
  labelWithColor,
  getTextWithIcon,
  capitalizeFirstLetterOfWords
} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const { secondary,setPageDefault } = usePaginationContext();

  const onEditButtonClick = () => {
    setPageDefault(prev => ({
      ...prev, 
      goal:{label:goal_name,value: goal},
      month:{label:`${task_month} (${task_year})`,value: month},
    }));
  }

 

  const {id,task_month,task_year,name: task_name,prizeAmount,percentage,result,status,dailyTime,goal_detail,goal,month} = data;
  const {title: goal_name,start_date,end_date,status: goal_status,difficulty,importance} = goal_detail;

  // const goalStatusMap = createMapLabelData(goal_status_all,[3,1,0])
  // const goalLevelMap  = createMapLabelData(goal_level_all,[3,1,0])
  // const taskStatusMap = createMapLabelData(task_status,[3,1,0])
  // const monthMap      = createMapLabelData(Object.keys(task_months).map((key)=>task_months[key]))
  // const yearlMap      = createMapLabelData(task_years,[5])

  const [goalStatus,setGoalStatus] = useState({})
  const [goalLevel,setGoalLevel]  = useState({})
  const [taskStatus,setTaskStatus] = useState({})
  const [monthList,setMonthList]      = useState({})
  const [yearList,setYearList]      = useState({})

  useEffect(()=>{

    if(Object.keys(secondary).length>0){

       const {goal_status:goal_status_all,goal_level:goal_level_all,years:task_years,months:task_months,status:task_status} = secondary ;
        setGoalStatus(createMapLabelData(goal_status_all,[3,1,0]))
        setGoalLevel(createMapLabelData(goal_level_all,[3,1,0]))
        setTaskStatus(createMapLabelData(task_status,[3,1,0]))
        setMonthList(createMapLabelData(Object.keys(task_months).map((key)=>task_months[key])))
        setYearList( createMapLabelData(task_years,[5]))

    }

  },[secondary])

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
          {
            text: labelWithColor(
              monthList[task_month]?.text || "Not Found",
              monthList[task_month]?.color || "error",
              "Task's Month"
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
                {labelWithColor(
                  yearList[task_year]?.text || "Not Found",
                  yearList[task_year]?.color || "error",
                  "Task's Year")}
                {labelWithColor(dailyTime, 'warning', 'Dedicated Time Per Day')}
              </Stack>
            ),
            styleType: 2
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{ width: '20%', minWidth: '150px' }}
        child_sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        prop={[
          { text: capitalizeFirstLetterOfWords(goal_name), styleType: 1 },
          {
            text: (
              <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }} spacing={1}>
                {labelWithColor(start_date ? start_date : 'Not Available','primary',"Goal's Start Date")}
                {labelWithColor(end_date ? end_date : 'Not Available','warning',"Goal's Deadline")}
              </Stack>
            ),
            styleType: 2
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{ width: '20%', minWidth: '150px' }}
        child_sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        prop={[
          { text: capitalizeFirstLetterOfWords(task_name), styleType: 1 },
          {
            text: (
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
                spacing={1}
              >
                {labelWithColor(
                  `SP: ${percentage}%`,
                  'info',
                  'Success Percentage'
                )}
                {labelWithColor(
                  `AP: ${result}%`,
                  'success',
                  'Achieved Percentage'
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
                {labelWithColor(
                  `GDL: ${goalLevel[difficulty]?.text || "Not Found"}`,
                  goalLevel[difficulty]?.color || "error",
                  'Goal Difficulty Level'
                )}
                {labelWithColor(
                  `GIL: ${goalLevel[importance]?.text || "Not Found"}`,
                  goalLevel[importance]?.color || "error",
                  'Goal Importance Level'
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
            text: labelWithColor(
              taskStatus[status.toUpperCase()]?.text || "Not Found",
              taskStatus[status.toUpperCase()]?.color || "error"
            ),
            styleType: 1
          },
          {
            text: labelWithColor(
              `GS: ${
                goalStatus[goal_status]?.text || "Not Found"
              }`,
              goalStatus[goal_status]?.color || "error",
              'Goal Status'
            ),
            styleType: 2
          }
        ]}
      />
      
      
      
      
      <TableCell align="right">
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} onEditButtonClick={onEditButtonClick} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
