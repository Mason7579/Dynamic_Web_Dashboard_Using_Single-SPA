export function getApiUrl(): string {
  if (import.meta.env.MODE === 'production') {
    return import.meta.env.VITE_API_URL_PROD;
  } else {
    return import.meta.env.VITE_API_URL_DEV;
  }
}
