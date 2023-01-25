import { graphql, useFragment, FragmentType } from "../../gql";
import Card from "../Card";

const CARD_LIST_QUERY_FRAGMENT = graphql(/* GraphQL */ `
  fragment CardList_QueryFragment on Query {
    characters {
      results {
        id
        ...Card_CardFragment
      }
    }
  }
`);
type CardListProps = {
  cardListData: FragmentType<typeof CARD_LIST_QUERY_FRAGMENT>;
};

const CardList = (props: CardListProps) => {
  const query = useFragment(CARD_LIST_QUERY_FRAGMENT, props.cardListData);

  return (
    <div className='flex flex-wrap justify-around'>
      {query?.characters?.results?.map((cardData, index: number) => {
        if (!cardData) return null;
        return <Card cardData={cardData} key={index} />;
      })}
    </div>
  );
};

export default CardList;
