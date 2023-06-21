import { InputHTMLAttributes } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  control: Control<any>;
}

const Input: React.FC<InputProps> = ({ label, name, control, ...inputProp }) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue: '',
    rules: { required: true },
  });

  return (
    <div className="w-full">
      {/* {label && <p className="text-xl text-black font-semibold mb-2">{label}</p>} */}
      <input
        id={name}
        {...field}
        {...inputProp}
        className="
          w-full
          p-4 
          text-lg 
          bg-white 
          border-2
          border-[#f5f5f5] 
          rounded-md
          outline-none
          text-black
          focus:border-sky-500
          focus:border-2
          transition
          disabled:bg-neutral-100
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      />
      {invalid && <span>{error?.message}</span>}
    </div>
  );
};

export default Input;
