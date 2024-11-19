import React from "react";

interface StarProp extends React.SVGProps<SVGSVGElement> {
  filled?: boolean;
  titleAccess: string;
}

const Star: React.FC<StarProp> = ({ filled, titleAccess, ...props }) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.74375 14.7219L10.5 13.0594L13.2563 14.7437L12.5344 11.5937L14.9625 9.49374L11.7687 9.20937L10.5 6.23437L9.23125 9.18749L6.0375 9.47187L8.46563 11.5937L7.74375 14.7219ZM6.40938 16.5576L7.49437 11.9087L3.88675 8.78324L8.63888 8.37199L10.5 3.98737L12.3611 8.37112L17.1124 8.78237L13.5048 11.9079L14.5906 16.5567L10.5 14.0892L6.40938 16.5576Z"
        fill="white"
      />
    </svg>
  );
};

export default Star;
