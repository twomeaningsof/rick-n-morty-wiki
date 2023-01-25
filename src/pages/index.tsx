import { useQuery } from "@apollo/client";
import { graphql } from "../gql/";
import Image from "next/image";
import logo from "../../public/logo.png";
import charactersImage from "../../public/Characters.png";
import CardList from "../components/CardList";

const GET_CHARACTERS_QUERY = graphql(/* GraphQL */ `
  query GetCharacters_Query {
    ...CardList_QueryFragment
  }
`);

const CharactersPage = () => {
  const { data, loading, error } = useQuery(GET_CHARACTERS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='w-full min-h-full bg-lime-600 text-[14px]'>
      <div className='flex items-center'>
        <Image className='ml-8' src={logo} alt={"Rick'n'Morty Logo"} width={300} height={300} />
        <Image src={charactersImage} width={850} alt={"Characters - page title"} />
      </div>

      {data && <CardList cardListData={data} />}
    </div>
  );
};

export default CharactersPage;
