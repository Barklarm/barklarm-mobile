import React from 'react';
import { MapType } from '@/src/types/MapType';
import { GithubAction } from '@/src/components/GithubAction';
import { CCTray } from '@/src/components/CCTray';
import { DatadogMonitor } from '@/src/components/DatadogMonitor';
import { Sentry } from '@/src/components/Sentry';
import { NewRelic } from '@/src/components/NewRelic';

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
};
