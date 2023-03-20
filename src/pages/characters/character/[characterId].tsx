import { useQuery } from "@apollo/client";
import { NextPageContext } from "next";
import Link from "next/link";
import { graphql } from "../../../gql";
import getServerSideQueryParamFromContext from "../../../helpers/getServerSideQueryParamFromContext";
import CharacterDetailParagraph from "../../../components/DetailParagraphs/CharacterDetailParagraph";
import EpisodeTag from "../../../components/EpisodeTag";
import Loading from "../../../components/DataState/Loading";
import Error from "../../../components/DataState/Error";

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

const useCharacter = (characterId: string) => {
  const { data, loading, error } = useQuery(GET_CHARACTER_QUERY, {
    variables: {
      id: characterId,
    },
  });

  return { character: data?.character, episodesCastedIn: data?.character?.episode || [], loading, error };
};

const CharacterPage = ({ characterId }: { characterId: string }) => {
  const { character, episodesCastedIn, loading, error } = useCharacter(characterId);

  if (loading)
    return (
      <div className='w-full min-h-full flex justify-center text-[14px] [background-image:url("../../public/endless-constellation.svg")]'>
        <Loading className='mt-24' />;
      </div>
    );

  if (error)
    return (
      <div className='w-full min-h-full flex justify-center text-[14px] [background-image:url("../../public/endless-constellation.svg")]'>
        <Error message={error.message} className='mt-24'></Error>;
      </div>
    );

  return (
    <div className='w-full min-h-full flex flex-col font-mali text-white [background-image:url("../../public/endless-constellation.svg")]'>
      <>
        <div className='mt-10 flex flex-col sm:ml-10 sm:flex-row sm:items-center'>
          <div className='max-w-[350px] mb-6 flex flex-col items-center self-center justify-center'>
            <img
              src={character?.image || undefined}
              alt='character img'
              className={
                "w-[200px] h-[200px] sm:w-auto sm:h-auto rounded-full border-[1px] border-[#bfd84d] drop-shadow-[0px_0px_20px_#12b0c9]"
              }
            />
            <div className='mt-6 text-4xl tracking-wide text-center text-[#bfd84d] drop-shadow-[0px_0px_2px_#12b0c9]'>
              {character?.name}
            </div>
          </div>
          <div className='mb-3 sm:mb-20 mx-11 flex-start'>
            <CharacterDetailParagraph label='Id' value={characterId} />
            <CharacterDetailParagraph label='Status' value={character?.status} />
            <CharacterDetailParagraph label='Gender' value={character?.gender} />
            <CharacterDetailParagraph label='Last known location' value={character?.location?.name} />
          </div>
        </div>
        <div className='mt-2 mx-10'>
          <span className='text-lg text-[#12b0c9] drop-shadow-[0px_0px_1px_#bfd84d] font-medium'>EPISODES</span>
          {character?.episode != undefined && character.episode.length > 0 ? (
            <ul className='mt-2 flex flex-wrap justify-start items-start'>
              {episodesCastedIn.map((episode) =>
                episode?.name ? <EpisodeTag name={episode.name} id={episode.id} key={episode.id} /> : null
              )}
            </ul>
          ) : (
            <p>Character did not cast in any episode</p>
          )}
        </div>
      </>
      <Link href='/characters' className='w-[50px] h-[50px] mt-6 mr-4 rounded-2xl absolute top-0 right-0 bg-slate-600'>
        <img src='../../go-back.svg' alt='back icon' />
      </Link>
    </div>
  );
};

export default CharacterPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const characterId = getServerSideQueryParamFromContext(context, "characterId");
  return {
    props: { characterId },
  };
};
