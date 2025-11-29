import { Box, Chip, ListItem, Typography } from '@mui/material';

const NotificationItem = ({ title, note_text, days_remaining, t_priority, status, type_names }) => {
    return (<ListItem
  sx={{
    p: 2,
    minWidth: 350,
    maxWidth: 450,
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
        {days_remaining>0 ? `${Math.ceil(days_remaining)} days left` : `Overdue by ${Math.floor(-1*days_remaining)} days`}
      </Typography>
    </Box>

    {/* Detail text */}
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {note_text}
    </Typography>

    {/* Task type chips */}
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
      {type_names?.map((t) => (
        <Chip key={t} label={t} size="small" />
      ))}
    </Box>

    {/* Status + Priority */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="caption">
        <strong>Status:</strong> {status}
      </Typography>

      <Typography variant="caption">
        <strong>Priority:</strong> {t_priority}
      </Typography>
    </Box>
  </Box>
</ListItem>)
};
export default NotificationItem;