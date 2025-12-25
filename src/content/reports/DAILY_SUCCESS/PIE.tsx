
import { BarChart } from '@mui/x-charts/BarChart';

const normalizeCategory = (category) => {
  if (category === true) return "Yes";
  if (category === false) return "No";
  return category;
};

 const MultiplePieCharts= ({data,considerMonth}) => {


    if (considerMonth){
      const axisData=[...new Set(data.map(d => d.month))].sort()
      const categories = [...new Set(data.map(d => normalizeCategory(d.category)))];

      let seriesData = Object.fromEntries(
        axisData.map(cat => [cat, {}])
      )
      data.forEach(({ month, category, totalsuccess }) => {
        seriesData[month] = {
          ...seriesData[month],
          [normalizeCategory(category)]:totalsuccess,
          month
        };
      });
      return (
          <BarChart
            dataset={Object.values(seriesData)}
            xAxis={[{ dataKey: 'month' }]}
            series={categories.map((cat:any)=>({ dataKey: cat, label: cat }))}
            height={500}
          />
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
