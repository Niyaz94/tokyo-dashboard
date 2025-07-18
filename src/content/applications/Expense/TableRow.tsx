import { ChangeEvent } from 'react';

import {
  Checkbox,
  TableCell,
  TableRow,
} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {labelWithColor,getTextWithIcon,getDayAbbreviation,createMapLabelData,capitalizeFirstLetterOfWords} from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';



function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const {id,date,amount,note,currency_name,expense_type} = data;
  const { secondary } = usePaginationContext();
  const { type:expense_types, currency:currency_types } = secondary;
  const expenseTypeMap = createMapLabelData(expense_types.map((row) => row[1]));
  const currencyTypeMap = createMapLabelData(currency_types.map((row) => row[1]));

  // There are some samples that extracting note does not work for them, fix them in the future
  const note_text = JSON.parse(note)


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
        prop={[{ text: `${date} (${getDayAbbreviation(date)})`, styleType: 1 }]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: labelWithColor(
              `${capitalizeFirstLetterOfWords(expenseTypeMap[expense_type].text)}`,expenseTypeMap[expense_type].color,'Expense Type'
            ),
            styleType: 1
          },
          {
            text: labelWithColor(
              `${capitalizeFirstLetterOfWords(currencyTypeMap[currency_name].text)}`,currencyTypeMap[currency_name].color,'Currency Type'
            ),
            styleType: 2
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
        prop={[{ text: note_text["root"]["children"][0]["children"][0].text, styleType: 2 }]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="This Expense" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
