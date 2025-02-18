import {JSX }                               from 'react';
import Label                                from 'src/components/Label';
import { level1Status }                     from 'src/utility/types/data_types';
import TrendingDownIcon                     from '@mui/icons-material/TrendingDown';
import TrendingUpIcon                       from '@mui/icons-material/TrendingUp';
import BalanceIcon                          from '@mui/icons-material/Balance';
import ThumbDownOffAltIcon                  from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon                    from '@mui/icons-material/ThumbUpOffAlt';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export const getStatusLabel = (status: level1Status,extraText:string="",icon:JSX.Element=null): JSX.Element => {

  const map = {
    VERY_LOW: {text: 'Very Low'   ,color: 'error'},
    LOW:      {text: 'Low',color: 'warning'},
    NORMAL:   {text: 'Normal'  ,color: 'secondary'},
    HIGH:     {text: 'High'  ,color: 'info'},
    VERY_HIGH:{text: 'Very High'  ,color: 'success'},
    Not_Available:{text: 'Not Available'  ,color: 'black'},
  };
  const { text, color }: any = map[status];
  return <Label color={color} >{icon}{` ${extraText} ${text}`}</Label>;
};

export const getStatusIcon = (status: level1Status,icon:JSX.Element,reverse:boolean=false): JSX.Element => {

  const map = {
    VERY_LOW: {text: 'Very Low'           ,color: 'error',      icon:<ThumbDownOffAltIcon/>},
    LOW:      {text: 'Low'                ,color: 'warning',    icon:<TrendingDownIcon/>},
    NORMAL:   {text: 'Normal'             ,color: 'secondary',  icon:<BalanceIcon/>},
    HIGH:     {text: 'High'               ,color: 'info',       icon:<TrendingUpIcon/>},
    VERY_HIGH:{text: 'Very High'          ,color: 'success',    icon:<ThumbUpOffAltIcon/>},
    Not_Available:{text: 'Not Available'  ,color: 'black',      icon:<HourglassEmptyIcon/>},
  };
  let { text, color,icon:s_icon }: any = map[status];
  if (reverse){
    const keys = Object.keys(map);
    const old_index = keys.indexOf(status);
    if ([0,4].includes(old_index))
      s_icon=map[keys[4-old_index]]["icon"]
    color=map[keys[4-old_index]]["color"]
  }
  return <Label color={color} >{icon} {s_icon}</Label>;
};

export const labelWithColor = (text,color): JSX.Element => {
  return <Label color={color} >{text}</Label>;
};
export const labelWithColorByIndex = (text,index): JSX.Element => {

  type colorType=| 'primary'| 'black'| 'secondary'| 'error'| 'warning'| 'success'| 'info';
  let colors:colorType[]=['primary','black','secondary','error','warning','success','info']

  index = index> colors.length?index%colors.length:index

  return <Label color={colors[index]} >{text}</Label>;
};

export const labelColorByNumber = (num: number): any => {
  const colors = ["error","error","black","black","warning","warning","info","info","success","success"];
  const index = Math.min(Math.floor(num / 10), 9); 
  return colors[index];
};

export const getTimeDifferenceInMinutes = (from: string, to: string): number => {
  const [h1, m1] = from.split(":").map(Number);
  const [h2, m2] = to.split(":").map(Number);

  const fullDay = 24 * 60 ;
  const totalMinutes1 = h1 * 60 + m1 ;
  const totalMinutes2 = h2 * 60 + m2 ;

  if (totalMinutes1 > totalMinutes2) {
    return fullDay - totalMinutes1 + totalMinutes2;
  }else{
    return totalMinutes2-totalMinutes1;
  }

};

export const getDayAbbreviation = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

//The below link explain why this comma is used with <T,>
// https://dev.to/tlylt/typescript-generic-function-reported-as-jsx-error-57nf 
export const applyPagination = <T,> (data: T[], page: number, limit: number): T[] => {
  return data.slice(page * limit, page * limit + limit);
};


export const applyFilters = <T,F> (data: T[],filters: F,field:string): T[] => {
  return data.filter((data) => {
    let matches = true;
    // FIXXXXXXXX
    if (filters["status"] && data[`${field}`] !== filters["status"]) {
      matches = false;
    }
    return matches;
  });
};