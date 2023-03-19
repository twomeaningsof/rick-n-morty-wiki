interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className='w-full bg-black/[.85] text-[50px] [background-image:url("../../public/endless-constellation.svg")]'>
      {message ? (
        <p className=' flex justify-center items-center font-mali text-white'>Error: {message}</p>
      ) : (
        <p className=' flex justify-center items-center font-mali text-white'>There is no error</p>
      )}
    </div>
  );
}
