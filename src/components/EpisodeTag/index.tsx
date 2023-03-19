interface EpisodeTagProps {
  name: string;
}

const EpisodeTag = ({ name, ...rest }: EpisodeTagProps) => (
  <li className='mr-3 mb-3 py-1 px-2 bg-white rounded text-black drop-shadow-[0px_0px_3px_#12b0c9]' {...rest}>
    {name}
  </li>
);

export default EpisodeTag;
