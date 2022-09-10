declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REGION: string;
      USERPOOLID: string;
      IDENTITYPOOLID: string;
      USERPOOLWEBCLIENTID: string;
      API_BASE_URL: string;
    }
  }
}

export {};
