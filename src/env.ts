export const ENVIRONMENT = {
    mode: import.meta.env.MODE,
    isProduction: import.meta.env.PROD,
    buildTime: new Date().toISOString(),
  };