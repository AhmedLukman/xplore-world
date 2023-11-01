import Logo from "../../components/ui/Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="relative flex justify-between p-12 text-white">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;
