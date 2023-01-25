import { useQuery } from "@apollo/client";
import { graphql } from "../gql/";
import Image from "next/image";
import logo from "../../public/logo.png";
import charactersImage from "../../public/Characters.png";
import Card from "../components/Card";

const GET_CHARACTERS = graphql(`
  query Characters {
    characters {
      results {
        id
        name
        status
        image
      }
    }
  }
`);

const CharactersPage = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='w-full min-h-full bg-lime-600 text-[14px]'>
      <div className='flex items-center'>
        <Image className='ml-8' src={logo} alt={"Rick'n'Morty Logo"} width={300} height={300} />
        <Image src={charactersImage} width={850} alt={"Characters - page title"} />
      </div>

      <div className='flex flex-wrap justify-around'>
        {data?.characters?.results &&
          data.characters.results.map(({ image, name, status }, index: number) => (
            <Card image={image} name={name} status={status} key={index} />
          ))}
      </div>
    </div>
  );
};

export default CharactersPage;
