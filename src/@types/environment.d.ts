declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REGION: string;
      USERPOOLID: string;
      IDENTITYPOOLID: string;
      USERPOOLWEBCLIENTID: string;
    }
  }
}

export {};
