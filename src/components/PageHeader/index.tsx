interface PageHeaderProps {
  label: string;
}

export default function PageHeader({ label }: PageHeaderProps) {
  return (
    <h1
      className='ml-0 md:ml-2 lg:ml-10 font-gochi text-[50px] md:text-[85px] lg:text-[128px] xl:text-[150px] tracking-widest select-none text-[#12b0c9] drop-shadow-[-4px_0px_4px_#bfd84d] md:drop-shadow-[-5px_0px_4px_#bfd84d] lg:drop-shadow-[-6px_0px_4px_#bfd84d] 2xl:drop-shadow-[-7px_0px_4px_#bfd84d] [text-shadow:#423500_3px_0_2px] md:[text-shadow:#423500_4px_0_3px] lg:[text-shadow:#423500_5px_0_4px] 2xl:[text-shadow:#423500_6px_0_5px]'
      draggable={false}
    >
      {label}
    </h1>
  );
}
