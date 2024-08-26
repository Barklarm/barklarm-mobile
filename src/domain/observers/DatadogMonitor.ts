import { State } from '@/src/types/State';
import { Observer } from '@/src/types/Observer';
import { DetadogMonitorConfiguration } from '@/src/types/DetadogMonitorConfiguration';
import { Status } from '@/src/types/Status';

export class DatadogMonitor implements Observer {
  private readonly alias: string;
  private readonly site: string;
  private readonly apiKey: string;
  private readonly appKey: string;
  private readonly monitorId: number;

  private readonly overalStateMap: any = {
    [4]: Status.SUCCESS,
    [0]: Status.FAILURE,
    [7]: Status.FAILURE,
    [1]: Status.NA,
    [3]: Status.NA,
    [5]: Status.NA,
    [6]: Status.NA,
  };
  constructor({ alias, site, apiKey, appKey, monitorId }: DetadogMonitorConfiguration) {
    this.alias = alias || `Datadog: ${monitorId}`;
    this.site = site;
    this.monitorId = monitorId;
    this.apiKey = apiKey;
    this.appKey = appKey;
  }
  public async getState(): Promise<State> {
    const link = `https://app.${this.site}/monitors/${this.monitorId}`;
    const url = `https://api.${this.site}/api/v1/monitor/${this.monitorId}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: `application/json`,
          'DD-API-KEY': `${this.apiKey}`,
          'DD-APPLICATION-KEY:': `${this.appKey}`,
        },
      });
      if (!response.ok) throw new Error('response is invalid');
      const body = await response.json();
      return {
        name: this.alias,
        status: this.overalStateMap[body.overallState],
        link,
      };
    } catch (error) {
      console.error(error);
      return {
        name: this.alias,
        status: Status.NA,
        link,
      };
    }
  }
}
