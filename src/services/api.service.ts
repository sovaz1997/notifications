import axios from 'axios';
import { NotificationTypeModel } from '@/models/notification-type.model';
import { ProductionCategoryModel } from '@/models/production-category.model';
import { memoize } from '@/utils/memoize';
import { NotificationModel } from '@/models/notification.model';
import { getDefaultNotifications } from '@/services/get-default-data';

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

  public async getProductions(): Promise<NotificationModel[]> {
    return new Promise((res, rej) => {
      res(getDefaultNotifications());
    });
  }
}

export const api = new ApiService();
