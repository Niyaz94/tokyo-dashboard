import { ChangeEvent } from 'react';

import {
  Checkbox,
  TableCell,
  TableRow,Stack
} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {labelWithColor,getTextWithIcon,getDayAbbreviation,createMapLabelData,capitalizeFirstLetterOfWords,getDeepText} from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';

import EventRepeatIcon from '@mui/icons-material/EventRepeat';

function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const {id,startDate,endDate,amount,note,currency_name} = data;
  const { secondary } = usePaginationContext();
  const { currency:currency_types } = secondary;
  const currencyTypeMap = createMapLabelData(currency_types.map(({label}) => label));

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
          {text:`${startDate} (${getDayAbbreviation(startDate)})`,styleType:1},
          {text:<Stack direction="row"  sx={{justifyContent: "left",alignItems: "left"}} spacing={1}>
            {labelWithColor(<EventRepeatIcon/>,"info")}

            {labelWithColor(endDate,"primary","Deadline")}
          </Stack>,styleType:2}
      ]} />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: labelWithColor(
              `${capitalizeFirstLetterOfWords(currencyTypeMap[currency_name]?.text || "Unknown")}`,
              currencyTypeMap[currency_name]?.color || 'error',
              'Currency Type'
            ),
            styleType: 1
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: getTextWithIcon(`${amount.toString()} ${currency_name} `,<MonetizationOnIcon />,'secondary'),
            styleType: 1
          },
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{ width: '20%' }}
        child_sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        prop={[{ text: getDeepText(note), styleType: 2 }]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="This Currency Limit" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
