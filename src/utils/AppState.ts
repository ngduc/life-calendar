import { atom } from "recoil";

export const appState = atom({
  key: "appState",
  default: {
    options: {
        highlightYears: true,
        showEveryYears: 5
    },
    events: []
  }
});