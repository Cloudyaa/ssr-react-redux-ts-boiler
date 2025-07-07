import type { RootState } from '@/store';

declare global {
  interface Window {
    __PRELOADED_STATE__?: RootState;
  }
}

export {};
