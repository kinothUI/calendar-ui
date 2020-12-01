import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Brandbutton = () => (
  <Menu.Item position="left" className="brand-button-container" header as={Link} to="/">
    <div className="brand-button" />
  </Menu.Item>
);

export default Brandbutton;
