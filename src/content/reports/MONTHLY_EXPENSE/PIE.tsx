import * as React from "react";

import {PieChart,ChartsTooltipContainer,useItemTooltip,} from '@mui/x-charts';
import { Box, Typography, Divider,Tooltip } from '@mui/material';
import { r } from "react-router/dist/development/fog-of-war-Ckdfl79L";


const settings = {
  margin: { right: 0, left: 0, top: 0, bottom: 0 },
  width: 300,
  height: 300,
  hideLegend: false,
  // showTooltip: true,
  // tooltip: { followPointer: true, offset: 75 },
};

 const MultiplePieCharts= ({data}) => {



  // const colorMap = { 
  //   clothes:'#0088FE' ,  
  //   duty: '#00C49F',
  //   health:'#FFBB28',
  //   necessity: '#FF8042' 
  // };

  const entries = Object.entries(data) as [string, any[]][];

  return (<Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1} >
    {entries.map(([rowKey, row], i) =>{

        return (
          <Box key={i} p={2} borderRadius={2} boxShadow={2} bgcolor="background.paper">

            <Tooltip title={`Expense Currency: ${rowKey}`} sx={{fontSize: '0.8rem'}} placement="top">
              <Typography variant="h6" mb={2} sx={{textAlign:'center'}}>
                {`Expense Currency: ${rowKey}`} 
                <Typography variant="h6" mb={2} sx={{textAlign:'center'}}>
                  {`Total Amount: ${Number(row.reduce((sum, obj) => sum + obj.total_amount, 0)).toLocaleString('en-US', {maximumFractionDigits:2})}`} 
                </Typography>
              </Typography>
              
            </Tooltip>

            <PieChart
              series={[
                {
                  data: row.map((item, idx) => ({
                    id: idx,
                    chartId:rowKey,
                    value: item.total_amount,
                    label: `${item.category_name} : ${item.total_amount.toLocaleString('en-US', {maximumFractionDigits:2})}`,
                    // color: colorMap[item.category_name.toLowerCase()] || '#8884d8', 
                  })) ?? [],
                  innerRadius: 40,
                  outerRadius: 150,
                  arcLabelRadius: '60%',
                  arcLabelMinAngle: 15,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  arcLabel: (item) => {
                    let total = row.reduce((sum, obj) => sum + obj.total_amount, 0);
                    let percentage = Number(((item.value / total) * 100).toFixed(2));
                    return `${percentage>5 ? percentage+ " %":''}`
                  },
                
                  valueFormatter: () => '',
                },
              ]}

              {...settings}
              // slots={{ tooltip: CustomItemTooltip }}
              
              slotProps={{ 
                tooltip: { trigger: 'item' } ,
                // legend: {
                //   direction: 'vertical',
                //   position: { 
                //     vertical: 'middle',
                //     horizontal: 'center'
                //   },
                //   sx: {
                //     overflowY: 'scroll',
                //     flexWrap: 'nowrap',
                //     height: '100%',
                //   },
                // }
              }}
            />
        </Box>)
      })}
  </Box>);
      
    
}

export default MultiplePieCharts;
