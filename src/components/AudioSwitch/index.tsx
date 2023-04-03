import playSwitchSound from "../../helpers/playSwitchSound";

interface AudioSwitchProps {
  isAudioEnabled: boolean;
  setIsAudioEnabled: (state: boolean) => void;
}

export default function AudioSwitch({ isAudioEnabled, setIsAudioEnabled }: AudioSwitchProps) {
  const handleSwitchClick = () => {
    setIsAudioEnabled(!isAudioEnabled);
    playSwitchSound();
  };

  return (
    <>
      {isAudioEnabled ? (
        <img
          src='/sound-on.svg'
          alt='sound-on-image'
          onClick={handleSwitchClick}
          className='w-8 md:w-9 absolute top-0 right-0 mx-3 lg:mx-8 my-3 lg:my-5 hover:scale-105 duration-200 cursor-pointer'
        />
      ) : (
        <img
          src='/sound-off.svg'
          alt='sound-off-image'
          onClick={handleSwitchClick}
          className='w-8 md:w-9 absolute top-0 right-0 mx-3 lg:mx-8 my-3 lg:my-5 hover:scale-105 duration-200 cursor-pointer'
        />
      )}
    </>
  );
}
