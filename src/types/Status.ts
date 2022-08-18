export enum Status {
  SUCCESS,
  FAILURE,
  CHECKING,
  NA,
}

export namespace Status {
  export function toString(dir: Status): string {
      return Status[dir];
  }
}