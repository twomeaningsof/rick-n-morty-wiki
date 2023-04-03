import { createContext } from "react";

export type AudioReactContextType = {
  isAudioEnabled: boolean;
  setIsAudioEnabled: (state: boolean) => void;
};

export const AudioReactContext = createContext<AudioReactContextType>({
  isAudioEnabled: false,
  setIsAudioEnabled: (state: boolean) => {}, // eslint-disable-line
});
