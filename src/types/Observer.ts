import { State } from '@/src/types/State';

export interface Observer {
  getState(): Promise<State>;
}
