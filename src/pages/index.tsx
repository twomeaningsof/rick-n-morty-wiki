import { gql } from "@apollo/client";
import client from "../../apollo-client";

interface CharactersPageProps {
  characters: object[];
}

const CharactersPage = (props: CharactersPageProps) => {
  return (
    <div className='w-full bg-gray-500 text-[14px]'>
      Characters page:
      <ul>{props.characters[0].name}</ul>
    </div>
  );
};

export default CharactersPage;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Characters {
        characters(filter: { name: "Mechanical Rick" }) {
          results {
            id
            name
            status
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
