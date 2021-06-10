import React, { FC } from "react";
import { Button, Col, Row } from "antd";
import imageRender from "assets/images/model-render.png";
import { InfoCircleOutlined, RightOutlined } from "@ant-design/icons";
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
            обслуживания. Данный редуктор используется в механизме привода к
            ходовому колесу грузовой тележки мостового крана.
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
              <InfoCircleOutlined />
              Разработка соответствует: ГОСТ 2.001-2013, ГОСТ Р 54088-2017, ГОСТ
              Р 56713-2015.
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default withRouter(Landing);
