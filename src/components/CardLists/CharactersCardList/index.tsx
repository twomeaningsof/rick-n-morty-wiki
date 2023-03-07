import { graphql, useFragment, FragmentType } from "../../../gql";
import CharacterCard from "../../Cards/CharacterCard";

const CHARACTERS_CARD_LIST_QUERY_FRAGMENT = graphql(/* GraphQL */ `
  fragment CharactersCardList_QueryFragment on Characters {
    results {
      id
      ...CharacterCard_CardFragment
    }
  }
`);

type CharacterCardListProps = {
  cardListData: FragmentType<typeof CHARACTERS_CARD_LIST_QUERY_FRAGMENT>;
};

const CharacterCardList = (props: CharacterCardListProps) => {
  const query = useFragment(CHARACTERS_CARD_LIST_QUERY_FRAGMENT, props.cardListData);

  return (
    <div className='flex flex-wrap justify-around'>
      {query?.results?.map((cardData, index: number) => {
        if (!cardData) return null;
        return <CharacterCard cardData={cardData} key={index} />;
      })}
    </div>
  );
};

export default CharacterCardList;
