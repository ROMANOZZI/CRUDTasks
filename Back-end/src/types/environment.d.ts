export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT_NUMBER: number;
      MONGO_DB_URL: string | undefined;
      COLLECTION_NAME: string | undefined;
    }
  }
}
