import Link from "next/link";
import { useContext } from "react";
import routes from "../../constants/routes";
import { AudioReactContext } from "../../contexts";
import playEverybodyOutSound from "../../helpers/playEverybodyOutSound";

export default function Logo() {
  const { isAudioEnabled } = useContext(AudioReactContext);

  const handleOnLogoClickSound = () => isAudioEnabled && playEverybodyOutSound();

  return (
    <Link
      href={{ pathname: routes.getHomeRoute(), query: { audioModal: false } }}
      onClick={handleOnLogoClickSound}
      className='hover:skew-x-6 hover:-skew-y-6 duration-200'
    >
      <img
        className='w-[200px] h-[200px] md:w-[240px] md:h-[240px] xl:w-[300px] xl:h-[300px] max-md:ml-0 ml-8 pointer-events-none select-none'
        src='logo.png'
        alt="Rick'n'Morty Logo"
        draggable={false}
      />
    </Link>
  );
}
