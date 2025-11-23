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
import MilitaryTechIcon             from '@mui/icons-material/MilitaryTech';
import ShoppingBasketIcon           from '@mui/icons-material/ShoppingBasket';
import Replay30Icon from '@mui/icons-material/Replay30';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import {
  Topic,TipsAndUpdates,QuestionMark,ShoppingCartCheckout,AddShoppingCart,TakeoutDining,RamenDining,Password,LightMode,
  HourglassEmpty,Input,Filter7,CardGiftcard
} from '@mui/icons-material';


import { ReactElement } from 'react';

interface SlideBarItem {
  title: string;
  link: string;
  icon: ReactElement;
}

interface SlideBarSection {
  title: string;
  isCollapse: boolean;
  children: SlideBarItem[];
}

const slideBarItems: Record<string, SlideBarSection> = {
  overview: {
    title: 'Overview',
    isCollapse: false,
    children: [
      {title: '+Overview',link: '/overview',icon: <DesignServicesTwoToneIcon />}
    ],
  },
  moneyManagement: {
    title: 'Money Management',
    isCollapse: true,
    children: [
      {title: 'Expense',                link: '/transactions/expense',    icon: <ShoppingCartCheckout />},
      {title: 'Income',                 link: '/transactions/income',     icon: <AddShoppingCart />},
      {title: 'Loan',                   link: '/transactions/loan',       icon: <CardGiftcard />},
      {title: 'Currency',               link: '/transactions/currency',   icon: <TableChartTwoToneIcon />},
      {title: 'Category',               link:  '/transactions/category',  icon: <TableChartTwoToneIcon />},
      {title: '+Repeated Transaction',  link: '/transactions/repeat',     icon: <Replay30Icon />},
      {title: 'Currency Limitations',   link: '/transactions/currency_limit',      icon: <PriceCheckIcon />},


      // 
    ],
  },
  myDailyLife: {
    title: 'Daily Life',
    isCollapse: true,
    children: [
      {title: 'Today',link: '/personal/today',icon: <LightMode />,},
      {title: 'Activity',link: '/personal/activity',icon: <DirectionsRunIcon />},
      {title: 'Sleep',link: '/personal/sleep',icon: <BedtimeIcon />},
      {title: 'Tomorrow',link: '/personal/tomorrow',icon: <HourglassEmpty />},
    ],
  },
  lifeGoals: {
    title: 'Task Management',
    isCollapse: true,
    children: [
      {title: 'Goals',link: '/goals/goals',icon: <EmojiEventsIcon />},
      {title: 'One-Time Tasks',link: '/goals/single_task',icon: <AssignmentIcon />},
      {title: 'Tasks',link: '/goals/task',icon: <AddTaskIcon />},
      {title: 'Tasks Progress',link: '/goals/task_progress',icon: <ChecklistIcon />},
      {title: '+Weekly Plan',link: '/extra/foodplan',icon: <Filter7 />},
    ],
  },
  personalImprovment: {
    title: 'Personal Improvment',
    isCollapse: true,
    children: [
      {title: 'Idea',link: '/improvment/idea',icon: <TipsAndUpdates />},
      {title: 'Topic',link: '/improvment/topic',icon: <Topic />},
    ],
  },
  Reports: {
    title: 'Reports',
    isCollapse: true,
    children: [
      {title: 'Monthly Success',link: '/report/monthly_success',icon: <MilitaryTechIcon />,},
      {title: 'Monthly Expense',link: '/report/monthly_expense',icon: <ShoppingBasketIcon />},
    ],
  },
  secondaryPages: {
    title: 'Secondary Pages',
    isCollapse: true,
    children: [
      {title: 'Topic Type',         link: '/secondary/topic_type',      icon: <TableChartTwoToneIcon />},
      {title: 'Idea Type',         link: '/secondary/idea_type',        icon: <TableChartTwoToneIcon />},
      {title: 'One-Time Task Type', link:  '/goals/sin_task_types',    icon: <TableChartTwoToneIcon />},
      {title: '+Months Type',       link: '/goals/months',                icon: <TableChartTwoToneIcon />},
    ],
  },
  extraPages: {
    title: 'Extra Pages',
    isCollapse: true,
    children: [
        {title: 'Food Recipe',link: '/extra/foodrecipe',icon: <TakeoutDining />},
    ],
  },
  accounts: {
    title: 'Accounts',
    isCollapse: true,
    children: [
      {title: '+User Profile',link: '/profile/details',icon: <AccountCircleTwoToneIcon />},
      {title: '+Account Settings',link: '/profile/settings',icon: <DisplaySettingsTwoToneIcon />},
      {title: '+Password Settings',link: '/profile/password',icon: <Password />},
      {title: '+Log ',link: '/profile/log',icon: <Input />}
    ],
  },
  components: {
    title: 'Components',
    isCollapse: true,
    children: [
      {title: 'Cryptocurrency',link: '/components/crypto',icon: <BrightnessLowTwoToneIcon />},
      {title: 'Messenger',link: '/components/messenger',icon: <MmsTwoToneIcon />},
      {title: 'Transactions List',link: '/components/transactions',   icon: <TableChartTwoToneIcon />},
      {title: 'Buttons',link: '/components/buttons',icon: <BallotTwoToneIcon />},
      {title: 'Modals',link: '/components/modals',icon: <BeachAccessTwoToneIcon />,},
      {title: 'Accordions',link: '/components/accordions',icon: <EmojiEventsTwoToneIcon />,},
      {title: 'Tabs',link: '/components/tabs',icon: <FilterVintageTwoToneIcon />},
      {title: 'Badges',link: '/components/badges',icon: <HowToVoteTwoToneIcon />},
      {title: 'Tooltips',link: '/components/tooltips',icon: <LocalPharmacyTwoToneIcon />},
      {title: 'Avatars',link: '/components/avatars',icon: <RedeemTwoToneIcon />,},
      {title: 'Cards',link: '/components/cards',icon: <SettingsTwoToneIcon />},
      {title: 'Forms',link: '/components/forms',icon: <TrafficTwoToneIcon />},
      {title: 'Error 404',link: '/status/404',icon: <CheckBoxTwoToneIcon />},
      {title: 'Error 500',link: '/status/500',icon: <CameraFrontTwoToneIcon />},
      {title: 'Coming Soon',link: '/status/coming-soon',icon: <ChromeReaderModeTwoToneIcon />},
      {title: 'Maintenance',link: '/status/maintenance',icon: <WorkspacePremiumTwoToneIcon />}
    ],
  }
};

export default slideBarItems;