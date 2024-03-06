import { makeAutoObservable } from "mobx";

const appStore = () => {
  return makeAutoObservable({
    list: [] as { title: string; id: number }[],
    profileId: '' as string,
  });
};

export default appStore;
