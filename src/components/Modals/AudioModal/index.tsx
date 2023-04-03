import { useContext, useState } from "react";
import { AudioReactContext } from "../../../contexts";
import TextButton from "../../TextButton";

interface AudioModalProps {
  onChoiceFunction: () => void;
}

export default function AudioModal({ onChoiceFunction }: AudioModalProps) {
  const [toggle, setToggle] = useState(true);
  const audio = useContext(AudioReactContext);

  const handleEnableAudioClick = () => {
    audio.setIsAudioEnabled(true);
    setToggle(false);
    onChoiceFunction?.();
  };

  const handleDisableAudioClick = () => {
    audio.setIsAudioEnabled(false);
    setToggle(false);
    onChoiceFunction?.();
  };

  return toggle ? (
    <div className='pt-20 px-5 sm:px-24 md:px-36 md:pb-56 lg:px-60 absolute inset-0 flex flex-col md:justify-center items-center bg-constellation'>
      <h1 className='font-gochi text-[40px] lg:text-[70px] text-center tracking-widest text-[#12b0c9] drop-shadow-[-2px_0px_2px_#bfd84d] lg:drop-shadow-[-2px_0px_3px_#bfd84d] select-none'>
        Do you want audio effects to be enabled?
      </h1>
      <div className='mt-5 md:mt-10 flex gap-8 md:gap-14 lg:gap-24'>
        <TextButton label='Yes' onClick={handleEnableAudioClick} className='w-20 md:w-32' />
        <TextButton label='No' onClick={handleDisableAudioClick} className='w-20 md:w-32' />
      </div>
    </div>
  ) : null;
}
