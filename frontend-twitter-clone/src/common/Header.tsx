import { useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label }) => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    return navigate('/home');
  }, []);

  return (
    <div className="border-b-[2px] border-[#eff3f4] p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color="black"
            size={20}
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "
          />
        )}
        <h1 className="text-black text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
