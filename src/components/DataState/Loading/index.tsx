import { ColorRing } from "react-loader-spinner";
import classNames from "classnames";

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={classNames("w-full text-[50px]", className)}>
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
