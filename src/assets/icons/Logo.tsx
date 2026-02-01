import { cn } from "@/lib/utils";
import logo from "@/assets/images/logo.svg";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return <img src={logo} alt="logo" className={cn("h-8 w-8 object-contain", className)} />;
};

export default Logo;
