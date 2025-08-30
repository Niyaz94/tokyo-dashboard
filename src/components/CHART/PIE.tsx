import * as React from "react";

import {PieChart,ChartsTooltipContainer,useItemTooltip,} from '@mui/x-charts';
import { Box, Typography, Divider,Tooltip } from '@mui/material';


const settings = {
  margin: { right: 0, left: 0, top: 0, bottom: 0 },
  width: 300,
  height: 300,
  hideLegend: true,
  // showTooltip: true,
  // tooltip: { followPointer: true, offset: 75 },
};

 const MultiplePieCharts= ({data}) => {


  const CustomItemTooltip: React.FC = (prop) => {
    // this hook returns the hovered item info (or undefined/null when nothing hovered)
    const item = useItemTooltip() as any | null;
    if (!item || !item.label) 
      return null;

    const dataIndex = item.identifier?.dataIndex ?? item?.dataIndex ?? 0;

    const {value:slicValue} = item;
    const {totalspendingtime,istodaytask} = data[slicValue["chartId"]]["taskStatus"][dataIndex]
    const total_tasks = data[slicValue["chartId"]]["taskStatus"].reduce((sum, obj) => sum + obj.task_num, 0);
    let percentage = Number(((slicValue.value / total_tasks) * 100).toFixed(2));


    return (
      <ChartsTooltipContainer trigger="item">
        <Box sx={{ p: 1, minWidth: 180, bgcolor: 'background.paper' }}>

          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {item.color && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />}
            {item.label}
          </Typography>
          <Divider sx={{ my: 0.5 }} />

          <Typography variant="body2">Task's Percentage: {percentage}%</Typography>
          <Typography variant="body2">Number of Tasks: {slicValue.value}</Typography>
          <Typography variant="body2">Total Spending Time: {totalspendingtime} MIN</Typography>
          <Typography variant="body2">Is Today's Task: {istodaytask}</Typography>
          <Typography variant="body2">Number of Total Tasks: {total_tasks}</Typography>


          
        </Box>
      </ChartsTooltipContainer>
    );
  };

  const colorMap = {  half_completed:'#0088FE' ,  completed: '#00C49F',inapplicable:'#FFBB28',uncompleted: '#FF8042' };

  return (<Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} >
    {Object.entries(data).map(([rowKey, row], i) =>{
        return (<Box key={i} p={2} borderRadius={2} boxShadow={2} bgcolor="background.paper">

        <Tooltip title={`${row["month_name"]} (${row["month_year"]})`} sx={{fontSize: '0.8rem'}} placement="top">
          <Typography variant="h6" mb={2} sx={{textAlign:'center'}}>
             {`Task Name: ${row["name"]}`}
          </Typography>
        </Tooltip>
          


          <PieChart
            series={[
              {
                data: row["taskStatus"]?.map((item, idx) => ({
                  id: idx,
                  chartId:rowKey,
                  value: item.task_num,
                  label: item.status,
                  color: colorMap[item.status.toLowerCase()] || '#8884d8', 
                })) ?? [],
                innerRadius: 40,
                outerRadius: 150,
                arcLabelRadius: '60%',
                arcLabelMinAngle: 15,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                arcLabel: (item) => {
                  let total = row["taskStatus"].reduce((sum, obj) => sum + obj.task_num, 0);
                  let percentage = Number(((item.value / total) * 100).toFixed(2));
                  return `${percentage>5 ? percentage+ " %":''}`
                },
                // valueFormatter: (_data_,{dataIndex}) => {
                //   const {totalspendingtime,istodaytask} = data[_data_["chartId"]]["taskStatus"][dataIndex]
                //   return `
                //   Number of tasks: ${_data_.value}. \n\n\n
                //   Total Spending Time: ${totalspendingtime} mins.
                //   Is Today's Task: ${istodaytask}.
                //   `;
                // },     
                valueFormatter: () => '',
              },
            ]}

            {...settings}
            slots={{ tooltip: CustomItemTooltip }}
            slotProps={{ tooltip: { trigger: 'item' } }}
          />
        </Box>)
      })}
  </Box>);
      
    
}

export default MultiplePieCharts;
