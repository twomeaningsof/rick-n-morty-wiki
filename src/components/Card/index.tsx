import Image from "next/image";
import aliveIcon from "../../../public/alive.png";
import deadIcon from "../../../public/dead.png";
import unknownIcon from "../../../public/unknown.png";

const lifeStatusImages = {
  alive: aliveIcon,
  dead: deadIcon,
  unknown: unknownIcon,
};

export interface CharacterInfo {
  image: string;
  name: string;
  status: string;
}

const Card = ({ image, name, status, ...rest }: CharacterInfo) => {
  return (
    <div className='m-8 border border border-black rounded-md drop-shadow-2xl overflow-hidden' {...rest}>
      <div className='h-full relative flex flex-col'>
        <Image src={image} width={300} height={300} alt='Character image' />
        <div className='max-w-[300px] h-full flex justify-between items-center bg-white p-2'>
          <div className='ml-2 flex font-mali text-2xl'>{name}</div>
          <Image
            src={lifeStatusImages[status.toLowerCase() as keyof object]}
            width={50}
            height={50}
            alt='Life Status Img missing'
            className='h-[50px] m-2 ml-4'
            title={`Life status ${status.toLowerCase()}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
