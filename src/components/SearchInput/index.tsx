import Image from "next/image";
import search from "../../../public/search.png";
import classNames from "classnames";

type SearchInputProps = {
  value: string;
  placeholder: string;
  className?: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ className, onChange, ...props }: SearchInputProps) => (
  <div
    className={classNames(
      "w-60 h-10 flex justify-between bg-white rounded-lg text-base border-[3px] border-[#bfd84d] drop-shadow-[0px_2px_30px_#12b0c9]",
      className
    )}
  >
    <input
      className='w-40 ml-1 p-2 bg-transparent font-mali'
      spellCheck={false}
      onChange={({ currentTarget: { value } }) => onChange(value)}
      {...props}
    />
    <Image className='w-[20px] h-auto m-2 mr-3 object-contain' src={search} alt={"search icon"} />
  </div>
);

export default SearchInput;
