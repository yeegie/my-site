import { NavLink } from "react-router-dom";
import { NavLinkUPProps } from "./NavLinkUp.props";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const NavLinkUp: React.FC<NavLinkUPProps> = ({
  to,
  className,
  children,
}) => (
  <NavLink to={to} onClick={scrollToTop} className={className}>
    {children}
  </NavLink>
);
