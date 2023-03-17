import { useQuery } from "@apollo/client";
import { NextPageContext } from "next";
import Link from "next/link";
import { graphql } from "../../../gql";
import { ColorRing } from "react-loader-spinner";
import getServerSideQueryParamFromContext from "../../../helpers/getServerSideQueryParamFromContext";
import CharacterDetailParagraph from "../../../components/CharacterDetailPararaph";
import EpisodeTag from "../../../components/EpisodeTag";

const GET_CHARACTER_QUERY = graphql(/* GraphQL */ `
  query GetCharacter_Query($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      location {
        id
        name
      }
      image
      episode {
        id
        name
        episode
      }
    }
  }
`);

const useCharacter = ({ characterID }: { characterID: string }) => {
  const { data, loading, error } = useQuery(GET_CHARACTER_QUERY, {
    variables: {
      id: characterID,
    },
  });

  return { character: data?.character, episodesTheyPlayIn: data?.character?.episode || [], loading, error };
};

const CharacterPage = ({ characterID }: { characterID: string }) => {
  const { character, episodesTheyPlayIn, loading, error } = useCharacter({ characterID });

  return (
    <div className='w-full min-h-full flex flex-col bg-black/[.85] font-mali text-white [background-image:url("../../public/endless-constellation.svg")]'>
      {loading && (
        <div className='w-full mt-14 bg-black/[.85] text-[50px] [background-image:url("../../public/endless-constellation.svg")]'>
          <div className='w-full flex justify-center items-center font-mali text-white'>
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
        <>
          <div className='mt-10 flex flex-col sm:ml-10 sm:flex-row sm:items-center'>
            <div className='max-w-[350px] mb-6 flex flex-col items-center self-center justify-center'>
              <img
                src={character?.image || undefined}
                alt={"character img"}
                className={
                  "w-[200px] h-[200px] sm:w-auto sm:h-auto rounded-full border-[1px] border-[#bfd84d] drop-shadow-[0px_0px_20px_#12b0c9]"
                }
              />
              <div className='mt-6 text-4xl tracking-wide text-center text-[#bfd84d] drop-shadow-[0px_0px_2px_#12b0c9]'>
                {character?.name}
              </div>
            </div>
            <div className='mb-3 sm:mb-20 mx-11 flex-start'>
              <CharacterDetailParagraph label='ID' value={characterID} />
              <CharacterDetailParagraph label='Status' value={character?.status} />
              <CharacterDetailParagraph label='Gender' value={character?.gender} />
              <CharacterDetailParagraph label='Last known location' value={character?.location?.name} />
            </div>
          </div>
          <div className='mt-2 mx-10'>
            <span className='text-lg text-[#12b0c9] drop-shadow-[0px_0px_1px_#bfd84d] font-medium'>EPISODES</span>
            <ul className='mt-2 flex flex-wrap justify-start items-start'>
              {episodesTheyPlayIn.map((episode, id) => episode?.name && <EpisodeTag name={episode.name} key={id} />)}
            </ul>
          </div>
        </>
      )}
      <Link
        href={"/characters"}
        className='w-[50px] h-[50px] mt-6 mr-4 rounded-2xl absolute top-0 right-0 bg-slate-600'
      >
        <img src={"../../go-back.svg"} alt={"back icon"} />
      </Link>
    </div>
  );
};

export default CharacterPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const characterID = getServerSideQueryParamFromContext(context, "characterID");
  return {
    props: { characterID },
  };
};
