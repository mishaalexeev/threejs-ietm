import React, { FC } from "react";
import { Button, Result } from "antd";
import { withRouter, WithRouterProps } from "react-router";

const Page404: FC<WithRouterProps> = ({ history }) => {
  const handleReturnToMainPage = () => {
    history.push("/");
  };
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Извини, такой страницы не существует."
        extra={
          <Button type="primary" onClick={handleReturnToMainPage}>
            Вернуться на главную страницу
          </Button>
        }
      />
    </>
  );
};

export default withRouter(Page404);
