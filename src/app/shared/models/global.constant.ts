import { NavLinks } from '../models/navlinks.model';

export const ROUTE_ID = {
    'video': 1,
    'live-chat': 2,
    'queue': 3,
}


export const USER_PAGES = [1,2];
export const ADMIN_PAGES = [1,3];

export const MENU_LIST: NavLinks[] = [
    {
      name: 'Video',
      route: '/video',
      icon: 'icon-channel',
      id: 1
    }
  ];