import { Box, CircularProgress, Typography, Fade } from "@mui/material";

export function PageLoader({
  label = "Loading Table Data…",
}: {
  label?: string;
}) {
  return (
    <Fade in>
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={48} />
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {label}
        </Typography>
      </Box>
    </Fade>
  );
}
