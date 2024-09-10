import ScreenControls from "../screen-controls";
import BatteryStats from "../battery-stats";

const Title = () => <div className="text-2xl font-bold">SMG Server</div>;

const MenuControls = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 items-center">{children}</div>
);

function TopBar() {
  return (
    <div className="flex justify-between items-center px-5 py-3 border-b  ">
      <Title />
      <MenuControls>
        <BatteryStats battery={{ charge: 0, status: "" }} />
        <ScreenControls />
      </MenuControls>
    </div>
  );
}

export default TopBar;
