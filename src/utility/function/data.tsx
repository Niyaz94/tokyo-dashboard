import TrendingUpIcon                       from '@mui/icons-material/TrendingUp';
import BalanceIcon                          from '@mui/icons-material/Balance';
import ThumbDownOffAltIcon                  from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon                    from '@mui/icons-material/ThumbUpOffAlt';
import HourglassEmptyIcon                   from '@mui/icons-material/HourglassEmpty';
import TrendingDownIcon                     from '@mui/icons-material/TrendingDown';


export const filterStatusOptions = [
    {id: 'all',name: 'All'},
    {id: 'VERY_LOW',name: 'Very Low'},
    {id: 'LOW',     name: 'Low'},
    {id: 'NORMAL',name: 'Normal'},
    {id: 'HIGH',name: 'High'},
    {id: 'VERY_HIGH',name: 'Very High'},
];

export const mapLabelData = {
    VERY_LOW      : {text: 'Very Low'           ,color: 'error',      icon:<ThumbDownOffAltIcon/>},
    LOW           : {text: 'Low'                ,color: 'warning',    icon:<TrendingDownIcon/>},
    NORMAL        : {text: 'Normal'             ,color: 'info',       icon:<BalanceIcon/>},
    HIGH          : {text: 'High'               ,color: 'primary',    icon:<TrendingUpIcon/>},
    VERY_HIGH     : {text: 'Very High'          ,color: 'success',    icon:<ThumbUpOffAltIcon/>},
    Not_Available : {text: 'Not Available'      ,color: 'black',      icon:<HourglassEmptyIcon/>},
};

export  const sleepStatus = [
    { value: 'VERY_LOW', label: 'Very Low' },
    { value: 'LOW', label: 'Low' },
    { value: 'NORMAL', label: 'Normal' },
    { value: 'HIGH', label: 'High' },
    { value: 'VERY_HIGH', label: 'Very High' }
];