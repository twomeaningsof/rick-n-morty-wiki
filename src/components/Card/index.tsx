import Image from "next/image";
import aliveIcon from "../../../public/alive.png";
import deadIcon from "../../../public/dead.png";
import unknownIcon from "../../../public/unknown.png";

const lifeStatusImages = {
  alive: aliveIcon,
  dead: deadIcon,
  unknown: unknownIcon,
};

import { graphql, useFragment, FragmentType } from "../../gql";

const CARD_FRAGMENT = graphql(/* GraphQL */ `
  fragment Card_CardFragment on Character {
    image
    name
    status
  }
`);

type CardProps = {
  cardData: FragmentType<typeof CARD_FRAGMENT>;
};

const isStatus = (status?: string | null): status is keyof typeof lifeStatusImages => {
  return status === "alive" || status === "dead" || status === "unknown";
};

const Card = ({ cardData, ...rest }: CardProps) => {
  const { image, name, status: baseStatus } = useFragment(CARD_FRAGMENT, cardData);

  const status = baseStatus?.toLowerCase();

  if (!isStatus(status)) return null;

  return (
    <div className='m-8 border border border-black rounded-md drop-shadow-2xl overflow-hidden' {...rest}>
      <div className='h-full relative flex flex-col'>
        {image && <Image src={image} width={300} height={300} alt='Character image' />}
        <div className='max-w-[300px] h-full flex justify-between items-center bg-white p-2'>
          <div className='ml-2 flex font-mali text-2xl'>{name}</div>
          <Image
            src={lifeStatusImages[status]}
            width={50}
            height={50}
            alt='Life Status Img missing'
            className='h-[50px] m-2 ml-4'
            title={`Life status ${status}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
