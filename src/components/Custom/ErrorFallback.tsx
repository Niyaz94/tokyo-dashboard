import {
  Box,
  Button,
  Typography,
  Alert,
  AlertTitle,
  Fade,
} from "@mui/material";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorFallback({
  message = "Something went wrong while loading the data.",
  onRetry,
}: Props) {
  return (
    <Fade in>
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Alert
          severity="error"
          sx={{
            maxWidth: 420,
            width: "100%",
            borderRadius: 2,
          }}
        >
          <AlertTitle>Oops</AlertTitle>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: onRetry ? 2 : 0 }}
          >
            {message}
          </Typography>

          {onRetry && (
            <Button
              size="small"
              variant="outlined"
              startIcon={<ReplayRoundedIcon />}
              onClick={onRetry}
            >
              Try again
            </Button>
          )}
        </Alert>
      </Box>
    </Fade>
  );
}
