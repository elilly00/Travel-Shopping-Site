/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_SERVER } from '../../../../Config';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const items = [
  {
    label: 'Menu',
    key: 'SubMenu',
    icon: <MenuOutlined />,
    children: [
      { 
        label: <a href='/blog'>Blogs</a>, 
      },
      {
        label: <a href='/login'>Singin</a>,
      },
      {
        label: <a href='/register'>Signup</a>,
      },
    ]
  }
];

const logInItems = [
  { 
    label: 'Menu',
    key: 'SubMenu',
    icon: <MenuOutlined />, 
    children: [
      {
        label: <a href="/product/upload">upload</a>,
        
      },
      {
        label: <a href="/">logout</a>,
        key: 'logout',
      }
    ]
  },
];

function RightMenu(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert("Logout Failed");
      }
    });
  };

  if(user.userData && !user.userData.isAuth) {
    return <Menu mode="horizontal" items={items} />;
  } else {
    return (
      <Menu mode="horizontal" items={logInItems} onClick={logoutHandler} />
    );
  }
}

export default RightMenu;