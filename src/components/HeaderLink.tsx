import React from "react";

type HeaderLinkProps = {
  Icon: any;
  text: string;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({ Icon, text }) => {
  return (
    <div className="cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-gray-700">
      <Icon />
      <h4 className={`text-sm $`}>{text}</h4>
    </div>
  );
};
export default HeaderLink;
