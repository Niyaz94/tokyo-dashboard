import {alpha,Badge,Box,Divider,IconButton,List,Popover,Tooltip,Typography} from '@mui/material';
import { useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';
import NotificationItem from './item';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge badgeContent={1} anchorOrigin={{vertical: 'top',horizontal: 'right'}}>
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover anchorEl={ref.current} onClose={handleClose} open={isOpen}
        anchorOrigin={{vertical: 'top',horizontal: 'right'}}
        transformOrigin={{vertical: 'top',horizontal: 'right'}}
      >
        <Box sx={{ p: 2 }} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          <NotificationItem
            title="Finish Dashboard Redesign"
            detail="UI updates required for the analytics dashboard."
            deadline="2 days left"
            priority={3}
            status="In Progress"
            types={["Design", "Frontend", "Urgent"]}
          />
        </List>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
