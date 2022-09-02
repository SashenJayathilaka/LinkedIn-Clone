import React from "react";

type HomeHeaderLinkProps = {
  Icon: any;
  text: string;
};

const HomeHeaderLink: React.FC<HomeHeaderLinkProps> = ({ Icon, text }) => {
  return (
    <div className="cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-gray-700">
      <Icon />
      <h4 className={`text-sm $`}>{text}</h4>
    </div>
  );
};
export default HomeHeaderLink;
