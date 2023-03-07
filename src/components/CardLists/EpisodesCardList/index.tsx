import { graphql, useFragment, FragmentType } from "../../../gql";
import EpisodeCard from "../../Cards/EpisodeCard";

const EPISODES_CARD_LIST_QUERY_FRAGMENT = graphql(/* GraphQL */ `
  fragment EpisodesCardList_QueryFragment on Episodes {
    results {
      id
      ...EpisodesCard_CardFragment
    }
  }
`);

type EpisodesCardListProps = {
  cardListData: FragmentType<typeof EPISODES_CARD_LIST_QUERY_FRAGMENT>;
};

const CardList = (props: EpisodesCardListProps) => {
  const query = useFragment(EPISODES_CARD_LIST_QUERY_FRAGMENT, props.cardListData);

  return (
    <div className='flex flex-wrap justify-around'>
      {query?.results?.map((cardData, index: number) => {
        if (!cardData) return null;
        return <EpisodeCard cardData={cardData} key={index} />;
      })}
    </div>
  );
};

export default CardList;
