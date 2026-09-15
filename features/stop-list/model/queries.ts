// Ключи кэша и опции для запросов
export const QUERY_KEYS = {
  menuItems: ['menuItems'] as const,
};

export const DEFAULT_QUERY_OPTIONS = {
  staleTime: 1000 * 60,
};
