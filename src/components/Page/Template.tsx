import { FC }          from 'react';
import {Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import { Helmet }                 from 'react-helmet-async';
import Footer                     from 'src/components/Footer';
import { TemplatePropsInterface } from 'src/utility/types/data_types';

const  Template: FC<TemplatePropsInterface> = ({children,templateTitle}) =>{
  return (
    <>
      <Helmet>
        <title>{templateTitle}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid size={{xs:12}}>
            {children}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default Template;
