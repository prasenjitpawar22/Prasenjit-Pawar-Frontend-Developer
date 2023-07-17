import { Menu } from "lucide-react";
const Navbar = () => {
  return (
    <div className="px-12 bg-teenyGreeny py-4 border-b border-teenyGreeny shadow">
      <ul className="flex justify-between items-center">
        <li className="font-bold text-3xl text-primary cursor-pointer">LOGO</li>
        <li className="cursor-pointer transition-all duration-300 text-primary hover:text-teenyGreeny bg-pinky p-2 rounded-full hover:bg-[#FDBBC9] ">
          <Menu size={40} />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
