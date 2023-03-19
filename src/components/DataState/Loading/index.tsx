import { ColorRing } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className='w-full mt-20 bg-black/[.85] text-[50px] [background-image:url("../../public/endless-constellation.svg")]'>
      <div className='w-full  flex justify-center items-center font-mali text-white'>
        <p className='mr-4'>Loading</p>
        <ColorRing
          visible={true}
          height='80'
          width='80'
          ariaLabel='blocks-loading'
          colors={["#bfd84d", "#9db33c", "#429EA6", "#12b0c9", "#51E5FF"]}
        />
      </div>
    </div>
  );
}
