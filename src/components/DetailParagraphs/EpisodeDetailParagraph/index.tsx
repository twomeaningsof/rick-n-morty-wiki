interface EpisodeDetailParagraphProps {
  label: string;
  value?: string | null;
}

const EpisodeDetailParagraph = ({ label, value }: EpisodeDetailParagraphProps) => {
  return (
    <p className='mb-3 flex flex-col lg:flex-row lg:justify-end lg:items-end'>
      <span className='mr-2 lg:mr-5 text-xl lg:text-4xl text-[#12b0c9] drop-shadow-[0px_0px_1px_#bfd84d] font-medium'>
        {label}:
      </span>
      <span className='text-lg lg:text-3xl text-[#bfd84d] drop-shadow-[0px_0px_2px_#12b0c9]'>{value}</span>
    </p>
  );
};

export default EpisodeDetailParagraph;
