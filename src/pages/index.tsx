import { useQuery } from "@apollo/client";
import { graphql } from "../gql/";

const GET_CHARACTERS = graphql(`
  query Characters {
    characters(filter: { name: "Mechanical Rick" }) {
      results {
        id
        name
        status
      }
    }
  }
`);

const CharactersPage = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='w-full bg-gray-500 text-[14px]'>
      Characters page:
      <ul>
        {data?.characters?.results &&
          data.characters.results.map((character, index) => <li key={index}>{character?.name}</li>)}
      </ul>
    </div>
  );
};

export default CharactersPage;
