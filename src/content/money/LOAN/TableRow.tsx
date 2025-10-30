import { ChangeEvent } from 'react';

import {
  Checkbox,
  TableCell,
  TableRow,
} from '@mui/material';
import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {labelWithColor,getTextWithIcon,getDayAbbreviation,createMapLabelData,capitalizeFirstLetterOfWords,getDeepText} from '../../../utility/function/main';
import { usePaginationContext } from '../../../store/context/paginationContext';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {

  const {id,date,amount,note,currency_name,category_name,consider,expectedReturnDate} = data;
  const { secondary } = usePaginationContext();
  const { type:loan_types, currency:currency_types } = secondary;
  const loanTypeMap = createMapLabelData(loan_types.map(({_,label}) => label));
  const currencyTypeMap = createMapLabelData(currency_types.map(({_,label}) => label));


  const {text:textLoanType,color:colorLoanType}= loanTypeMap[category_name] || {text:category_name,color:'black'};


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
        prop={[{ text: `${date} (${getDayAbbreviation(date)})`, styleType: 1 }]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[{ text: `${expectedReturnDate} (${getDayAbbreviation(expectedReturnDate)})`, styleType: 1 }]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {
            text: labelWithColor(
              `${capitalizeFirstLetterOfWords(textLoanType)}`,colorLoanType,'loan Type'
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
            text: getTextWithIcon(`${Number(amount).toLocaleString('en-US', {maximumFractionDigits:2})} ${currency_name} `,<MonetizationOnIcon />,'secondary'),
            styleType: 1
          },
          {
            text: consider ? labelWithColor(<CheckIcon />,'success') : labelWithColor(<ClearIcon />,'error'),
            styleType: 2
          }
        ]}
      />
      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{ width: '20%' }}
        child_sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        prop={[{ text: getDeepText(note), styleType: 2 }]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="This loan" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
