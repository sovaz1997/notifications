import { NotificationModel } from '@/models/notification.model';

export const getDefaultNotifications = (): NotificationModel[] => {
  return [
    {
      id: '2523',
      productionCategory: 39129,
      type: 1,
      unread: true,
    },
    {
      id: '2365',
      productionCategory: 53231,
      type: 2,
      unread: true,
    },
    {
      id: '2523',
      productionCategory: 48201,
      type: 3,
      unread: true,
    },
    {
      id: '2523',
      productionCategory: 31791,
      type: 4,
      unread: false,
    },
    {
      id: '2523',
      productionCategory: 47036,
      type: 2,
      unread: false,
    },
    {
      id: '2523',
      productionCategory: 11231,
      type: 3,
      unread: false,
    },
    {
      id: '2523',
      productionCategory: 31791,
      type: 1,
      unread: false,
    },
  ];
}
