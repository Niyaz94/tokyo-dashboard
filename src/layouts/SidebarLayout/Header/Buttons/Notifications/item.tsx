import { Box, Chip, ListItem, Typography } from '@mui/material';

const NotificationItem = ({ title, detail, deadline, priority, status, types }) => {
    return (<ListItem
  sx={{
    p: 2,
    minWidth: 350,
    display: { xs: "block", sm: "flex" },
    alignItems: "flex-start",
    gap: 2
  }}
>
  <Box flex="1">
    {/* Top row: title + deadline */}
    <Box display="flex" justifyContent="space-between" mb={0.5}>
      <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>

      <Typography variant="caption" sx={{ textTransform: "none" }}>
        {deadline}
      </Typography>
    </Box>

    {/* Detail text */}
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {detail}
    </Typography>

    {/* Task type chips */}
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
      {types?.map((t) => (
        <Chip key={t} label={t} size="small" />
      ))}
    </Box>

    {/* Status + Priority */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="caption">
        <strong>Status:</strong> {status}
      </Typography>

      <Typography variant="caption">
        <strong>Priority:</strong> {priority}
      </Typography>
    </Box>
  </Box>
</ListItem>)
};
export default NotificationItem;