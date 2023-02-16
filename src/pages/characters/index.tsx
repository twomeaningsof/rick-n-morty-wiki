import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../../gql/";
import { useRouter } from "next/router";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import CardList from "../../components/CardList";
import SearchInput from "../../components/SearchInput";
import Select from "../../components/Select";
import useDebounce from "../../hooks/useDebounce";
import logo from "../../../public/logo.png";

const genderOptions = ["Female", "Male", "Genderless", "Unknown"];
const lifeStatusOptions = ["Alive", "Dead", "Unknown"];

interface RouterQueryParams {
  name?: string;
  gender?: string;
  status?: string;
}

const GET_CHARACTERS_QUERY = graphql(/* GraphQL */ `
  query GetCharacters_Query($page: Int, $name: String, $gender: String, $status: String) {
    characters(page: $page, filter: { name: $name, gender: $gender, status: $status }) {
      info {
        count
        pages
        next
      }
      results {
        id
      }
      ...CardList_QueryFragment
    }
  }
`);

const CharactersPage = () => {
  const router = useRouter();
  const { name, gender, status }: RouterQueryParams = router.query;
  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS_QUERY, {
    variables: {
      page: 1,
      name: "",
      gender: "",
      status: "",
    },
  });
  const [searchInput, setSearchInput] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [lifeStatusFilter, setLifeStatusFilter] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const filterData = (characterName?: string, gender?: string, lifeStatus?: string) => {
    fetchMore({
      variables: {
        page: 1,
        name: typeof characterName === "string" ? characterName : searchInput,
        gender: typeof gender === "string" ? gender : genderFilter,
        status: typeof lifeStatus === "string" ? lifeStatus : lifeStatusFilter,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });
    if (typeof characterName === "string") setSearchInput(characterName);
    if (typeof gender === "string") setGenderFilter(gender);
    if (typeof lifeStatus === "string") setLifeStatusFilter(lifeStatus);
  };

  useEffect(() => filterData(name || undefined, gender || undefined, status || undefined), [name, gender, status]);

  useEffect(() => filterData(debouncedSearchInput), [debouncedSearchInput]);

  useEffect(() => {
    if (searchInput || genderFilter || lifeStatusFilter) {
      router.push(
        `/characters?${searchInput?.length ? `name=${searchInput}&` : ""}${
          genderFilter?.length ? `gender=${genderFilter}&` : ""
        }${lifeStatusFilter?.length ? `status=${lifeStatusFilter}` : ""}`
      );
    }
  }, [searchInput, genderFilter, lifeStatusFilter]);

  if (loading)
    return (
      <div className='w-full min-h-full bg-black/[.85] text-[50px] [background-image:url("../../public/endless-constellation.svg")]'>
        <p className='w-full h-screen flex justify-center items-center font-mali text-white'>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className='w-full min-h-full bg-black/[.85] text-[50px] [background-image:url("../../public/endless-constellation.svg")]'>
        <p className='flex h-screen flex justify-center items-center font-mali text-white'>Error: {error.message}</p>
      </div>
    );

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
          Characters
        </h1>
      </div>
      <div className='flex flex-wrap flex-col md:flex-row md:m-2 lg:ml-10 xl:ml-16 md:gap-y-4 gap-x-8 xl:gap-x-14 justify-center lg:justify-start items-center'>
        <SearchInput value={searchInput} placeholder='Search..' className='max-md:mb-5' onChange={setSearchInput} />
        <Select
          label='Gender:'
          options={genderOptions}
          selected={genderFilter}
          className='max-md:mb-5'
          onInput={(v) => filterData(undefined, v)}
        />
        <Select
          label='Life Status:'
          options={lifeStatusOptions}
          selected={lifeStatusFilter}
          className='max-md:mb-5'
          onInput={(v) => filterData(undefined, undefined, v)}
        />
        <Link
          href={"/"}
          className='w-28 h-8 lg:ml-auto lg:mr-10 flex justify-center items-center rounded-lg bg-white font-mali text-base border-[3px] border-[#bfd84d] drop-shadow-[0px_2px_30px_#12b0c9]'
        >
          Home
        </Link>
      </div>
      <InfiniteScroll
        dataLength={data?.characters?.results?.length || 0}
        next={async () =>
          await fetchMore({
            variables: {
              page: data?.characters?.info?.next,
              name: searchInput,
              gender: genderFilter,
              status: lifeStatusFilter,
            },
            updateQuery: (oldData, { fetchMoreResult }) => {
              if (!fetchMoreResult.characters?.results) return oldData;
              return {
                ...oldData,
                characters: {
                  ...oldData.characters,
                  info: {
                    ...fetchMoreResult.characters?.info,
                  },
                  results: [...(oldData.characters?.results || []), ...fetchMoreResult.characters.results],
                },
              };
            },
          })
        }
        hasMore={!!data?.characters?.info?.next}
        loader={<h4 className='font-mali'>Loading more...</h4>}
        endMessage={
          data?.characters?.results?.length === 0 ? (
            <p className='flex justify-center mt-20 mb-10 font-mali text-white text-center text-4xl font-medium'>
              Sorry, there is no match.
            </p>
          ) : (
            <p className='flex justify-center mt-4 mb-10 font-mali text-white text-center text-4xl font-medium'>
              Yay! You have seen it all.
            </p>
          )
        }
      >
        {data?.characters?.results && <CardList cardListData={data?.characters} />}
      </InfiniteScroll>
    </div>
  );
};

export default CharactersPage;
