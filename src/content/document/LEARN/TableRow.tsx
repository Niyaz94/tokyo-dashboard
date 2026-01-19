import { ChangeEvent } from 'react';

import {Checkbox,TableCell,TableRow,Stack,useTheme,Tooltip,IconButton} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import {labelWithColor,createMapLabelData,getDayAbbreviation} from '../../../utility/function/main';
import dayjs                           from "dayjs";
import {usePageContext as usePage}      from '../../../store/context/pageContext';
import { StatusCase2 as  SecrecyLevelList} from '../../../utility/function/data';

import { useNavigate }    from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {


  const  {secondary} = usePage();

  const {type:learn_types} = secondary;


  const theme = useTheme();
  const navigate = useNavigate();

  const secrecyLevelMap = createMapLabelData(SecrecyLevelList.map(({value}) => value),[3,1,0]);
  const learnTypesMap = createMapLabelData(learn_types.map((row) => row.label));

  const {id,created_at,title,type_names,notes} = data;

  const onEditButtonClick = () => {
    // setPageDefault(prev => ({...prev, date:{label:date,value: daily}}));
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
            <TableCusCell prop={
        [
          {text:`${dayjs(created_at).format("YYYY-MM-DD")} (${getDayAbbreviation(created_at)})`,styleType:1},
      ]} />
      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{width:'25%'}} 
        prop={[
          {
            text: (<Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' ,flexWrap: 'wrap',rowGap:"3px",columnGap:"2px"}} spacing={1}> 
            {type_names.map((type_name)=>labelWithColor(`${learnTypesMap[type_name]?.text ?? "Not Found"}`,learnTypesMap[type_name]?.color ?? "error",'Learn Type Name'))}
            </Stack>),
            styleType: 1
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: title,
            styleType: 1
          }
        ]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="Task Status" onDeleteRow={onDeleteRow} onEditButtonClick={onEditButtonClick} >
          <Tooltip title={`View Images`} arrow>
            <IconButton 
              color="inherit" onClick={() => {navigate(`image/${id}`);}}  size="medium" 
              sx={{'&:hover': {background: theme.colors.success.lighter},color: theme.palette.success.main}} 
            >
              <ImageIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </ButtonTable>
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
