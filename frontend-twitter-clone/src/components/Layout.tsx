import React, { FC } from 'react';

import FollowBar from './Followbar';
import SideBar from './sidebar/SideBar';
import BottomBar from '../navbar/Bottombar';

interface IlayoutProps {
  children: React.ReactNode;
}

const Layout: FC<IlayoutProps> = ({ children }) => {
  return (
    <div className="container h-full mx-auto xl:px-30 max-w-6xl flex flex-col sm:flex-row">
      <div className="h-screen hidden lg:block md:block sm:w-1/4">
        <SideBar />
      </div>
      <div className=" h-[100%] w-full border-x-[2px] border-[#eff3f4]">
        {children}
        <div>
          <BottomBar />
        </div>
      </div>
      <div className="hidden lg:block  h-screen lg:w-[50%]">
        <FollowBar />
      </div>
    </div>
    // <div className="h-screen bg-white">
    //   <div className="container h-full mx-auto xl:px-30 max-w-6xl">
    //     <div className="grid grid-cols-4 h-full">
    //       <SideBar />
    //       <div className="col-span-3 lg:col-span-2 border-x-[2px] border-[#eff3f4]">
    //         {children}
    //       </div>
    //       <FollowBar />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Layout;
