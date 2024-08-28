import React from 'react';
import { MapType } from '@/src/types/MapType';
import { GithubAction } from '@/src/extensions/github/component';
import { CCTray } from '@/src/extensions/cctray/component';
import { DatadogMonitor } from '@/src/extensions/datadog/component';
import { Sentry } from '@/src/extensions/sentry/component';
import { NewRelic } from '@/src/extensions/newRelic/component';
import { AzureDevOps } from '@/src/extensions/azureDevOps/component';
import { Bitbucket } from '@/src/extensions/bitbucket/component';
import { Opsgenie } from '@/src/extensions/opsgenie/component';

export const observersComponentBuilderMap: MapType<
  (observable: any, index: number, updateFieldWithValue: any) => JSX.Element
> = {
  githubAction: (observable: any, index: number, updateFieldWithValue: any) => (
    <GithubAction observable={observable} index={index} updateFieldWithValue={updateFieldWithValue} />
  ),
  ccTray: (observable: any, index: number, updateFieldWithValue: any) => (
    <CCTray observable={observable} index={index} updateFieldWithValue={updateFieldWithValue} />
  ),
  datadogMonitor: (observable: any, index: number, updateFieldWithValue: any) => (
    <DatadogMonitor observable={observable} index={index} updateFieldWithValue={updateFieldWithValue} />
  ),
  sentry: (observable: any, index: number, updateFieldWithValue: any) => (
    <Sentry observable={observable} index={index} updateFieldWithValue={updateFieldWithValue} />
  ),
  newRelic: (observable: any, index: number, updateFieldWithValue: any) => (
    <NewRelic observable={observable} index={index} updateFieldWithValue={updateFieldWithValue} />
  ),
  azureDevOps: (observable: any, index: number, updateFieldWithValue: any) => (
    <AzureDevOps observable={observable} index={index} updateFieldWithValue={updateFieldWithValue} />
  ),
  opsgenie: (observable: any, index: number, updateFieldWithValue: any) => (
    <Opsgenie observable={observable} index={index} updateFieldWithValue={updateFieldWithValue} />
  ),
  bitbucket: (observable: any, index: number, updateFieldWithValue: any) => (
    <Bitbucket observable={observable} index={index} updateFieldWithValue={updateFieldWithValue} />
  ),
};
