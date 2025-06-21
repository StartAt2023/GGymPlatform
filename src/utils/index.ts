// 工具函数
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(amount);
}; 