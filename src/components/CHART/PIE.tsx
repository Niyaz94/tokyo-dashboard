import * as React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

import { Box, Typography } from "@mui/material";

type TaskData = {
  status: "COMPLETED" | "HALF_COMPLETED" | "UNCOMPLETED";
  task_num: number;
  totalspendingtime: number;
  istodaytask: number;
};

type ObjectData = TaskData[];

const allObjects: ObjectData[] = [
  [
    { status: "COMPLETED", task_num: 9, totalspendingtime: 0, istodaytask: 9 },
    { status: "HALF_COMPLETED", task_num: 3, totalspendingtime: 0, istodaytask: 3 },
    { status: "UNCOMPLETED", task_num: 12, totalspendingtime: 0, istodaytask: 12 },
  ],
  [
    { status: "COMPLETED", task_num: 5, totalspendingtime: 10, istodaytask: 5 },
    { status: "HALF_COMPLETED", task_num: 4, totalspendingtime: 3, istodaytask: 4 },
    { status: "UNCOMPLETED", task_num: 7, totalspendingtime: 0, istodaytask: 7 },
  ],
];

export default function MultiplePieCharts() {
  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={3}>
      {allObjects.map((objectData, i) => (
        <Box key={i} p={2} borderRadius={2} boxShadow={2} bgcolor="background.paper">
          <Typography variant="h6" mb={2}>
            Object {i + 1}
          </Typography>
          <PieChart
            height={250}
            series={[
              {
                data: objectData.map((item, idx) => ({
                  id: idx,
                  value: item.task_num,
                  label: item.status,
                  // 👇 Custom tooltip content
                  tooltip: `${item.status}\nTasks: ${item.task_num}\nToday: ${item.istodaytask}\nSpent: ${item.totalspendingtime}`,
                })),
                innerRadius: 40, // makes it doughnut-style
                outerRadius: 100,
              },
            ]}
          />
        </Box>
      ))}
    </Box>
  );
}
