import React from "react";

interface StarProp extends React.SVGProps<SVGSVGElement> {
  filled?: boolean;
}

const Star: React.FC<StarProp> = ({ filled, ...props }) => {
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
        d="M7.74372 14.7219L10.5 13.0594L13.2562 14.7437L12.5343 11.5937L14.9625 9.49374L11.7687 9.20937L10.5 6.23437L9.23122 9.18749L6.03747 9.47187L8.46559 11.5937L7.74372 14.7219ZM6.40934 16.5576L7.49434 11.9087L3.88672 8.78324L8.63884 8.37199L10.5 3.98737L12.3611 8.37112L17.1123 8.78237L13.5047 11.9079L14.5906 16.5567L10.5 14.0892L6.40934 16.5576Z"
        fill={filled ? "white" : "none"}
      />
    </svg>
  );
};

export default Star;
