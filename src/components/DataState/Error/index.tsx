import classNames from "classnames";

interface ErrorProps {
  message: string;
  className?: string;
}

export default function Error({ message, className }: ErrorProps) {
  return (
    <div className={classNames("w-full text-[50px] text-center", className)}>
      {message ? (
        <p className=' flex justify-center items-center font-mali text-white'>Error: {message}</p>
      ) : (
        <p className=' flex justify-center items-center font-mali text-white'>There is no error</p>
      )}
    </div>
  );
}
