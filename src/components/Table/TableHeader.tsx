import {Box,Typography,CardHeader,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default ()=>{
    const navigate=useNavigate()
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
}