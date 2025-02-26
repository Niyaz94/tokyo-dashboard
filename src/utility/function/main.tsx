import {JSX }           from 'react';
import Label            from 'src/components/Label';
import { level1Status } from 'src/utility/types/data_types';
import  {mapLabelData}  from "./data"

export const getStatusLabel = (status: level1Status,extraText:string="",icon:JSX.Element=null): JSX.Element => {

  const { text, color }: any = mapLabelData[status];
  return <Label color={color} >{icon}{` ${extraText} ${text}`}</Label>;
};

export const getStatusIcon = (status: level1Status,icon:JSX.Element,reverse:boolean=false): JSX.Element => {

  let { text, color,icon:s_icon }: any = mapLabelData[status];
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

export const labelWithColor = (text,color,tooltip=""): JSX.Element => {
  return <Label color={color} tooltip={tooltip}>{text}</Label>;
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
    // FIXXXXXXXX
    if (filters["status"] && row[`${field}`] !== filters["status"]) {
      matches = false;
    }
    return matches;
  });
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
  return str.split("_").join(" ").replace(/\b\w/g, char => char.toUpperCase());
}