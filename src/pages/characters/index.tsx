import { useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../../gql/";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import SearchInput from "../../components/SearchInput";
import Select from "../../components/Select";
import CharacterList from "../../components/PagesLists/CharactersList";
import useDebounce from "../../hooks/useDebounce";
import getServerSideQueryParamFromContext from "../../helpers/getServerSideQueryParamFromContext";
import updateQueryParamForRouter from "../../helpers/routerQueryManipulation";

const genderOptions = ["Female", "Male", "Genderless", "Unknown"];
const lifeStatusOptions = ["Alive", "Dead", "Unknown"];

interface CharactersPagePageProps {
  name: string | null;
  gender: string | null;
  status: string | null;
}

const GET_CHARACTERS_QUERY = graphql(/* GraphQL */ `
  query GetCharacters_Query($page: Int, $name: String, $gender: String, $status: String) {
    characters(page: $page, filter: { name: $name, gender: $gender, status: $status }) {
      info {
        pages
        next
      }
      results {
        id
      }
      ...CharactersList_QueryFragment
    }
  }
`);

function useCharactersList({ name, gender, status }: CharactersPagePageProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(name || "");
  const [genderFilter, setGenderFilter] = useState(gender || "");
  const [lifeStatusFilter, setLifeStatusFilter] = useState(status || "");
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS_QUERY, {
    variables: {
      page: 1,
      name: debouncedSearchInput,
      gender: genderFilter,
      status: lifeStatusFilter,
    },
  });

  const handleSetName = async (value: string) => {
    setSearchInput(value);
    await updateQueryParamForRouter({ router, queryParamKey: "name", queryParamValue: value });
  };

  const handleSetGender = async (value: string) => {
    setGenderFilter(value);
    await updateQueryParamForRouter({ router, queryParamKey: "gender", queryParamValue: value });
  };

  const handleSetStatus = async (value: string) => {
    setLifeStatusFilter(value);
    await updateQueryParamForRouter({ router, queryParamKey: "status", queryParamValue: value });
  };

  const handleFetchMore = () => {
    return fetchMore({
      variables: {
        page: data?.characters?.info?.next,
        name: debouncedSearchInput,
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
    });
  };

  return {
    characters: data?.characters,
    loading,
    error,
    searchInput,
    genderFilter,
    lifeStatusFilter,
    handleSetName,
    handleSetGender,
    handleSetStatus,
    handleFetchMore,
  };
}

const CharactersPage = ({ name, gender, status }: CharactersPagePageProps) => {
  const {
    characters,
    loading,
    error,
    searchInput,
    genderFilter,
    lifeStatusFilter,
    handleSetName,
    handleSetGender,
    handleSetStatus,
    handleFetchMore,
  } = useCharactersList({
    name,
    gender,
    status,
  });

  return (
    <div className='w-full min-h-full bg-black/[.85] text-[14px] [background-image:url("../../public/endless-constellation.svg")]'>
      <div className='flex flex-col md:flex-row md:justify-center lg:justify-start items-center'>
        <img
          className='w-[200px] h-[200px] md:w-[240px] md:h-[240px] xl:w-[300px] xl:h-[300px] max-md:ml-0 ml-8 pointer-events-none select-none'
          src='logo.png'
          alt="Rick'n'Morty Logo"
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
        <SearchInput value={searchInput} placeholder='Search..' className='max-md:mb-5' onChange={handleSetName} />
        <Select
          label='Gender:'
          options={genderOptions}
          selected={genderFilter}
          className='max-md:mb-5'
          onInput={handleSetGender}
        />
        <Select
          label='Life Status:'
          options={lifeStatusOptions}
          selected={lifeStatusFilter}
          className='max-md:mb-5'
          onInput={handleSetStatus}
        />
        <Link
          href='/'
          className='w-28 h-8 lg:ml-auto lg:mr-10 flex justify-center items-center rounded-lg bg-white font-mali text-base border-[3px] border-[#bfd84d] drop-shadow-[0px_2px_30px_#12b0c9]'
        >
          Home
        </Link>
      </div>
      <CharacterList
        charactersListData={characters}
        loading={loading}
        error={error}
        handleFetchMore={handleFetchMore}
      />
    </div>
  );
};

export default CharactersPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const name = getServerSideQueryParamFromContext(context, "name");
  const gender = getServerSideQueryParamFromContext(context, "gender");
  const status = getServerSideQueryParamFromContext(context, "status");

  return {
    props: {
      name,
      gender,
      status,
    },
  };
};
