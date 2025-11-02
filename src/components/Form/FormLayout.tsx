// components/FormLayout.tsx
import { Card, CardHeader, CardContent, Divider, Box, Grid } from "@mui/material";
import { CustomSnackbar, MultiButton } from "./index";

interface FormLayoutProps {
  title: string;
  onSaveReturn: () => void;
  onSaveContinue: () => void;
  isEdit: boolean;
  onSuccessRedirect?: string;
  snackbar: { open: boolean; message: string; severity: any; onClose: () => void };
  children: React.ReactNode;
}

export const FormLayout = ({ title, onSaveReturn, onSaveContinue, isEdit,onSuccessRedirect,snackbar, children }: FormLayoutProps) => (
  <Card>
    <CardHeader title={title} />
    <Divider />
    <CardContent>
      <Box component="form" sx={{ mt: 0, p: 2,pt: 0 }}>
        <Grid container spacing={2}>
          {children}
          <Grid size={12}>
            <MultiButton 
                saveReturn={onSaveReturn} 
                saveContinue={onSaveContinue} 
                type={isEdit ?"edit":"insert"}  
                returnUrl={onSuccessRedirect}
            />
            
            <CustomSnackbar {...snackbar} />
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
