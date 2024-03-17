import { cn } from "lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return <button className={cn("py-3 bg-primary text-white font-bold rounded-xl hover:bg-opacity-80 transition", className)} {...props}>{children}</button>;
};
export default Button;