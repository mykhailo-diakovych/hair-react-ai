/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEEPAR_LICENSE_KEY: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_PUBLIC_API: string;
  readonly VITE_PRIVATE_API: string;
  readonly VITE_ACCOUNTS_API: string;
  readonly VITE_BASE_HOST: string;

  readonly VITE_ACCURACY_DEVIATION: number;
  readonly VITE_CFG_SCALE_MIN: number;
  readonly VITE_CFG_SCALE_MAX: number;
  readonly VITE_DENOISING_STRENGTH_MIN: number;
  readonly VITE_DENOISING_STRENGTH_MAX: number;
  readonly VITE_STEPS_MIN: number;
  readonly VITE_STEPS_MAX: number;
  readonly VITE_MODE: string;
  readonly VITE_PAYMENT_PLAN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
