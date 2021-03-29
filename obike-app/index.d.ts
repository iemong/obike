import * as Obniz from "obniz";

export {};

declare global {
  interface Window {
    Obniz: (id:string) => Obniz;
    onYouTubeIframeAPIReady: () => void;
  }
}
