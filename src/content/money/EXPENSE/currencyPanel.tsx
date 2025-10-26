import React from "react";
import {Card,CardContent,Typography,Grid,LinearProgress,Box,Stack,useTheme} from "@mui/material";

type CurrencyData = {
  name: string;
  totallimit: number;
  start_date: string;
  end_date: string;
  totalspend: number;
};

interface CurrencyPanelProps {
  data: CurrencyData[];
}

const CurrencyPanel: React.FC<CurrencyPanelProps> = ({ data }) => {

  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {data.map((item) => {
        const remaining = item.totallimit - item.totalspend;
        const percent = Math.min(
          (item.totalspend / item.totallimit) * 100,
          100
        );

        return (
          <Grid sx={{xs:12,sm:6,md:4}} key={item.name}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                transition: "0.3s",
                "&:hover": { boxShadow: 5 },
              }}
            >
              <CardContent>
                <Stack spacing={1}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                  >
                    {item.name}
                  </Typography>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Limit:{" "}
                      <Typography component="span" color="text.primary">
                        {item.totallimit.toLocaleString()}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Spend:{" "}
                      <Typography component="span" color="error.main">
                        {item.totalspend.toLocaleString()}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Remaining:{" "}
                      <Typography
                        component="span"
                        color={remaining >= 0 ? "success.main" : "error.main"}
                      >
                        {remaining >= 0?remaining.toLocaleString():(0).toLocaleString()}
                      </Typography>
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={percent}
                    color={percent >= 100 ? "error" : percent >= 80?"warning":"success"}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      mt: 1,
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? theme.palette.grey[300]
                          : theme.palette.grey[700],
                    }}
                  />

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textAlign: "right" }}
                  >
                    {item.start_date} → {item.end_date}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CurrencyPanel;
