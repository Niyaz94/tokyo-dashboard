import {JSX }           from 'react';
import Label            from 'src/components/Label';
import { colorType,level1Status } from 'src/utility/types/data_types';
import  {mapLabelData}  from "./data"
import NotInterestedIcon from '@mui/icons-material/NotInterested';



interface ColorLabelComponentINF{
    children:any;
    color:colorType;
    tooltip?:string;
}
export const ColorLabelComponent = ({children,color,tooltip=""}:ColorLabelComponentINF): JSX.Element => {
  return (<Label color={color} tooltip={tooltip}>
    {children}
  </Label>);
};


interface IconLabelComponentINF{
    children:any;
    text: level1Status;
    reverse?:boolean;
}
export const IconLabelComponent = ({children, text,reverse=false}:IconLabelComponentINF): JSX.Element => {

  let { _, color,icon:s_icon }: any = mapLabelData[text] || {text:"Not found",color:"error",icon:<NotInterestedIcon />};
  if (reverse){
    const keys = Object.keys(mapLabelData);
    const old_index = keys.indexOf(text);
    if ([0,4].includes(old_index))
      s_icon=mapLabelData[keys[4-old_index]]["icon"]
    color=mapLabelData[keys[4-old_index]]["color"]
  }
    return <Label color={color} >
        {children} 
        {s_icon}
    </Label>;
};