import { BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const SidebarLogo = () => {
  return (
    <div
      className="
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-sky-300 
        hover:bg-opacity-10 
        cursor-pointer
    "
    >
      <Link to="/">
        <BsTwitter size={28} className="text-sky-500" />
      </Link>
    </div>
  );
};

export default SidebarLogo;
