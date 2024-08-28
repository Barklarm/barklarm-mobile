import { ObserverConfiguration } from '@/src/types/ObserverConfiguration';

export type AzureDevOpsConfiguration = ObserverConfiguration & {
  authToken: string;
  orgUrl: string;
  project: string;
  pipelineId: number;
};
