export const cache = new Map<string, any>();

const FRESH_TIME = 5000;
const STALE_TIME = 5000;
const TOTAL_CACHE_TIME = FRESH_TIME + STALE_TIME;

export const fetchAndCache = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
};

export const fetchWithCache = async (url: string) => {
  const now = Date.now();
  const cached = cache.get(url);

  if (!cached) {
    return fetchAndCache(url);
  }

  const gap = now - cached.timestamp;

  if (gap < FRESH_TIME) {
    return cached.data;
  }

  if (gap < TOTAL_CACHE_TIME) {
    return new Promise((resolve) => {
      resolve(cached.data);
    }).then(() => {
      fetchAndCache(url);
    });
  } else {
    return fetchAndCache(url);
  }
};
