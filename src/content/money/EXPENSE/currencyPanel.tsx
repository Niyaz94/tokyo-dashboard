import {Collapse,Divider,IconButton,Paper,Card,CardContent,Typography,Grid,LinearProgress,Box,Stack,useTheme} from "@mui/material";

import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

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
  const [open, setOpen] = useState(false);
  
  return (
    <Paper elevation={12} variant="outlined" sx={{p: 1,my:1,borderRadius: 2,bgcolor: "background.paper",width: "100%"}}>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 1}}>
        <Typography variant="h4" fontWeight={600}>
          Total Expense Details
        </Typography>
        <IconButton onClick={() => setOpen(!open)} color="primary">
          {open ? <CloseIcon /> : <FilterListIcon />}
        </IconButton>
      </Box>
      {open && <Divider />}

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack direction="row" flexWrap="wrap" spacing={2} useFlexGap sx={{m: 1,px:2,justifyContent: "flex-start"}}>
          {data.map((item) => {
            const remaining = item.totallimit - item.totalspend;
            const percent = Math.min(
              (item.totalspend / item.totallimit) * 100,
              100
            );
            return (
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
            );
          })}
        </Stack>
      </Collapse>
    </Paper>
    
  );
};

export default CurrencyPanel;
