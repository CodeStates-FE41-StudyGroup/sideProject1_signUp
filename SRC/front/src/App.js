import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './container/login.js';
import MyPage from './container/myPage.js';
import SignUp from './container/signUp.js';
import SignUpCompleted from './container/signUpCompleted';
import styled from 'styled-components';

const MainTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  border: 1px solid #f5f5f5;
`;

function App() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    dateOfBirth: {
      year: '',
      month: '',
      day: '',
    },
    gender: '',
    email: '',
    phone: ['', ''],
    introduction: '',
  });

  const onChangeUserInfo = (e) => {
    const { name, value } = e.target;
    const phoneNumb = userInfo.phone;
    switch (name) {
      case 'dateOfBirth':
        setUserInfo({
          ...userInfo,
          [name]: {
            year: value.slice(0, 4),
            month: value.slice(5, 7),
            day: value.slice(8),
          },
        });
        break;

      case 'countryCode':
        setUserInfo({
          ...userInfo,
          phone: [value, phoneNumb[1]],
        });
        break;

      default:
        setUserInfo({
          ...userInfo,
          [name]: value,
        });
        break;
    }
  };
  return (
    <Router>
      <MainTitle className="main__title">Study Group Side Project 1</MainTitle>
      <Routes className="main__body">
        <Route
          path="/"
          element={
            <Login
              onChangeUserInfo={onChangeUserInfo}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        ></Route>
        <Route
          path="/mypage"
          element={
            <MyPage
              onChangeUserInfo={onChangeUserInfo}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <SignUp
              onChangeUserInfo={onChangeUserInfo}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        ></Route>
        <Route
          path="/signupcompleted"
          element={<SignUpCompleted username={userInfo.username} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
