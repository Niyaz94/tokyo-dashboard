import {ChangeEvent }      from 'react';

import {Tooltip,Checkbox,IconButton,TableCell,TableRow,Stack,useTheme} from '@mui/material';
import EditTwoToneIcon                    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon                  from '@mui/icons-material/DeleteTwoTone';
import TableCusCell                       from '../../../components/Table/Cell';
import CampaignIcon                       from '@mui/icons-material/Campaign';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { getStatusIcon,labelWithColor,getDayAbbreviation ,labelWithColorByIndex} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,goalStatusMap,goalLevelMap}) {

    const theme = useTheme();
    const {id,startDate,endDate,prizeAmount,title,importanceLevel,difficultyLevel,currentStatus} = data;


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
          {text:`${startDate} (${getDayAbbreviation(startDate)})`,styleType:1},
          {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
            {labelWithColor(<EventAvailableIcon/>,"info")}
            {labelWithColor(endDate,"warning")}
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