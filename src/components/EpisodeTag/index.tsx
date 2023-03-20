import Link from "next/link";

interface EpisodeTagProps {
  id?: string | null;
  name: string;
}

const EpisodeTag = ({ id, name, ...rest }: EpisodeTagProps) => (
  <Link href={`/episodes/episode/${id}`}>
    <li className='mr-3 mb-3 py-1 px-2 bg-white rounded text-black drop-shadow-[0px_0px_3px_#12b0c9]' {...rest}>
      {name}
    </li>
  </Link>
);

export default EpisodeTag;
