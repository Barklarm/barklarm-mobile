export const mutations = (observables: any[], setObservables: any) => ({
  addObserver: (observer: any): void => {
    setObservables([...observables, observer]);
  },
  removeObserver: (index: number): void => {
    setObservables(observables.filter((_: any, currentIndex: number) => currentIndex != index));
  },
  updateObserver: (fieldName: string, index: number, value: any): void => {
    setObservables(
      observables.map((observable: any, currentIndex: number) =>
        currentIndex != index ? observable : { ...observable, [fieldName]: value }
      )
    );
  }
});
