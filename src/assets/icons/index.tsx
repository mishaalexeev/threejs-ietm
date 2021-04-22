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
};
