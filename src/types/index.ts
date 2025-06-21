// 全局类型定义
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'trainer' | 'member';
}

export interface Gym {
  id: string;
  name: string;
  address: string;
  phone: string;
} 