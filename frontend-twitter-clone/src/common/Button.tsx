import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  outline,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-sky-600' : 'bg-sky-500'}
        ${secondary ? 'text-white' : 'text-white'}
        ${secondary ? 'border-[#f5f5f5]' : 'border-sky-500'}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5' : 'px-4'}
        ${large ? 'py-3' : 'py-2'}
        ${outline ? 'text-black' : ''}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
