import React from "react";

interface StarProp extends React.SVGProps<SVGSVGElement> {
  filled?: boolean;
  titleAccess?: string;
}

const StarOutline: React.FC<StarProp> = ({ filled, titleAccess, ...props }) => {
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
        d="M6.40937 16.5577L7.49437 11.9088L3.88675 8.7833L8.63887 8.37205L10.5 3.98743L12.3611 8.37118L17.1124 8.78243L13.5047 11.9079L14.5906 16.5568L10.5 14.0893L6.40937 16.5577Z"
        style={{
          fill: "var(--color)",
          stroke: "var(--color)",
          strokeWidth: 1.5,
        }}
      />
    </svg>
  );
};

export default StarOutline;
