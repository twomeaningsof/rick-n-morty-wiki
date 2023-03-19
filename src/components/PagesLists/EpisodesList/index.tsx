import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import Loading from "../../DataState/Loading";
import Error from "../../DataState/Error";
import { FragmentType, graphql, useFragment } from "../../../gql";
import { ApolloError, ApolloQueryResult } from "@apollo/client";
import { GetCharacters_QueryQuery } from "../../../gql/graphql";
import EpisodeCard from "../../Cards/EpisodeCard";

const EPISODES_LIST_QUERY_FRAGMENT = graphql(/* GraphQL */ `
  fragment EpisodesList_QueryFragment on Episodes {
    info {
      next
    }
    results {
      id
      ...EpisodeCard_CardFragment
    }
  }
`);

interface EpisodesListProps {
  episodesListData?: FragmentType<typeof EPISODES_LIST_QUERY_FRAGMENT> | null;
  loading: boolean;
  error?: ApolloError;
  handleFetchMore: () => Promise<ApolloQueryResult<GetCharacters_QueryQuery>>;
}

export default function EpisodesList({ episodesListData, loading, error, handleFetchMore }: EpisodesListProps) {
  const fragmentData = useFragment(EPISODES_LIST_QUERY_FRAGMENT, episodesListData);
  const dataLength = fragmentData?.results?.length || 0;
  const hasMore = fragmentData?.info?.next !== null;

  if (loading) return <Loading className='mt-16' />;

  if (error && !episodesListData) return <Error message={error.message} className='mt-16'></Error>;

  if (!episodesListData) return null;

  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={handleFetchMore}
      hasMore={hasMore}
      loader={
        <div className='w-full flex justify-center font-mali'>
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            colors={["#bfd84d", "#9db33c", "#429EA6", "#12b0c9", "#51E5FF"]}
          />
        </div>
      }
      endMessage={
        dataLength === 0 ? (
          <p className='flex justify-center mt-20 mb-10 font-mali text-white text-center text-4xl font-medium select-none'>
            Sorry, there is no match.
          </p>
        ) : (
          <p className='flex justify-center mt-4 mb-10 font-mali text-white text-center text-4xl font-medium select-none'>
            Yay! You have seen it all.
          </p>
        )
      }
    >
      <div className='flex flex-wrap justify-around'>
        {fragmentData &&
          fragmentData?.results?.map((cardData, index: number) => {
            if (!cardData) return null;
            return <EpisodeCard cardData={cardData} key={index} />;
          })}
      </div>
    </InfiniteScroll>
  );
}
