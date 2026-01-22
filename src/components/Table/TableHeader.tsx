import {Box,Typography,CardHeader,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Tooltip from '@mui/material/Tooltip';

interface HeaderCardInf {
  style?:number;
  title?:string;
  url?:string;
}

export default ({style=1,title="",url=""}:HeaderCardInf)=>{
    const navigate=useNavigate()
    if(style==1)
      return (
          <CardHeader
              title={<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}> <Typography variant="h6">Recent Orders</Typography></Box>}
              action={
                <Box sx={{width: '100%',display: 'flex',justifyContent: 'space-between',alignItems: 'center',flexWrap: 'wrap',gap: 2,}}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate('add')}
                      sx={{fontSize: '1.2rem',padding: '10px 40px',borderRadius: '10px',textTransform: 'none',boxShadow: 3}}
                    >
                      Insert
                    </Button>
                  </Box>
                </Box>
              }
            />
      )
    else if(style==2){
      return (
          <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6">Recent Orders</Typography>
            </Box>
          }
          action={
            <Box width={600} height={70} sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
              
              <Tooltip title={`Add New ${title}`} sx={{fontSize: '0.8rem'}} placement="top">
                <Button
                  variant="outlined" color="error" onClick={() => navigate(`${url}/add`,{state: { from: location.pathname } })}
                  sx={{padding: '10px',borderRadius: '20px 10px',textTransform: 'none',boxShadow: 3}}
                >
                  <AddTaskIcon fontSize="large" sx={{marginRight:1}} />
                </Button>
              </Tooltip>

              <Tooltip title="Add New Document" sx={{fontSize: '0.8rem'}} placement="top">
                <Button
                  variant="outlined" color="primary" onClick={() => navigate('add')}
                  sx={{padding: '10px',borderRadius: '20px 10px',textTransform: 'none',boxShadow: 3}}
                >
                  <AddIcon fontSize="large" />
                </Button>
              </Tooltip>
            </Box>
          }
        />
      )
    }
}