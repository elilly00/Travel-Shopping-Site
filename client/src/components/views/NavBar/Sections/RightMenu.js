/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Menu } from "antd";
import { MenuOutlined } from '@ant-design/icons';
// import axios from "axios";
// import { USER_SERVER } from "../../../../Config";
// import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";

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
        label: <a href='/login'>Login</a>,
      },
      {
        label: <a href='/register'>Signup</a>,
      },
    ]
  }
];

function RightMenu(props) {
  // const [current, setCurrent] = useState('mail');
  // const onClick = (e) => {
    //   console.log('click ', e);
    //   setCurrent(e.key);
    // };
    
    // const user = useSelector((state) => state.user);

  return <Menu mode="horizontal" items={items} />;
  // const logoutHandler = () => {
  //   axios.get(`${USER_SERVER}/logout`).then((response) => {
  //     if (response.status === 200) {
  //       props.history.push("/login");
  //     } else {
  //       alert("Log Out Failed");
  //     }
  //   });
  // };

//   if (user.userData && !user.userData.isAuth) {
//     return (
//       <Menu mode={props.mode}>
//         <Menu.Item key="mail">
//           <a href="/login">Signin</a>
//         </Menu.Item>
//         <Menu.Item key="app">
//           <a href="/register">Signup</a>
//         </Menu.Item>
//       </Menu>
//     );
//   } else {
//     return (
//       <Menu mode={props.mode}>
//         <Menu.Item key="upload">
//           <a href="/product/upload">Upload</a>
//         </Menu.Item>
//         <Menu.Item key="logout">
//           <a onClick={logoutHandler}>Logout</a>
//         </Menu.Item>
//       </Menu>
//     );
//   }
}

export default RightMenu;