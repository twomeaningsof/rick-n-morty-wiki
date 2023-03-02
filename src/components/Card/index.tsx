import { graphql, useFragment, FragmentType } from "../../gql";
import Image from "next/image";
import aliveIcon from "../../../public/alive.png";
import deadIcon from "../../../public/dead.png";
import unknownIcon from "../../../public/unknown.png";

const lifeStatusImages = {
  alive: aliveIcon,
  dead: deadIcon,
  unknown: unknownIcon,
};

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
    <div
      className='m-8 overflow-hidden border border-[2px] border-[#bfd84d] rounded-md drop-shadow-2xl drop-shadow-[0px_0px_17px_#12b0c9]'
      {...rest}
    >
      <div className='h-full relative flex flex-col'>
        {image && <Image src={image} width={300} height={300} alt='Character image' />}
        <div className='max-w-[300px] h-full p-2 flex justify-between items-center bg-white cursor-pointer'>
          <div className='ml-2 flex font-mali text-2xl select-none'>{name}</div>
          <Image
            src={lifeStatusImages[status]}
            width={50}
            height={50}
            alt='Life Status Img missing'
            title={`Life status ${status}`}
            className='m-2 ml-4 cursor-help'
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
