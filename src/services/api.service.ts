import axios from 'axios';
import { NotificationTypeModel } from '@/models/notification-type.model';
import { ProductionCategoryModel } from '@/models/production-category.model';
import { memoize } from '@/utils/memoize';
import { NotificationModel } from '@/models/notification.model';
import { getDefaultNotifications } from '@/services/get-default-data';
import { useLocalstorage } from '@/utils/localstorage';
import { pluralize } from '@/utils/pluralize';

const enum LOCALSTORAGE_KEYS { NOTIFICATIONS = 'notifications' };

class ApiService {
  public getNotificationTypes: () => Promise<NotificationTypeModel[]> = memoize(async () => {
    return (await axios.get<NotificationTypeModel[]>('cases.json')).data;
  });

  private getProductionCategories: () => Promise<ProductionCategoryModel[]> = memoize(async () => {
    return (await axios.get<ProductionCategoryModel[]>('list.json')).data;
  });

  public async getNotificationType(id: number): Promise<NotificationTypeModel> {
    const types = await this.getNotificationTypes();
    const res = types.find((type) => type.id === id);

    if (!res) {
      throw new Error(`Notification type ${ id } not found!`);
    }

    return res;
  }

  public async getProductionCategory(id: number): Promise<ProductionCategoryModel> {
    const categories = await this.getProductionCategories();
    const res = categories.find((category) => category.id === id);

    if (!res) {
      throw new Error(`Production category ${ id } not found!`);
    }

    return res;
  }

  public getNotifications(): Promise<NotificationModel[]> {
    return new Promise((res, rej) => {
      const [dataGetter] = useLocalstorage<NotificationModel[]>(LOCALSTORAGE_KEYS.NOTIFICATIONS, getDefaultNotifications());
      setTimeout(() => {
        res(dataGetter());
      }, 1000)
    });
  }

  public readOrSetUnread(id: string, unread: boolean): Promise<NotificationModel> {
    return new Promise((res, rej) => {
      const [dataGetter, setData] = useLocalstorage<NotificationModel[]>(LOCALSTORAGE_KEYS.NOTIFICATIONS, getDefaultNotifications());
      const data = dataGetter();
      const notificationIndex = data.findIndex((notification) => notification.id === id);

      if (notificationIndex === -1) {
        throw new Error(`Notification with id ${ id } not found`);
      }

      data[notificationIndex].unread = unread;

      setData(data);
      res(data[notificationIndex]);
    });
  }
}

export const api = new ApiService();
