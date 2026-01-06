
import { BarChart } from '@mui/x-charts/BarChart';

import { Paper } from '@mui/material';

import {PieChart,ChartsTooltipContainer,useItemTooltip,} from '@mui/x-charts';
import { Box, Typography, Divider,Tooltip } from '@mui/material';
const normalizeCategory = (category) => {
  if (category === true) return "Yes";
  if (category === false) return "No";
  if (category === 0) return "0 Time";
  if (category === 1) return "1 Time";
  if (category === 2) return "2 Times";
  return category;
};

 const MultiplePieCharts= ({data,considerMonth}) => {

    //It work but it needs more research to make it perfect
    // const CustomItemTooltip: React.FC = (prop) => {

    //     // this hook returns the hovered item info (or undefined/null when nothing hovered)
    //     const item = useItemTooltip() as any | null;
    //     if (!item || !item.label) 
    //       return null;

    //     const dataIndex = item.identifier?.dataIndex ?? item?.dataIndex ?? 0;
    //     const {value:slicValue} = item;

    //     console.log(item);
    //     // const {totalspendingtime,istodaytask} = data[slicValue["chartId"]]["taskStatus"][dataIndex]
    //     // const total_tasks = data[slicValue["chartId"]]["taskStatus"].reduce((sum, obj) => sum + obj.task_num, 0);
    //     // let percentage = Number(((slicValue.value / total_tasks) * 100).toFixed(2));
    //     return (
    //       <ChartsTooltipContainer trigger="item">
    //         <Paper sx={{ p: 1, minWidth: 180}}>

    //           <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    //             {item.color && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />}
    //             {item.label}
    //           </Typography>
    //           <Divider sx={{ my: 0.5 }} />

    //           {/* <Typography variant="body2">Task's Percentage: {percentage}%</Typography>
    //           <Typography variant="body2">Number of Tasks: {slicValue.value}</Typography>
    //           <Typography variant="body2">Total Spending Time: {totalspendingtime} MIN</Typography>
    //           <Typography variant="body2">Is Today's Task: {istodaytask}</Typography> */}
    //           <Typography variant="body2">Number of Total Tasks:2</Typography>
    //         </Paper>
    //       </ChartsTooltipContainer>
    //     );
    // };

    if (considerMonth){
      const labels=[...new Set(data.map(d => d.month))].sort()
      const categories = [...new Set(data.map(d => normalizeCategory(d.category)))];
      const groupedData = Object.fromEntries(
        categories.map(cat => [normalizeCategory(cat), labels.map(label => ({month:label, totalsuccess: 0, totaldays:0}))])
      );

      data.forEach(({ month, category, totalsuccess ,totaldays}) => {
        category = normalizeCategory(category);
        groupedData[category].forEach((row,index) => {
          if (row.month === month) {
            groupedData[category][index].totalsuccess = totalsuccess;
            groupedData[category][index].totaldays = totaldays;
          }
        });
      });

      const axisData= groupedData[Object.keys(groupedData)[0]].map((row) => row.month)
      const seriesData=Object.entries(groupedData).map(([key,row]:any)=>({ 
        data:row.map(item=>item.totalsuccess),
        id:key,
        label: key,
        valueFormatter: (value: number | null,{dataIndex}) => {
          return `SR: ${value}% (${row.map(item=>item.totaldays)[dataIndex]})`
        },
      }))
      return ( seriesData.length >0 &&
        (<BarChart
            xAxis={[{ data: axisData }] }
            series={seriesData}
            height={500}
            // barLabel={'value'}
            barLabel={(item, context) => {
              const {seriesId, dataIndex,value}=item

              let shown_value=0
              if (Object.keys(groupedData).includes(seriesId as string)){
                shown_value= (groupedData[seriesId].filter((row)=>row.month==labels[dataIndex])?.[0] || {totalsuccess:0,totaldays:0}).totaldays;

              }
              return shown_value > 0 ? `${shown_value}` : '';
            }}
            // slots={{ tooltip: CustomItemTooltip }}
            // slotProps={{ tooltip: { trigger: 'item' } }}
          />)
      )
      
    }else{

      let seriesData=data.map((row)=>({...row,category:normalizeCategory(row.category)}))

      return (
          <BarChart
            dataset={seriesData}
            xAxis={[{ dataKey: 'category' }]}
            series={[{dataKey: 'totalsuccess', label: 'AVG SR in Percentage'}]}
            height={500}
          />
      )
    }    

  

      
      
    
}

export default MultiplePieCharts;
