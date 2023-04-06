import { graphql, useFragment, FragmentType } from "../../../gql";
import { useContext } from "react";
import Link from "next/link";
import { AudioReactContext } from "../../../contexts";
import routes from "../../../constants/routes";
import playGameClickSound from "../../../helpers/playGameClickSound";

const lifeStatusImages = {
  alive: "/alive.png",
  dead: "/dead.png",
  unknown: "/unknown.png",
};

export const CHARACTER_CARD_FRAGMENT = graphql(/* GraphQL */ `
  fragment CharacterCard_CardFragment on Character {
    id
    image
    name
    status
  }
`);

export type CharacterCardProps = {
  cardData: FragmentType<typeof CHARACTER_CARD_FRAGMENT>;
};

const isStatus = (status?: string | null): status is keyof typeof lifeStatusImages => {
  return status === "alive" || status === "dead" || status === "unknown";
};

const CharacterCard = ({ cardData, ...rest }: CharacterCardProps) => {
  const { id, image, name, status: baseStatus } = useFragment(CHARACTER_CARD_FRAGMENT, cardData);
  const { isAudioEnabled } = useContext(AudioReactContext);

  const status = baseStatus?.toLowerCase();

  const handleOnCardClickSound = () => isAudioEnabled && playGameClickSound();

  if (!isStatus(status)) return null;
  return (
    <div
      className='m-8 overflow-hidden border-[2px] border-[#bfd84d] rounded-md drop-shadow-[0px_0px_17px_#12b0c9] hover:scale-105 duration-300'
      onClick={handleOnCardClickSound}
      {...rest}
    >
      <Link href={routes.getCharacterRoute(id)} className='h-full relative flex flex-col text-black'>
        {image && <img src={image} width={300} height={300} alt='Character image' />}
        <div className='h-full'>
          <div className='max-w-[300px] h-full p-2 flex justify-between items-center bg-white cursor-pointer'>
            <div className='ml-2 flex font-mali text-2xl select-none'>{name}</div>
            <img
              src={lifeStatusImages[status]}
              width={50}
              height={50}
              alt='Life Status Img missing'
              title={`Life status ${status}`}
              className='m-2 ml-4 cursor-help'
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;
