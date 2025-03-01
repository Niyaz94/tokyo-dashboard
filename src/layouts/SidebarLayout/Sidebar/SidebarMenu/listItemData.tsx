import DesignServicesTwoToneIcon    from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon     from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon               from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon        from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon     from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon            from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon       from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon       from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon     from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon         from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon     from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon            from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon          from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon           from '@mui/icons-material/TrafficTwoTone';
import CheckBoxTwoToneIcon          from '@mui/icons-material/CheckBoxTwoTone';
import ChromeReaderModeTwoToneIcon  from '@mui/icons-material/ChromeReaderModeTwoTone';
import WorkspacePremiumTwoToneIcon  from '@mui/icons-material/WorkspacePremiumTwoTone';
import CameraFrontTwoToneIcon       from '@mui/icons-material/CameraFrontTwoTone';
import DisplaySettingsTwoToneIcon   from '@mui/icons-material/DisplaySettingsTwoTone';
import BedtimeIcon                  from '@mui/icons-material/Bedtime';
import DirectionsRunIcon            from '@mui/icons-material/DirectionsRun';
import AssignmentIcon               from '@mui/icons-material/Assignment';
import EmojiEventsIcon              from '@mui/icons-material/EmojiEvents';
import AddTaskIcon                  from '@mui/icons-material/AddTask';
import ChecklistIcon                from '@mui/icons-material/Checklist';

import { ReactElement } from 'react';

interface SlideBarItem {
  title: string;
  link: string;
  icon: ReactElement;
}

interface SlideBarSection {
  title: string;
  showSubHeader: boolean;
  children: SlideBarItem[];
}

const slideBarItems: Record<string, SlideBarSection> = {
    overview: {
        title: 'Overview',
        showSubHeader: false,
        children: [
          {title: 'Overview',link: '/overview',icon: <DesignServicesTwoToneIcon />}
        ],
      },
      dashboards: {
        title: 'Dashboards',
        showSubHeader: true,
        children: [
          {title: 'Cryptocurrency',link: '/dashboards/crypto',icon: <BrightnessLowTwoToneIcon />},
          {title: 'Messenger',link: '/dashboards/messenger',icon: <MmsTwoToneIcon />},
        ],
      },
      moneyManagement: {
        title: 'Money Management',
        showSubHeader: true,
        children: [
          {title: 'Transactions List',link: '/management/transactions',   icon: <TableChartTwoToneIcon />},
          {title: 'Expense Types',    link: '/money/expense/types',       icon: <TableChartTwoToneIcon />},
          {title: 'Expense Details',  link: '/money/expense',             icon: <TableChartTwoToneIcon />},
          {title: 'Currency',         link: '/money/currency',            icon: <TableChartTwoToneIcon />},
          {title: 'Expense Reports',  link: '/money/expense/reports',     icon: <TableChartTwoToneIcon />},
        ],
      },
      myDailyLife: {
        title: 'My Daily Life',
        showSubHeader: true,
        children: [
          {title: 'Today',link: '/personal/today',icon: <TableChartTwoToneIcon />,},
          {title: 'Activity',link: '/personal/activity',icon: <DirectionsRunIcon />},
          {title: 'Sleep',link: '/personal/sleep',icon: <BedtimeIcon />},
          {title: 'Tomorrow',link: '/personal/tomorrow',icon: <TableChartTwoToneIcon />},
        ],
      },
      lifeGoals: {
        title: 'Life Goals',
        showSubHeader: true,
        children: [
          {title: 'Goals',link: '/goals/goals',icon: <EmojiEventsIcon />},
          {title: 'Months',link: '/goals/months',icon: <TableChartTwoToneIcon />},
          {title: 'One-Time Task Types',link: '/goals/single_task/types',icon: <TableChartTwoToneIcon />},
          {title: 'One-Time Tasks',link: '/goals/single_task',icon: <AssignmentIcon />},
          {title: 'Tasks',link: '/goals/task',icon: <AddTaskIcon />},
          {title: 'Tasks Progress',link: '/goals/task_progress',icon: <ChecklistIcon />},
        ],
      },
      personalImprovment: {
        title: 'Personal Improvment',
        showSubHeader: true,
        children: [
          {title: 'Question',link: '/improvment/question',icon: <TableChartTwoToneIcon />},
          {title: 'Idea',link: '/improvment/idea',icon: <TableChartTwoToneIcon />},
          {title: 'Idea Types',link: '/improvment/idea/status',icon: <TableChartTwoToneIcon />},
        ],
      },
      accounts: {
        title: 'Accounts',
        showSubHeader: true,
        children: [
          {title: 'User Profile',link: '/management/profile/details',icon: <AccountCircleTwoToneIcon />},
          {title: 'Account Settings',link: '/management/profile/settings',icon: <DisplaySettingsTwoToneIcon />},
        ],
      },
      components: {
        title: 'Components',
        showSubHeader: true,
        children: [
          {title: 'Buttons',link: '/components/buttons',icon: <BallotTwoToneIcon />},
          {title: 'Modals',link: '/components/modals',icon: <BeachAccessTwoToneIcon />,},
          {title: 'Accordions',link: '/components/accordions',icon: <EmojiEventsTwoToneIcon />,},
          {title: 'Tabs',link: '/components/tabs',icon: <FilterVintageTwoToneIcon />},
          {title: 'Badges',link: '/components/badges',icon: <HowToVoteTwoToneIcon />},
          {title: 'Tooltips',link: '/components/tooltips',icon: <LocalPharmacyTwoToneIcon />},
          {title: 'Avatars',link: '/components/avatars',icon: <RedeemTwoToneIcon />,},
          {title: 'Cards',link: '/components/cards',icon: <SettingsTwoToneIcon />},
          {title: 'Forms',link: '/components/forms',icon: <TrafficTwoToneIcon />},
        ],
      },
      extraPages: {
        title: 'Extra Pages',
        showSubHeader: true,
        children: [
          {title: 'Error 404',link: '/status/404',icon: <CheckBoxTwoToneIcon />},
          {title: 'Error 500',link: '/status/500',icon: <CameraFrontTwoToneIcon />},
          {title: 'Coming Soon',link: '/status/coming-soon',icon: <ChromeReaderModeTwoToneIcon />},
          {title: 'Maintenance',link: '/status/maintenance',icon: <WorkspacePremiumTwoToneIcon />}
        ],
      }
};

export default slideBarItems;