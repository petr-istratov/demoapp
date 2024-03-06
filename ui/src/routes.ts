// pages
import Home from './pages/Home';
import Admin from './pages/Admin';
import Contracts from './pages/Contracts';
import Contract from './pages/Contract';
import Jobs from './pages/Jobs';
import Deposit from './pages/Deposit';

// other
import { FC } from "react";

// interface
interface Route {
  key: string,
  title: string,
  path: string,
  enabled: boolean,
  component: FC<{}>
}

export const routes: Array<Route> = [
  {
    key: 'home-route',
    title: 'Auth',
    path: '/',
    enabled: true,
    component: Home,
  },
  {
    key: 'admin-route',
    title: 'Admin Stats',
    path: '/admin',
    enabled: true,
    component: Admin,
  },
  {
    key: 'contracts-route',
    title: 'Contracts',
    path: '/contracts',
    enabled: true,
    component: Contracts,
  },
  {
    key: 'contract-route',
    title: 'Contract',
    path: '/contract/:contractId',
    enabled: true,
    component: Contract,
  },
  {
    key: 'jobs-route',
    title: 'Jobs',
    path: '/jobs',
    enabled: true,
    component: Jobs,
  },
  {
    key: 'deposit-route',
    title: 'Deposit',
    path: '/deposit',
    enabled: true,
    component: Deposit,
  }
];
