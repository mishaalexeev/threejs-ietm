import React, { useState, FunctionComponent, MouseEvent } from "react";
import { Menu } from "antd";
import "./contextmenu.css";
import {
  EyeInvisibleOutlined,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import { RootStore } from "store";
import withStores from "hocs/withStores";

type Props = {
  stores: RootStore;
  menuItemClicked: (key: string, xPos: number, yPos: number) => void;
};

const ContextMenu: FunctionComponent<Props> = (props) => {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [open, setOpen] = useState(false);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>): void => {
    const intersects = props.stores.modelStore.getIntersects(
      event.clientX,
      event.clientY
    );

    setXPos(event.clientX);
    setYPos(event.clientY);
    setOpen(intersects.length > 0);
  };

  const menuItemClicked = (event): void => {
    setOpen(false);
    props.menuItemClicked(event.key, xPos, yPos);
  };

  return (
    <>
      <Menu
        className="viewer-context-menu"
        onClick={menuItemClicked}
        hidden={!open}
        style={{
          top: yPos,
          left: xPos,
        }}
      >
        <Menu.Item key="1" icon={<EyeInvisibleOutlined />}>
          Скрыть
        </Menu.Item>
        <Menu.Item key="2" icon={<StarFilled />}>
          Изолировать
        </Menu.Item>
        <Menu.Item key="3" icon={<StarTwoTone />}>
          Выделить
        </Menu.Item>
      </Menu>

      <div
        className="viewer-context-menu-content"
        onContextMenu={handleContextMenu}
      >
        {props.children}
      </div>
    </>
  );
};

export default withStores(ContextMenu);
