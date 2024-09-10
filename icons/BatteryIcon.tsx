const fill = "#FEFEFE"; // Fill color of the battery
const stroke = "#9A9797"; // Stroke color of the outer shell and the tip of the battery
const background = "#0a0a0a"; // Must match the background color where the battery icon is displayed

function BatteryIcon({
  percentage,
  charging,
}: {
  percentage: number;
  charging: boolean;
}) {
  const width = Math.round((percentage / 100) * 19);
  return (
    <svg
      width="26"
      height="18"
      viewBox="0 0 26 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="3.5" width="22" height="11" rx="2.5" stroke={stroke} />
      <path
        d="M25.5 9C25.5 10.5 25 11 24 11C24 10.1138 24 10.1046 24 9C24 7.89543 24 7.82537 24 7.11383C25 7.11383 25.5 7.5 25.5 9Z"
        fill={stroke}
      />
      <rect x="2" y="5" width={width} height="8" rx="1" fill={fill} />
      {charging && (
        <path
          d="M6.5 10.5L14.5 1L12.5 7.5H16L8 17L10.5 10.5H6.5Z"
          fill={fill}
          stroke={background}
          strokeWidth="0.6"
        />
      )}
    </svg>
  );
}

export default BatteryIcon;
