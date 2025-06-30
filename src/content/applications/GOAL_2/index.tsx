import { Helmet }           from 'react-helmet-async';
import { Grid2 as Grid, Container }  from '@mui/material';

import PageTitleWrapper     from 'src/components/PageTitleWrapper';
import Footer               from 'src/components/Footer';

import PageHeader           from './PageHeader';
import RecentOrders         from './Main';
import { CollapseProvider } from '../../../contexts/CollapseToggle';

function ApplicationsTransactions() {
  return (
    <CollapseProvider>
      <Helmet>
        <title>Goals</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid size={{xs:12}}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </CollapseProvider>
  );
}

export default ApplicationsTransactions;
