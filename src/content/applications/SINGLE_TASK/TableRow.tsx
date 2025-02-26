import {ChangeEvent }      from 'react';

import {Tooltip,Checkbox,IconButton,TableCell,TableRow,Stack,useTheme} from '@mui/material';
import EditTwoToneIcon                    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon                  from '@mui/icons-material/DeleteTwoTone';
import TableCusCell                       from '../../../components/Table/Cell';
import CampaignIcon                       from '@mui/icons-material/Campaign';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { getStatusIcon,labelWithColor,getDayAbbreviation ,labelWithColorByIndex} from '../../../utility/function/main';

function CustomTableRow({data,isDataSelected,handleSelectOneData,taskTypeNameMap,taskStatusMap}) {

    const theme = useTheme();
    const {id,date,type_name,description,title,priority,status,deadline} = data;

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
                      {text:`${date} (${getDayAbbreviation(date)})`,styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(<EventAvailableIcon/>,"info")}
                        {labelWithColor(deadline?deadline:"Not Available","warning")}
                      </Stack>,styleType:2}
                  ]} 
                  />
                  <TableCusCell cellProps={{align:"center"}} prop={
                    [{text:labelWithColor(taskTypeNameMap[type_name].text,taskTypeNameMap[type_name].color),styleType:1},]
                  } />
                  <TableCusCell cellProps={{align:"center"}} sx={{width:'20%',minWidth:'150px'}} child_sx={{whiteSpace:'normal',wordBreak: 'break-word' }} prop={[
                      {text: title,styleType:1},
                      {text: description,styleType:2}
                  ]} />
                   <TableCusCell cellProps={{align:"center"}} prop={
                    [{text: getStatusIcon(priority.toUpperCase(),<CampaignIcon />),styleType:1}]
                  } />
                  <TableCusCell cellProps={{align:"center"}} prop={
                    [{text:labelWithColor(taskStatusMap[status.toUpperCase()].text,taskStatusMap[status.toUpperCase()].color),styleType:1},]
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