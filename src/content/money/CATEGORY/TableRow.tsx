import { ChangeEvent } from 'react';

import {
  Checkbox,
  TableCell,
  TableRow,
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import ButtonTable from '../../../components/Form/ButtonTable';
import TableCusCell from '../../../components/Table/Cell';
import {labelWithColor,getTextWithIcon} from '../../../utility/function/main';
import { CategoryType }   from '../../../utility/function/data';



function CustomTableRow({data,isDataSelected,handleSelectOneData,onDeleteRow}) {


  const {id,name,category,current_month_total,current_month_count,last_month_total,last_month_count,two_months_ago_total,older_total,total,two_months_ago_count, older_count, total_count} = data;


  const { label = category, color = "black" } = CategoryType.find((row) => row.value === category) || {};
  // There are some samples that extracting note does not work for them, fix them in the future

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
        prop={[{ text: `${name} `, styleType: 1 }]}
      />
      
      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {text: getTextWithIcon(`${current_month_total.toString()}`,<ShoppingCartCheckoutIcon />,'success'),styleType: 1},
          {text:labelWithColor(`${current_month_count}`, 'secondary', 'Total Expense This Month',"",14,true),styleType: 2},
        ]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {text: getTextWithIcon(`${last_month_total.toString()}`,<ShoppingCartCheckoutIcon />,'info'),styleType: 1},
          {text:labelWithColor(`${last_month_count}`, 'secondary', 'Total Expense In The Last Month',"",14,true),styleType: 2}
        ]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {text: getTextWithIcon(`${two_months_ago_total.toString()}`,<ShoppingCartCheckoutIcon />,'error'),styleType: 1},
          {text:labelWithColor(`${two_months_ago_count}`, 'secondary', 'Total Expense Two Month Ago',"",14,true),styleType: 2}
        ]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {text: getTextWithIcon(`${older_total.toString()}`,<ShoppingCartCheckoutIcon />,'warning'),styleType: 1},
          {text:labelWithColor(`${older_count}`, 'secondary', 'Total Expense Before Two Months',"",14,true),styleType: 2}
        ]}
      />

      <TableCusCell
        cellProps={{ align: 'center' }}
        prop={[
          {text: getTextWithIcon(`${total.toString()}`,<ShoppingCartCheckoutIcon />,'warning'),styleType: 1},
          {text:labelWithColor(`${total_count}`, 'secondary', 'Total Expense',"",14,true),styleType: 2}
        ]}
      />


      <TableCusCell
        cellProps={{ align: 'center' }}
        sx={{ width: '20%' }}
        child_sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        prop={[{ text: labelWithColor(label,color,'Transaction Type'), styleType: 2 }]}
      />
      <TableCell align="right">
        <ButtonTable id={id} text="This Expense Type" onDeleteRow={onDeleteRow} />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
