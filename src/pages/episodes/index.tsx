import { useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../../gql/";
import { useRouter } from "next/router";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import Image from "next/image";
import EpisodesCardList from "../../components/CardLists/EpisodesCardList";
import SearchInput from "../../components/SearchInput";
import useDebounce from "../../hooks/useDebounce";
import logo from "../../../public/logo.png";
import { NextPageContext } from "next";
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
      ...EpisodesCardList_QueryFragment
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
    dataLength: data?.episodes?.results?.length || 0,
    hasMore: data?.episodes?.info?.next !== null,
    loading,
    error,
    searchInput,
    handleSetName,
    handleFetchMore,
  };
}

const EpisodesPage = ({ name }: EpisodesPagePageProps) => {
  const { episodes, dataLength, hasMore, loading, error, searchInput, handleSetName, handleFetchMore } =
    useEpisodesList({
      name,
    });

  return (
    <div className='w-full min-h-full bg-black/[.85] text-[14px] [background-image:url("../../public/endless-constellation.svg")]'>
      <div className='flex flex-col md:flex-row md:justify-center lg:justify-start items-center'>
        <Image
          className='w-[200px] h-[200px] md:w-[240px] md:h-[240px] xl:w-[300px] xl:h-[300px] max-md:ml-0 ml-8 pointer-events-none select-none'
          src={logo}
          alt={"Rick'n'Morty Logo"}
          draggable={false}
        />
        <h1
          className='ml-0 md:ml-2 lg:ml-10 font-gochi text-[50px] md:text-[85px] lg:text-[128px] xl:text-[150px] tracking-widest select-none text-[#12b0c9] drop-shadow-[-5px_0px_20px_#bfd84d] md:drop-shadow-[-5px_0px_16px_#bfd84d] lg:drop-shadow-[-5px_0px_30px_#bfd84d]'
          draggable={false}
        >
          Episodes
        </h1>
      </div>
      <div className='flex flex-wrap flex-col md:flex-row md:m-2 lg:ml-10 xl:ml-16 md:gap-y-4 gap-x-8 xl:gap-x-14 justify-center lg:justify-start items-center'>
        <SearchInput value={searchInput} placeholder='Search..' className='max-md:mb-5' onChange={handleSetName} />
        <Link
          href={"/"}
          className='w-28 h-8 lg:ml-auto lg:mr-10 flex justify-center items-center rounded-lg bg-white font-mali text-base border-[3px] border-[#bfd84d] drop-shadow-[0px_2px_30px_#12b0c9]'
        >
          Home
        </Link>
      </div>
      {loading && (
        <div className='w-full bg-black/[.85] text-[50px] [background-image:url("../../public/endless-constellation.svg")]'>
          <div className='w-full  flex justify-center items-center font-mali text-white'>
            <p className='mr-4'>Loading</p>
            <ColorRing
              visible={true}
              height='80'
              width='80'
              ariaLabel='blocks-loading'
              colors={["#bfd84d", "#9db33c", "#429EA6", "#12b0c9", "#51E5FF"]}
            />
          </div>
        </div>
      )}
      {error && (
        <div className='w-full bg-black/[.85] text-[50px] [background-image:url("../../public/endless-constellation.svg")]'>
          <p className=' flex justify-center items-center font-mali text-white'>Error: {error.message}</p>
        </div>
      )}
      {!loading && !error && (
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
          {episodes && <EpisodesCardList cardListData={episodes} />}
        </InfiniteScroll>
      )}
    </div>
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