import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../../../gql";
import { NextPageContext } from "next";
import Link from "next/link";
import EpisodeDetailParagraph from "../../../components/DetailParagraphs/EpisodeDetailParagraph";
import Loading from "../../../components/DataState/Loading";
import Error from "../../../components/DataState/Error";
import CharacterCard from "../../../components/Cards/CharacterCard";
import routes from "../../../constants/routes";
import { AudioReactContext } from "../../../contexts";
import playSciFiSound from "../../../helpers/playSciFiSound";
import getServerSideQueryParamFromContext from "../../../helpers/getServerSideQueryParamFromContext";

const GET_EPISODE_QUERY = graphql(/* GraphQL */ `
  query GetEpisode_Query($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        ...CharacterCard_CardFragment
      }
    }
  }
`);

const useEpisode = (episodeId: string) => {
  const { data, loading, error } = useQuery(GET_EPISODE_QUERY, {
    variables: {
      id: episodeId,
    },
  });

  return { episode: data?.episode, charactersCastedIn: data?.episode?.characters || [], loading, error };
};

const EpisodePage = ({ episodeId }: { episodeId: string }) => {
  const { episode, charactersCastedIn, loading, error } = useEpisode(episodeId);
  const { isAudioEnabled } = useContext(AudioReactContext);

  const handleSoundOnGoBackButtonClick = () => isAudioEnabled && playSciFiSound();

  if (loading)
    return (
      <div className='w-full min-h-full flex justify-center text-[14px] bg-constellation'>
        <Loading className='mt-24' />;
      </div>
    );

  if (error)
    return (
      <div className='w-full min-h-full flex justify-center text-[14px] bg-constellation'>
        <Error message={error.message} className='mt-24'></Error>;
      </div>
    );

  return (
    <div className='w-full min-h-full flex flex-col font-mali text-white bg-constellation select-none'>
      <>
        <div className='mt-10 sm:ml-10'>
          <div className='mb-3 sm: ml-11 mr-20 flex-start'>
            <EpisodeDetailParagraph label='Episode' value={episode?.episode} />
            <EpisodeDetailParagraph label='Name' value={episode?.name} />
            <EpisodeDetailParagraph label='Air date' value={episode?.air_date} />
          </div>
        </div>
        <h1 className='mt-4 lg:mt-0 lg:ml-14 lg:mb-2 flex justify-center lg:justify-start text-2xl sm:text-3xl lg:text-4xl lg:tracking-widest text-[#bfd84d] drop-shadow-[0px_0px_2px_#12b0c9]'>
          Cast
        </h1>
        <div className='flex flex-wrap justify-around'>
          {charactersCastedIn?.map((cardData, index: number) => {
            if (!cardData) return null;
            return <CharacterCard cardData={cardData} key={index} />;
          })}
        </div>
      </>
      <Link
        href={routes.getEpisodesRoute()}
        onClick={handleSoundOnGoBackButtonClick}
        className='w-[50px] h-[50px] mt-6 mr-4 rounded-2xl absolute top-0 right-0 bg-slate-600'
      >
        <img src='../../go-back.svg' alt='back icon' />
      </Link>
    </div>
  );
};

export default EpisodePage;

export const getServerSideProps = async (context: NextPageContext) => {
  const episodeId = getServerSideQueryParamFromContext(context, "episodeId");
  return {
    props: { episodeId },
  };
};
