import classNames from "classnames";
import Link from "next/link";

interface TextButtonProps {
  className?: string;
  linkHref?: string;
  label: string;
  onClick?: () => void;
}

export default function TextButtonProps({ className, linkHref, label, onClick, ...rest }: TextButtonProps) {
  const classes = classNames(
    "h-10 flex justify-center items-center rounded bg-white font-mali text-xl text-[#000000ef] font-medium border-[3px] border-[#c9d463c9] drop-shadow-[0px_2px_10px_#12b0c9] hover:-translate-y-1 hover:drop-shadow-[0px_2px_25px_#12b0c9] duration-200 select-none",
    className
  );

  return linkHref ? (
    <Link className={classes} href={linkHref} onClick={onClick} {...rest}>
      {label}
    </Link>
  ) : (
    <button className={classes} onClick={onClick} {...rest}>
      {label}
    </button>
  );
}
