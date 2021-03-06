import Wrench2 from "assets/icons/components/wrench2";

import Cube3D from "assets/icons/components/cube3D";
import Gears from "assets/icons/components/gears";
import Bearing from "assets/icons/components/ballbearing";
import OilChange from "assets/icons/components/oilchange";
import Wrench from "assets/icons/components/wrench";
import Bolt from "assets/icons/components/bolt";
import Nut from "assets/icons/components/nut";
import Pack from "assets/icons/components/pack";
import Pack2 from "assets/icons/components/pack2";
import Truck from "assets/icons/components/truck";

import Icon from "@ant-design/icons";
import Recycle from "assets/icons/components/recycle";
import Alert from "assets/icons/components/alert";
import Shaft from "assets/icons/components/shaft";

import Stop from "assets/icons/components/stop";
import Dovel from "assets/icons/components/dovel";
import Info from "assets/icons/components/info";
import Blueprint from "assets/icons/components/blueprint";
import GearWorking from "assets/icons/components/gearworking";
import Helmet from "assets/icons/components/helmet";
import Toolbox from "assets/icons/components/toolbox";
import Maintenance from "assets/icons/components/maintenance";
import Warehouse from "assets/icons/components/warehouse";
import Search from "assets/icons/components/search";
import Eta from "assets/icons/components/eta";
import Lipseal from "assets/icons/components/lipseal";
import React, { FC } from "react";

const DefaultProps = {
  width: "1em",
  height: "1em",
  fill: "currentColor",
};

const Cube3DIcon: FC = (props) => (
  <Icon component={Cube3D} {...DefaultProps} {...props} />
);
const GearsIcon: FC = (props) => (
  <Icon component={Gears} {...DefaultProps} {...props} />
);
const BearingIcon: FC = (props) => (
  <Icon component={Bearing} {...DefaultProps} {...props} />
);
const OilChangeIcon: FC = (props) => (
  <Icon component={OilChange} {...DefaultProps} {...props} />
);
const WrenchIcon: FC = (props) => (
  <Icon component={Wrench} {...DefaultProps} {...props} />
);
const BoltIcon: FC = (props) => (
  <Icon component={Bolt} {...DefaultProps} {...props} />
);
const NutIcon: FC = (props) => (
  <Icon component={Nut} {...DefaultProps} {...props} />
);
const PackIcon: FC = (props) => (
  <Icon component={Pack} {...DefaultProps} {...props} />
);
const Pack2Icon: FC = (props) => (
  <Icon component={Pack2} {...DefaultProps} {...props} />
);
const TruckIcon: FC = (props) => (
  <Icon component={Truck} {...DefaultProps} {...props} />
);
const RecycleIcon: FC = (props) => (
  <Icon component={Recycle} {...DefaultProps} {...props} />
);
const AlertIcon: FC = (props) => (
  <Icon component={Alert} {...DefaultProps} {...props} />
);
const Wrench2Icon: FC = (props) => (
  <Icon component={Wrench2} {...DefaultProps} {...props} />
);
const ShaftIcon: FC = (props) => (
  <Icon component={Shaft} {...DefaultProps} {...props} />
);
const DovelIcon: FC = (props) => (
  <Icon component={Dovel} {...DefaultProps} {...props} />
);
const InfoIcon: FC = (props) => (
  <Icon component={Info} {...DefaultProps} {...props} />
);
const BlueprintIcon: FC = (props) => (
  <Icon component={Blueprint} {...DefaultProps} {...props} />
);
const GearWorkingIcon: FC = (props) => (
  <Icon component={GearWorking} {...DefaultProps} {...props} />
);
const HelmetIcon: FC = (props) => (
  <Icon component={Helmet} {...DefaultProps} {...props} />
);
const ToolboxIcon: FC = (props) => (
  <Icon component={Toolbox} {...DefaultProps} {...props} />
);
const MaintenanceIcon: FC = (props) => (
  <Icon component={Maintenance} {...DefaultProps} {...props} />
);
const WarehouseIcon: FC = (props) => (
  <Icon component={Warehouse} {...DefaultProps} {...props} />
);
const SearchIcon: FC = (props) => (
  <Icon component={Search} {...DefaultProps} {...props} />
);
const EtaIcon: FC = (props) => (
  <Icon component={Eta} {...DefaultProps} {...props} />
);
const LipsealIcon: FC = (props) => (
  <Icon component={Lipseal} {...DefaultProps} {...props} />
);

const StopIcon: FC = (props) => (
  <Icon
    style={{ color: "green" }}
    component={Stop}
    {...DefaultProps}
    {...props}
  />
);
export {
  Cube3DIcon,
  GearsIcon,
  BearingIcon,
  OilChangeIcon,
  WrenchIcon,
  NutIcon,
  BoltIcon,
  PackIcon,
  Pack2Icon,
  TruckIcon,
  RecycleIcon,
  AlertIcon,
  Wrench2Icon,
  ShaftIcon,
  StopIcon,
  DovelIcon,
  InfoIcon,
  BlueprintIcon,
  GearWorkingIcon,
  HelmetIcon,
  ToolboxIcon,
  MaintenanceIcon,
  WarehouseIcon,
  SearchIcon,
  EtaIcon,
  LipsealIcon,
};
