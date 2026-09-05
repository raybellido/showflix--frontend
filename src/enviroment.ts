const isLocalDev =
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const environment = {
  apiUrl: 'http://localhost:8080/api/v1',
  isLocalDev,
  mockApi: !isLocalDev,
};