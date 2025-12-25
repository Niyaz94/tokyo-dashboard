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
const Crypto              = Loader(lazy(() => import('src/content/dashboards/Crypto')));
const Messenger           = Loader(lazy(() => import('src/content/applications/Messenger')));
const Transactions        = Loader(lazy(() => import('src/content/applications/Transactions')));
const Expense             = Loader(lazy(() => import('src/content/money/EXPENSE')));
const LOAN                = Loader(lazy(() => import('src/content/money/LOAN')));
const CURRENCY            = Loader(lazy(() => import('src/content/money/CURRENCY')));
const INCOME              = Loader(lazy(() => import('src/content/money/INCOME')));
const CURRENCY_LIMIT      = Loader(lazy(() => import('src/content/money/CURRENCY_LIMIT')));
const REPEAT              = Loader(lazy(() => import('src/content/money/REPEAT')));
const UserProfile         = Loader(lazy(() => import('src/content/applications/Users/profile')));
const UserSettings        = Loader(lazy(() => import('src/content/applications/Users/settings')));
const Sleep               = Loader(lazy(() => import('src/content/daily/SLEEP')));
const Activity            = Loader(lazy(() => import('src/content/daily/ACTIVITY')));
const Today               = Loader(lazy(() => import('src/content/daily/TODAY')));
const Tomorrow            = Loader(lazy(() => import('src/content/daily/TOMORROW')));
const Topic               = Loader(lazy(() => import('src/content/improvment/TOPIC')));
const IDEA               = Loader(lazy(() => import('src/content/improvment/IDEA')));
const TOPIC_TYPE          = Loader(lazy(() => import('src/content/secondary/TOPIC_TYPE')));
const IDEA_TYPE           = Loader(lazy(() => import('src/content/secondary/IDEA_TYPE')));
const SINGLE_TASK         = Loader(lazy(() => import('src/content/task/SINGLE_TASK')));
const TASK                = Loader(lazy(() => import('src/content/task/TASK')));
const GOAL                = Loader(lazy(() => import('src/content/task/GOAL')));
const TASK_STATUS         = Loader(lazy(() => import('src/content/task/TASK_STATUS')));
const SIN_TASK_TYPE       = Loader(lazy(() => import('src/content/secondary/SIN_TASK_TYPE')));
const TASK_MONTH          = Loader(lazy(() => import('src/content/secondary/TASK_MONTH')));
const CATEGORY            = Loader(lazy(() => import('src/content/money/CATEGORY')));
const RECIPE              = Loader(lazy(() => import('src/content/extra/RECIPE')));
const TASK_STATUS_REPORT  = Loader(lazy(() => import('src/content/reports/TASK_STATUS')));
const MONTHLY_EXPENSE     = Loader(lazy(() => import('src/content/reports/MONTHLY_EXPENSE')));
const DAILY_SUCCESS     = Loader(lazy(() => import('src/content/reports/DAILY_SUCCESS')));
const Buttons             = Loader(lazy(() => import('src/content/pages/Components/Buttons')));
const Modals              = Loader(lazy(() => import('src/content/pages/Components/Modals')));
const Accordions          = Loader(lazy(() => import('src/content/pages/Components/Accordions')));
const Tabs                = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges              = Loader(lazy(() => import('src/content/pages/Components/Badges')));
const Tooltips            = Loader(lazy(() => import('src/content/pages/Components/Tooltips')));
const Avatars             = Loader(lazy(() => import('src/content/pages/Components/Avatars')));
const Cards               = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms               = Loader(lazy(() => import('src/content/pages/Components/Forms')));
const Status404           = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const StatusComingSoon    = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance   = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));
const LOGIN               = Loader(lazy(() => import('src/content/user/LOGIN')));
const REGISTER            = Loader(lazy(() => import('src/content/user/REGISTER')));

const DOCUMENT            = Loader(lazy(() => import('src/content/document/DOCUMENT')));
const PASSWORD            = Loader(lazy(() => import('src/content/document/PASSWORD')));
const DOCUMENT_TYPE       = Loader(lazy(() => import('src/content/secondary/DOCUMENT_TYPE')));
const PASSWORD_TYPE       = Loader(lazy(() => import('src/content/secondary/PASSWORD_TYPE')));


const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {path: '/',element: <LOGIN />},
      {path: '/dashboard',element: <SidebarLayout />},
      {path: '/login',element: <LOGIN />},
      {path: '/register',element: <REGISTER />},
      {path: 'overview',element: <Navigate to="/" replace />},
      {
        path: 'status',
        children: [
          {path: '',element: <Navigate to="404" replace />},
          {path: '404',element: <Status404 />},
          {path: 'maintenance',element: <StatusMaintenance />},
          {path: 'coming-soon',element: <StatusComingSoon />}
        ]
      },
      {path: '*',element: <Status404 />}
    ]
  },
  {
    path: 'profile',
    element: <SidebarLayout />,
    children: [
      {path: '',element: <Navigate to="details" replace />},
      {path: 'details/*',element: <UserProfile />},
      {path: 'settings/*',element: <UserSettings />}
    ]
  },
  {
    path: 'transactions',
    element: <SidebarLayout />,
    children: [
      {path: '',element: <Navigate to="transactions" replace />},
      {path: 'expense/*',element: <Expense />},
      {path: 'loan/*',element: <LOAN />},
      {path: 'currency/*',element: <CURRENCY />},
      {path: 'income/*',element: <INCOME />},
      {path: 'currency_limit/*',element: <CURRENCY_LIMIT />},
      {path: 'repeat/*',element: <REPEAT />},
      {path: 'category/*',element: <CATEGORY />},
    ]
  },
  {
    path: 'documents',
    element: <SidebarLayout />,
    children: [
      {path: 'document/*',element: <DOCUMENT />},
      {path: 'password/*',element: <PASSWORD />},
      {path: 'document_type/*',element: <DOCUMENT_TYPE />},
      {path: 'password_type/*',element: <PASSWORD_TYPE />},
    ]
  },
  {
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
      {path: 'months/*',element: <TASK_MONTH />},

      
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
      {path: 'idea/*',element: <IDEA />},
      {path: 'topic/*',element: <Topic />},
    ]
  },{
    path: 'secondary',
    element: <SidebarLayout />,
    children: [
      {path: 'topic_type/*',element: <TOPIC_TYPE />},
      {path: 'idea_type/*',element: <IDEA_TYPE />},
    ]
  },{
    path: 'extra',
    element: <SidebarLayout />,
    children: [
      {path: 'foodrecipe/*',element: <RECIPE />},
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {path: '',element: <Navigate to="buttons" replace />},
      {path: 'crypto',element: <Crypto />},
      {path: 'messenger',element: <Messenger />},
      {path: 'transactions',element: <Transactions />},
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
  },
  {
    path: 'report',
    element: <SidebarLayout />,
    children: [
      {path: 'monthly_success',element: <TASK_STATUS_REPORT />},
      {path: 'monthly_expense',element:<MONTHLY_EXPENSE />},
      {path: 'daily_success',element:<DAILY_SUCCESS />}

    ]
  }
];

export default routes;
