import type { IconBaseProps, AutoTransformerTwoWindingHorizontalColors } from "../types/icons";

export const AutoTransformerTwoWindingHorizontalIcon = ({
  ringLeft = "#4242A0",
  ringRight = "#BD3ABD",
  link = "#EA7474",
  ...props
}: IconBaseProps & AutoTransformerTwoWindingHorizontalColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="107"
    height="80"
    viewBox="0 0 107 80"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_53)">
      <circle
        cx="31"
        cy="48.5228"
        r="29"
        transform="rotate(90 31 48.5228)"
        stroke={ringLeft}
        strokeWidth="4"
      />
      <circle
        cx="76.2346"
        cy="48.5228"
        r="29"
        transform="rotate(90 76.2346 48.5228)"
        stroke={ringRight}
        strokeWidth="4"
      />
      <path
        d="M101.5 62.523L103.403 57.7644C104.131 55.9466 104.587 54.0319 104.758 52.0816L105.096 48.2178C105.422 44.4957 104.699 40.7567 103.009 37.4246L101.177 33.8145C99.7461 30.9937 97.6665 28.5524 95.109 26.6913L79.8897 15.6161C79.1384 15.0694 78.4851 14.3995 77.9573 13.6347C77.0083 12.2595 76.5 10.6281 76.5 8.95713L76.5 -0.477174"
        stroke={link}
        strokeWidth="4"
      />
    </g>
    <defs>
      <clipPath id="clip0_85_53">
        <rect
          width="80"
          height="107"
          fill="white"
          transform="matrix(0 1 -1 0 107 0)"
        />
      </clipPath>
    </defs>
  </svg>
);