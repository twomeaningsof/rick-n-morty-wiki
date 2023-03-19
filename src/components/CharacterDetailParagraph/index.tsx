interface CharacterDetailParagraphProps {
  label: string;
  value?: string | null;
}

const CharacterDetailParagraph = ({ label, value }: CharacterDetailParagraphProps) => {
  return (
    <p className='mb-3'>
      <span className='mr-2 text-xl text-[#12b0c9] drop-shadow-[0px_0px_1px_#bfd84d] font-medium'>{label}:</span>
      <span className='text-lg'>{value}</span>
    </p>
  );
};

export default CharacterDetailParagraph;
