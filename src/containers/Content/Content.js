import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Router from "../../router";

const { Header, Content, Footer } = Layout;

const Contents = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/add-user"]}
          style={{ textAlign: "center", fontSize: 17 }}
        >
          <Menu.Item key="/add-user">
            <Link to="/add-user">Add user</Link>
          </Menu.Item>
          <Menu.Item key="/user-list">
            <Link to="/user-list">User list</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <div className="site-layout-content">
          <Router />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Created by Mohammad Ali Khan
      </Footer>
    </Layout>
  );
};
export default Contents;
