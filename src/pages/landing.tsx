import React, { FC } from "react";
import { Button, Col, Row } from "antd";
import imageRender from "assets/model-render.png";
import { FieldTimeOutlined, RightOutlined } from "@ant-design/icons";
import { withRouter, WithRouterProps } from "react-router";
import { routesMap } from "routes";
const Landing: FC<WithRouterProps> = ({ history }) => {
  const handleStartClick = () => {
    history.push(routesMap.ietm);
  };
  return (
    <Row className="landing-page">
      <Col span={12} className="img-container">
        <img src={imageRender} alt="Рендер редуктора" />
      </Col>
      <Col span={12}>
        <div className="right-content">
          <h1>
            Интерактивное электронное техническое руководство двухступенчатого
            цилиндрического зубчатого вертикального редуктора на базе Three JS
          </h1>
          <p>
            Методическое электронное пособие для производственного персонала
            включает в себя интерактивный, текстовый, фото и видео материал для
            изучения строения редуктора, его технических характеристик,
            составных деталей, методов сборки-разборки, эксплуатации и
            обслуживания. Механизм привода к ходовому колесу грузовой тележки
            мостового крана состоит из вертикального двухступенчатого
            цилиндрического редуктора с косозубой быстроходной и прямозубой
            тихоходной ступенями
          </p>
          <div className="landing-footer">
            <Button
              type="primary"
              icon={<RightOutlined />}
              onClick={handleStartClick}
            >
              Перейти к руководству
            </Button>
            <p className="footer-extra">
              <FieldTimeOutlined />
              Продолжительность 5:30 мин.
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default withRouter(Landing);
