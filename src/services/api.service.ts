import axios from 'axios';
import { NotificationTypeModel } from '@/models/notificationTypeModel';
import { ProductionCategoryModel } from '@/models/production-category.model';
import { memoize } from '@/utils/memoize';

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
      throw new Error('Notification type not found!');
    }

    return res;
  }

  public async getProductionCategory(id: number): Promise<ProductionCategoryModel> {
    const categories = await this.getProductionCategories();
    const res = categories.find((category) => category.id === id);

    if (!res) {
      throw new Error('Production category not found!');
    }

    return res;
  }
}

export const api = new ApiService();
