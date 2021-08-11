import axios from 'axios';
import { NotificationTypeModel } from '@/models/notificationTypeModel';
import { ProductionCategoryModel } from '@/models/production-category.model';

const memoize = <T>(fn: () => Promise<T>): () => Promise<T> => {
  let result: T | null = null;

  return () => {
    return new Promise((resolve) => {
      if (result) {
        resolve(result)
      } else {
        fn().then((result) => {
          resolve(result);
        })
      }
    });
  };
};

class ApiService {
  private getNotificationTypes = memoize(async () => {
    return (await axios.get<NotificationTypeModel[]>('https://e-tag.pro/testjob/cases.json')).data;
  });

  private getProductionCategories = memoize(async () => {
    return (await axios.get<ProductionCategoryModel[]>('https://e-tag.pro/testjob/list.json')).data;
  });

  public async getNotificationType(id: number) {
    const types = await this.getNotificationTypes();
    return types.find((type) => type.id === id);
  }

  public async getProductionCategory(id: number) {
    const categories = await this.getProductionCategories();
    return categories.find((category) => category.id === id);
  }
}

export const api = new ApiService();
