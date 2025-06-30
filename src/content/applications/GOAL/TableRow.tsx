import { Checkbox, TableCell, TableRow, Stack,useTheme } from '@mui/material';
import { ChangeEvent } from 'react';
import TableCusCell from '../../../components/Table/Cell';
import ButtonTable from '../../../components/Form/ButtonTable';
import { createMapLabelData,getDayAbbreviation } from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import {
  labelWithColor,
  getTextWithIcon,
  capitalizeFirstLetterOfWords
} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const { secondary,setPageDefault } = usePaginationContext();

  const onEditButtonClick = () => {
    // setPageDefault(prev => ({
      // ...prev, 
      // goal:{label:goal_name,value: goal},
      // month:{label:`${task_month} (${task_year})`,value: month},
    // }));
  }

  const {goal_status:goal_status_all,goal_level:goal_level_all} = secondary;

  const {id,startDate,endDate,prizeAmount,title,importanceLevel,difficultyLevel,currentStatus} = data;

  const goalStatusMap = createMapLabelData(goal_status_all,[3,1,0])
  const goalLevelMap  = createMapLabelData(goal_level_all,[3,1,0])



  const diffInMs = new Date(endDate).getTime()  - new Date().getTime();
  const diffInDays= Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
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
          {text:labelWithColor(endDate,"warning"),styleType:1},
          {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
            {labelWithColor(startDate,"info")}
            -
            {labelWithColor(diffInDays,diffInDays>0?"success":"error")}

            
          </Stack>,styleType:2}
      ]} 
      />
      <TableCusCell cellProps={{align:"center"}} prop={
        [{text:labelWithColor(goalLevelMap[importanceLevel].text,goalLevelMap[importanceLevel].color),styleType:1},]   
      } />
      <TableCusCell cellProps={{align:"center"}} prop={
        [{text: title,styleType:1},{text: prizeAmount,styleType:2}]
      } />
       <TableCusCell cellProps={{align:"center"}} prop={
        [{text: labelWithColor(goalLevelMap[difficultyLevel].text,goalLevelMap[difficultyLevel].color),styleType:1}]
      } />
      <TableCusCell cellProps={{align:"center"}} prop={
        [{text:labelWithColor(goalStatusMap[currentStatus].text,goalStatusMap[currentStatus].color)
          ,styleType:1}]
      } />
      <TableCell align="right">
        <ButtonTable id={id} text="Goal Status" onDeleteRow={onDeleteRow} onEditButtonClick={onEditButtonClick} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
