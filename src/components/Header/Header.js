import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import './Header.css';

const { Header: AntdHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  return (
    <AntdHeader className="app-header">
      <div className="header-content">
        <Title level={2} className="header-title">
          DepDraw
        </Title>
        <div className="navigation-buttons">
          <Link to="/canvas" className="nav-link">
            <Button type="text" className="nav-button">
              Canvas
            </Button>
          </Link>
          <Link to="/diagrams" className="nav-link">
            <Button type="text" className="nav-button">
              Diagrams
            </Button>
          </Link>
        </div>
      </div>
    </AntdHeader>
  );
};

export default Header;
