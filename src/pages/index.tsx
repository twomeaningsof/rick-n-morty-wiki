import Link from "next/link";

const WelcomePage = () => {
  return (
    <div className='w-full min-h-full flex flex-col items-center bg-black/[.85] [background-image:url("../../public/endless-constellation.svg")]'>
      <h1
        className='mt-10 font-gochi text-[50px] lg:text-[170px] text-center tracking-widest text-[#12b0c9] drop-shadow-[-5px_0px_10px_#bfd84d] lg:drop-shadow-[-5px_0px_30px_#bfd84d] select-none'
        draggable={false}
      >
        Rick and Morty
      </h1>
      <div className='mt-5 flex flex-col lg:flex-row gap-x-10'>
        <Link
          href={"/characters"}
          className='w-40 h-10 mb-5 flex justify-center items-center rounded bg-white font-mali border-[3px] border-[#bfd84d] drop-shadow-[0px_2px_25px_#12b0c9]'
        >
          Characters
        </Link>
        <Link
          href={"/episodes"}
          className='w-40 h-10 flex justify-center items-center rounded bg-white font-mali border-[3px] border-[#bfd84d] drop-shadow-[0px_2px_25px_#12b0c9]'
        >
          Episodes
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
