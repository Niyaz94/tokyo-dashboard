import {TableCell,Typography,TypographyProps } from '@mui/material';


const cellStyle = (type):TypographyProps=>{
    if (type==1){
        return {variant:'body1',color:'text.primary',fontWeight:'bold',gutterBottom:true,noWrap:true}
    }else if(type==2){
        return {variant:'body2',color:'text.secondary',gutterBottom:false,noWrap:true,sx:{}}
    }else{
        return {}
    }
}

const labelColorByNumber = (num: number): string => {
    const colors = ["error","error","black","black","warning","warning","info","info","success","success"];
    const index = Math.min(Math.floor(num / 10), 9); // Ensure index stays between 0-9
    return colors[index];
  };

function Cell({prop,cellProps={},sx={},child_sx={}}) {
  return (
    <TableCell {...cellProps} {...sx}>
        {prop.map(({text,styleType}, index) => {
            return (
                <Typography key={index} {...cellStyle(styleType)} {...child_sx}>
                    {text}
                </Typography>
            )
        })}
    </TableCell>
  )
}
export default Cell