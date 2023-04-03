import { useContext } from "react";
import { NextPageContext } from "next";
import AudioModal from "../components/Modals/AudioModal";
import AudioSwitch from "../components/AudioSwitch";
import TextButton from "../components/TextButton";
import { AudioReactContext } from "../contexts";
import routes from "../constants/routes";
import playWelcomeSound from "../helpers/playWelcomeSound";
import playSciFiSound from "../helpers/playSciFiSound";

interface WelcomePageProps {
  openAudioModal?: boolean;
}

const WelcomePage = ({ openAudioModal }: WelcomePageProps) => {
  const { isAudioEnabled, setIsAudioEnabled } = useContext(AudioReactContext);

  const handleSoundOnTextButtonClick = () => isAudioEnabled && playSciFiSound();

  return (
    <>
      <div className='w-full min-h-full flex flex-col items-center bg-main-page bg-cover bg-no-repeat bg-right md:bg-center shadow-[0_2px_50px_-10px_#bfd84d_inset]'>
        <h1
          className='mt-24 lg:mt-16 2xl:mt-10 mx-10 font-gochi text-[70px] md:text-[85px] lg:text-[120px] xl:text-[150px] 2xl:text-[165px] text-center tracking-widest md:leading-[1.15] 2xl:leading-[1] md:backdrop-blur-md text-[#12b0c9] drop-shadow-[-4px_0px_4px_#bfd84d] md:drop-shadow-[-5px_0px_4px_#bfd84d] lg:drop-shadow-[-6px_0px_4px_#bfd84d] 2xl:drop-shadow-[-7px_0px_4px_#bfd84d] [text-shadow:#423500_3px_0_2px] md:[text-shadow:#423500_4px_0_3px] lg:[text-shadow:#423500_5px_0_4px] 2xl:[text-shadow:#423500_6px_0_5px] select-none'
          draggable={false}
        >
          Rick and Morty
        </h1>
        <div className='mt-10 lg:mt-2 xl:mt-10 2xl:mt-16 xl:pl-80 flex flex-col xl:flex-row gap-x-16'>
          <TextButton
            label='Characters'
            linkHref={routes.getCharactersRoute()}
            onClick={handleSoundOnTextButtonClick}
            className={"w-60 h-10 lg:h-16 mb-10 text-xl font-medium"}
          />
          <TextButton
            label='Episodes'
            linkHref={routes.getEpisodesRoute()}
            onClick={handleSoundOnTextButtonClick}
            className={"w-60 h-10 lg:h-16 mb-5 text-xl font-medium"}
          />
        </div>
      </div>
      <div></div>
      <AudioSwitch isAudioEnabled={isAudioEnabled} setIsAudioEnabled={setIsAudioEnabled} />
      {openAudioModal && <AudioModal onChoiceFunction={playWelcomeSound} />}
    </>
  );
};

export default WelcomePage;

export async function getServerSideProps(context: NextPageContext) {
  const audioModalString = context.query.audioModal || null;
  const audioModalBoolean = audioModalString === null ? true : false;
  return {
    props: { openAudioModal: audioModalBoolean },
  };
}
