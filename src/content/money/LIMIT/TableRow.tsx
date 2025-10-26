import { ChangeEvent } from 'react';

import {
  Checkbox,
  TableCell,
  TableRow,
} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
  labelWithColor,getTextWithIcon,getDayAbbreviation,createMapLabelData,
  capitalizeFirstLetterOfWords,getDeepText,getMonthName
} from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';



function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const {id,year,month,amount,note,currency_name,expense_category} = data;
  const { secondary } = usePaginationContext();
  const { type:expense_types, currency:currency_types } = secondary;
  const expenseTypeMap = createMapLabelData(expense_types.map((row) => row[1]));
  const currencyTypeMap = createMapLabelData(currency_types.map((row) => row[1]));


  const {text:textExpenseType,color:colorExpenseType}= expenseTypeMap[expense_category] || {text:expense_category,color:'black'};



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
      <TableCusCell cellProps={{ align: 'center' }} prop={[{ text: `${year}`, styleType: 1 }]}/>
      <TableCusCell cellProps={{ align: 'center' }} prop={[{ text: `${getMonthName(month)}`, styleType: 1 }]}/>
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: labelWithColor(
              `${capitalizeFirstLetterOfWords(textExpenseType)}`,colorExpenseType,'Expense Type'
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
        prop={[{ text: getDeepText(note), styleType: 2 }]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="This Expense" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
