import { Suspense, lazy } from 'react';
import { Navigate }       from 'react-router-dom';
import { RouteObject }    from 'react-router';

import SidebarLayout      from 'src/layouts/SidebarLayout';
import BaseLayout         from 'src/layouts/BaseLayout';
import SuspenseLoader     from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards
const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications
const Messenger     = Loader(lazy(() => import('src/content/applications/Messenger')));
const Transactions  = Loader(lazy(() => import('src/content/applications/Transactions')));
const Expense       = Loader(lazy(() => import('src/content/applications/EXPENSE')));
const UserProfile   = Loader(lazy(() => import('src/content/applications/Users/profile')));
const UserSettings  = Loader(lazy(() => import('src/content/applications/Users/settings')));


// Daily Life
const Sleep         = Loader(lazy(() => import('src/content/applications/SLEEP')));
const SleepAdd      = Loader(lazy(() => import('src/content/applications/SLEEP/AddEdit')));
const SleepEdit     = Loader(lazy(() => import('src/content/applications/SLEEP/AddEdit')));
// const AddSleep      = Loader(lazy(() => import('src/content/applications/Sleep/AddSleep')));
const Activity      = Loader(lazy(() => import('src/content/applications/ACTIVITY')));
const Today         = Loader(lazy(() => import('src/content/applications/TODAY')));
const Tomorrow      = Loader(lazy(() => import('src/content/applications/TOMORROW')));
const Topic         = Loader(lazy(() => import('src/content/applications/TOPIC')));

const SINGLE_TASK   = Loader(lazy(() => import('src/content/applications/SINGLE_TASK')));
const TASK          = Loader(lazy(() => import('src/content/applications/TASK')));
const GOAL          = Loader(lazy(() => import('src/content/applications/GOAL')));
const TASK_STATUS   = Loader(lazy(() => import('src/content/applications/TASK_STATUS')));


const SIN_TASK_TYPE = Loader(lazy(() => import('src/content/applications/SIN_TASK_TYPE')));
const EXPENSE_TASK  = Loader(lazy(() => import('src/content/applications/EXPENSE_TASK')));
const RECIPE  = Loader(lazy(() => import('src/content/applications/RECIPE')));


// 



// Components
const Buttons     = Loader(lazy(() => import('src/content/pages/Components/Buttons')));
const Modals      = Loader(lazy(() => import('src/content/pages/Components/Modals')));
const Accordions  = Loader(lazy(() => import('src/content/pages/Components/Accordions')));
const Tabs        = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges      = Loader(lazy(() => import('src/content/pages/Components/Badges')));
const Tooltips    = Loader(lazy(() => import('src/content/pages/Components/Tooltips')));
const Avatars     = Loader(lazy(() => import('src/content/pages/Components/Avatars')));
const Cards       = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms       = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status
const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));


const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {path: '/',element: <Overview />},
      {path: 'overview',element: <Navigate to="/" replace />},
      {
        path: 'status',
        children: [
          {path: '',element: <Navigate to="404" replace />},
          {path: '404',element: <Status404 />},
          {path: '500',element: <Status500 />},
          {path: 'maintenance',element: <StatusMaintenance />},
          {path: 'coming-soon',element: <StatusComingSoon />}
        ]
      },
      {path: '*',element: <Status404 />}
    ]
  },{
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {path: '',element: <Navigate to="crypto" replace />},
      {path: 'crypto',element: <Crypto />},
      {path: 'messenger',element: <Messenger />}
    ]
  },{
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {path: '',element: <Navigate to="transactions" replace />},
      {path: 'transactions',element: <Transactions />},
      {path: 'expense/*',element: <Expense />},
      {
        path: 'profile',
        children: [
          {path: '',element: <Navigate to="details" replace />},
          {path: 'details',element: <UserProfile />},
          {path: 'settings',element: <UserSettings />}
        ]
      }
    ]
  },{
    path: 'personal',
    element: <SidebarLayout />,
    children: [
      {path: 'sleep/*',element: <Sleep />},
      {path: 'today/*',element: <Today />},
      {path: 'tomorrow/*',element: <Tomorrow />}, 
      {path: 'activity/*',element: <Activity />},
    ]
  },{
    path: 'goals',
    element: <SidebarLayout />,
    children: [
      // {path: '',element: <Navigate to="transactions" replace />},
      {path: 'single_task/*',element: <SINGLE_TASK />},
      {path: 'sin_task_types/*',element: <SIN_TASK_TYPE />},
      {path: 'expense_type/*',element: <EXPENSE_TASK />},
      {path: 'goals/*',element: <GOAL />},
      {path: 'task_progress/*',element: <TASK_STATUS />},
      // {path: 'task_progress/add',element: <TASK_STATUS_AddEdit />},
      // {path: 'task_progress/:id',element: <TASK_STATUS_AddEdit   />},
      {path: 'task/*',element: <TASK />}, 
    ]
  },{
    path: 'improvment',
    element: <SidebarLayout />,
    children: [
      {path: 'question/*',element: <Topic />},
      {path: 'idea/*',element: <Topic />},
      {path: 'topic/*',element: <Topic />},
    ]
  },{
    path: 'extra',
    element: <SidebarLayout />,
    children: [
      {path: 'foodrecipe/*',element: <RECIPE />},
    ]
  },{
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {path: '',element: <Navigate to="buttons" replace />},
      {path: 'buttons',element: <Buttons />},
      {path: 'modals',element: <Modals />},
      {path: 'accordions',element: <Accordions />},
      {path: 'tabs',element: <Tabs />},
      {path: 'badges',element: <Badges />},
      {path: 'tooltips',element: <Tooltips />},
      {path: 'avatars',element: <Avatars />},
      {path: 'cards',element: <Cards />},
      {path: 'forms',element: <Forms />}
    ]
  }
];

export default routes;
