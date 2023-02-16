import classNames from "classnames";

type SelectProps = {
  label: string;
  options: string[];
  selected: string;
  className?: string;
  onInput: (value: string) => void;
};

const Select = ({ label, options, selected, className, onInput }: SelectProps) => (
  <div
    className={classNames(
      "w-56 h-10 bg-white rounded-lg font-mali border-[3px] border-[#bfd84d] drop-shadow-[0px_2px_30px_#12b0c9]",
      className
    )}
  >
    <label className='w-full inline-flex h-full justify-between items-center ml-3 font-medium text-base select-none '>
      {label}
      <select
        className='w-24 mr-7 [text-align-last:center] font-normal tracking-wider cursor-pointer focus:underline focus:underline-offset-2'
        onInput={({ currentTarget: { value } }) => onInput(value)}
        value={selected}
      >
        <option value=''>All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default Select;
