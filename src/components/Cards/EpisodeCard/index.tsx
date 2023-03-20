import { useState } from "react";
import classNames from "classnames";
import { graphql, useFragment, FragmentType } from "../../../gql";
import Link from "next/link";

const EPISODE_CARD_FRAGMENT = graphql(/* GraphQL */ `
  fragment EpisodeCard_CardFragment on Episode {
    id
    name
    air_date
    episode
  }
`);

type EpisodeCardProps = {
  cardData: FragmentType<typeof EPISODE_CARD_FRAGMENT>;
};

const Card = ({ cardData, ...rest }: EpisodeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { id, name, air_date: airDate, episode } = useFragment(EPISODE_CARD_FRAGMENT, cardData);

  return (
    <Link href={`/episodes/episode/${id}`}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='m-8 overflow-hidden border-[2px] border-[#bfd84d] rounded-md drop-shadow-[0px_0px_17px_#12b0c9]'
        {...rest}
      >
        <div className='h-full flex flex-col'>
          <div className='w-[350px] min-h-[200px] relative p-3 flex flex-col justify-center gap-5 items-center text-center bg-white cursor-pointer'>
            <div className='mx-4 flex font-mali font-medium text-2xl select-none'>{name}</div>
            <div
              className={classNames(
                "mx-4 font-mali text-xl opacity-100 transition-[opacity] ease-in delay-150 select-none",
                {
                  "opacity-0 absolute invisible": !isHovered,
                }
              )}
            >
              {airDate}
            </div>
            <div className='mx-4 flex font-mali text-xl select-none'>{episode}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
