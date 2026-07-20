/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    runtime?: {
      env: {
        SUPABASE_URL: string;
        SUPABASE_ANON_KEY: string;
        [key: string]: any;
      };
      ctx: {
        waitUntil(promise: Promise<any>): void;
        passThroughOnException(): void;
      };
      caches: CacheStorage & { default: Cache };
    };
  }
}
