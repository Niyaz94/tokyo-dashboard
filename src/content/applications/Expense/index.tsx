import { Helmet }           from 'react-helmet-async';
import { Grid, Container }  from '@mui/material';

import PageTitleWrapper     from 'src/components/PageTitleWrapper';
import Footer               from 'src/components/Footer';

import PageHeader           from './PageHeader';
import RecentOrders         from './RecentOrders';
import { CollapseProvider } from '../../../contexts/CollapseToggle';

function ApplicationsTransactions() {
  return (
    <CollapseProvider>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </CollapseProvider>
  );
}

export default ApplicationsTransactions;
