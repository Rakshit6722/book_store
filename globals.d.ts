
declare global {
    interface ImportMetaEnv {
      VITE_BASE_URL: string;
    }
  
    interface ImportMeta {
      env: ImportMetaEnv;
    }
  }
  
  export {};
  