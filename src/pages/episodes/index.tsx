import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../../gql/";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import SearchInput from "../../components/SearchInput";
import EpisodesList from "../../components/PagesLists/EpisodesList";
import Logo from "../../components/Logo";
import PageHeader from "../../components/PageHeader";
import AudioSwitch from "../../components/AudioSwitch";
import { AudioReactContext } from "../../contexts";
import useDebounce from "../../hooks/useDebounce";
import getServerSideQueryParamFromContext from "../../helpers/getServerSideQueryParamFromContext";
import updateQueryParamForRouter from "../../helpers/routerQueryManipulation";

interface EpisodesPagePageProps {
  name: string | null;
}

const GET_EPISODES_QUERY = graphql(/* GraphQL */ `
  query GetEpisodes_Query($page: Int, $name: String) {
    episodes(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
      }
      results {
        id
      }
      ...EpisodesList_QueryFragment
    }
  }
`);

function useEpisodesList({ name }: EpisodesPagePageProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(name || "");
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const { data, loading, error, fetchMore } = useQuery(GET_EPISODES_QUERY, {
    variables: {
      page: 1,
      name: debouncedSearchInput,
    },
  });

  const handleSetName = async (value: string) => {
    setSearchInput(value);
    await updateQueryParamForRouter({ router, queryParamKey: "name", queryParamValue: value });
  };

  const handleFetchMore = () => {
    return fetchMore({
      variables: {
        page: data?.episodes?.info?.next,
        name: debouncedSearchInput,
      },
      updateQuery: (oldData, { fetchMoreResult }) => {
        if (!fetchMoreResult.episodes?.results) return oldData;
        return {
          ...oldData,
          episodes: {
            ...oldData.episodes,
            info: {
              ...fetchMoreResult.episodes?.info,
            },
            results: [...(oldData.episodes?.results || []), ...fetchMoreResult.episodes.results],
          },
        };
      },
    });
  };

  return {
    episodes: data?.episodes,
    loading,
    error,
    searchInput,
    handleSetName,
    handleFetchMore,
  };
}

const EpisodesPage = ({ name }: EpisodesPagePageProps) => {
  const { episodes, loading, error, searchInput, handleSetName, handleFetchMore } = useEpisodesList({
    name,
  });

  const { isAudioEnabled, setIsAudioEnabled } = useContext(AudioReactContext);

  return (
    <>
      <div className='w-full min-h-full text-[14px] bg-constellation'>
        <div className='flex flex-col md:flex-row md:justify-center lg:justify-start items-center'>
          <Logo />
          <PageHeader label='Episodes' />
        </div>
        <div className='flex flex-wrap flex-col md:flex-row md:m-2 lg:ml-10 xl:ml-16 md:gap-y-4 gap-x-8 xl:gap-x-14 justify-center lg:justify-start items-center'>
          <SearchInput value={searchInput} placeholder='Search..' className='max-md:mb-5' onChange={handleSetName} />
        </div>
        <EpisodesList episodesListData={episodes} loading={loading} error={error} handleFetchMore={handleFetchMore} />
      </div>
      <AudioSwitch isAudioEnabled={isAudioEnabled} setIsAudioEnabled={setIsAudioEnabled} />
    </>
  );
};

export default EpisodesPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const name = getServerSideQueryParamFromContext(context, "name");

  return {
    props: {
      name,
    },
  };
};
