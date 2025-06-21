// 应用常量
export const APP_NAME = 'GGym Platform';
export const APP_VERSION = '1.0.0';

// API 端点
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// 用户角色
export const USER_ROLES = {
  ADMIN: 'admin',
  TRAINER: 'trainer',
  MEMBER: 'member'
} as const; 