import {JSX }           from 'react';
import Label            from 'src/components/Label';
import { level1Status,colorType } from 'src/utility/types/data_types';
import  {mapLabelData}  from "./data"
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import {axiosGetData} from '../../utility/Axios'


export const getStatusLabel = (status: level1Status,extraText:string="",icon:JSX.Element=null): JSX.Element => {
  if (status){
    const { text, color }: any = mapLabelData[status] || {text:"Normal",color:"error"};
    return <Label color={color} >{icon}{` ${extraText} ${text}`}</Label>
  }else{
    return  <Label color="warning">NOT FOUND</Label>;
  }
};

export const getStatusIcon = (status: level1Status,icon:JSX.Element,reverse:boolean=false): JSX.Element => {

  let { text, color,icon:s_icon }: any = mapLabelData[status] || {text:"Not found",color:"error",icon:<NotInterestedIcon />};
  if (reverse){
    const keys = Object.keys(mapLabelData);
    const old_index = keys.indexOf(status);
    if ([0,4].includes(old_index))
      s_icon=mapLabelData[keys[4-old_index]]["icon"]
    color=mapLabelData[keys[4-old_index]]["color"]
  }
  return <Label color={color} >{icon} {s_icon}</Label>;
};

export const getTextWithIcon = (text: string,icon:JSX.Element,color): JSX.Element => {


  return <Label color={color} >{text} {icon}</Label>;
};

export const labelWithColor = (text,color,tooltip="",secondary_text="",fontSize=13,isTransparent=false): JSX.Element => {
  return <Label color={color} tooltip={tooltip} fontSize={fontSize} isTransparent={isTransparent}>{secondary_text} {text}</Label>;
};



export const labelWithColorByIndex = (text,index): JSX.Element => {

  type colorType='primary'| 'black'| 'secondary'| 'error'| 'warning'| 'success'| 'info';
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
  return data.filter((row) => {
    let matches = true;
    if (filters[field] && row[`${field}`] !== filters[field]) {
      matches = false;
    }
    return matches;
  });
};
export const applyFilterValue = <T,> (data: T[],field:string,value:any,filterType:string="not_equal"): T[] => {
  return data.filter((row) => filterType=="not_equal"?row[`${field}`] !== value:row[`${field}`] === value);
};
export const createMapLabelData  = (values:string[],pos:number[]=[])=>{
  let results: Record<string | number, { text: string; color: string }> = {};

  let colors:string[]=["error","info","warning","success","black","primary","secondary"]
  let color_length=colors.length
  const use_predefine_color=values.length==pos.length
  for (const [index,element] of values.entries()) {
      let color_index=use_predefine_color?pos[index]:(index>color_length-1?index%color_length:index)
      results[element]={text: element.toString().replace(/_/gi, " ").toUpperCase(),color: colors[color_index]}
  }
  return results
} 

export const capitalizeFirstLetterOfWords= (str) => {
  return str.toString().replace(/_/gi, " ").replace(/\b\w/g, char => char.toUpperCase());
}

export const createSelectMap = (values: string[],mappingType:string="object"): { label: string; value: string|number }[] => {

  const map :{ label: string; value: string|number }[] = [];
  for (const value of values) {
    if (mappingType=="object"){
      map.push({ label:capitalizeFirstLetterOfWords(value[1].toLowerCase()), value:value[0] })
    }else if (mappingType=="array"){
      map.push({ label:capitalizeFirstLetterOfWords(value.toLowerCase()), value:value })
    }else if (mappingType=="type3"){
      map.push({ label:capitalizeFirstLetterOfWords(value.toLowerCase()), value:value.toLowerCase() })
    }
  }
  return map;
}


// Those functions are used previously in the project but not used anymore. But I keep them for future use

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | { value: unknown; name?: string }>
) => {
  const { name, value } = e.target as HTMLInputElement;
  // setFormData((prev) => ({ ...prev, [name]: value }));
};


export const dailySearch = async (query) => {
  const res = axiosGetData(`notes/daily/query_date/?query=${query}`);
  const {data} = await res;
  return  data ?? [];
}

export const monthlySearch = async (query) => {
  const res = axiosGetData(`schedule/task/query_month/?query=${query}`);
  const {data} = await res;
  return  data ?? [];
}

export const goalSearch = async (query) => {
  const res = axiosGetData(`schedule/task/query_goal/?query=${query}`);
  const {data} = await res;
  return  data ?? [];
}

export const taskSearch = async (query) => {
  const res = axiosGetData(`schedule/task/query_task/?query=${query}`);
  const {data} = await res;
  return  data ?? [];
}

export const getDeepText=(obj: any): string =>{
  try {
    const note=JSON.parse(obj)
    return note?.root?.children?.[0]?.children?.[0]?.text ?? 'No text found';
  } catch (e) {
    return 'No text found';
  }
}

export const getMonthName = (monthNumber: number): string => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('default', { month: 'long' });
}

export function getPriorityColor(numPriority: number): colorType {
  const map = { 400:"error", 350:"warning", 300:"info", 250:"success", 200:"primary", 150:"secondary", 100:"tertiary", 0:"default" };
  return map[
    Object.keys(map).map(Number).sort((a,b)=>b-a).find(key => key <= numPriority) ?? 0
  ];
}
