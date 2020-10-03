import { atom } from 'recoil';

export const appState = atom({
  key: 'appState',
  default: {
    options: {
      highlightYears: false,
      showEveryYears: 5,
      oneRowOneYear: false
    },
    events: []
  }
});
