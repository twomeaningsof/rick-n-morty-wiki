import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../../gql/";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import SearchInput from "../../components/SearchInput";
import Select from "../../components/Select";
import CharacterList from "../../components/PagesLists/CharactersList";
import useDebounce from "../../hooks/useDebounce";
import getServerSideQueryParamFromContext from "../../helpers/getServerSideQueryParamFromContext";
import updateQueryParamForRouter from "../../helpers/routerQueryManipulation";
import Logo from "../../components/Logo";
import PageHeader from "../../components/PageHeader";
import { AudioReactContext } from "../../contexts";
import AudioSwitch from "../../components/AudioSwitch";

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

  const { isAudioEnabled, setIsAudioEnabled } = useContext(AudioReactContext);

  return (
    <>
      <div className='w-full min-h-full text-[14px] bg-constellation'>
        <div className='flex flex-col md:flex-row md:justify-center lg:justify-start items-center'>
          <Logo />
          <PageHeader label='Characters' />
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
        </div>
        <CharacterList
          charactersListData={characters}
          loading={loading}
          error={error}
          handleFetchMore={handleFetchMore}
        />
      </div>
      <AudioSwitch isAudioEnabled={isAudioEnabled} setIsAudioEnabled={setIsAudioEnabled} />
    </>
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
