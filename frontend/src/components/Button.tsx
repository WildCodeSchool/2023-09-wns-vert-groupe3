import { cn } from "lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-xl bg-primary py-3 font-bold text-white transition hover:bg-opacity-80",
        disabled && "cursor-not-allowed bg-opacity-30 hover:bg-opacity-30",
        className,
      )}
      disabled
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
