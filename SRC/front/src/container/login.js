import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import InputLayout from '../component/inputLayout';
import TextInput from '../component/textInput';
import Button from '../component/button';

const LoginContainer = styled.div`
  width: 20rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > a {
    width: 100%;
  }
`;

const LoginForm = styled.form`
  width: 100%;
  margin-top: 1.5rem;
`;

const CautionMessage = styled.div`
  display: flex;
  align-items: center;
  color: #ff4000;
  height: 2rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
  font-size: 14px;
`;

export default function Login({ onChangeUserInfo, userInfo, setUserInfo }) {
  // 로그인 후 페이지 전환을 하기 위해 react-router-dom의 useNavigate hook을 사용
  const navigate = useNavigate();

  // 아이디 혹은 비밀번호가 잘못되었을 때의 모달을 위한 state
  const [isAlight, setIsAlight] = useState(true);

  // ajax를 통해 아이디와 비밀번호를 서버에 전송
  const loginbuttonClick = async (e) => {
    e.preventDefault();
    await axios({
      method: 'get',
      url: 'http://localhost:4000/userinfo/loginCondition',
      params: {
        username: userInfo.username,
        password: userInfo.password,
      },
    })
      .then((res) => {
        setUserInfo(res.data);
        setIsAlight(true);
        navigate('/mypage');
      })
      .catch((error) => {
        console.error(error);
        setIsAlight(false);
      });
  };

  // 가입하기 버튼 구현
  const signupButtonClick = () => {
    navigate('/signup');
  };

  // 아이디 및 비밀번호 입력 후 'Enter'를 누르면 바로 로그인
  const onKeyDownEvent = (e) => {
    if (e.key === 'Enter') {
      loginbuttonClick(e);
    }
  };

  return (
    <LoginContainer className="login__container">
      <h2 className="page__title">로그인</h2>
      <LoginForm action="" method="get" className="login__form">
        <InputLayout
          className="login__input--name"
          label="아이디"
          for="username"
          width="20rem"
        >
          <TextInput
            type="text"
            name="username"
            id="username"
            placeholder="아이디를 입력하세요"
            onChangeEvent={onChangeUserInfo}
            required={true}
          ></TextInput>
        </InputLayout>
        <InputLayout
          className="login__input--password"
          label="비밀번호"
          for="password"
          width="20rem"
        >
          <TextInput
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            onChangeEvent={onChangeUserInfo}
            required={true}
            onKeyDownEvent={onKeyDownEvent}
          ></TextInput>
        </InputLayout>
      </LoginForm>
      {isAlight ? null : (
        <CautionMessage>
          {
            '아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'
          }
        </CautionMessage>
      )}
      <Button
        className="login__button"
        buttonName="로그인"
        buttonEvent={loginbuttonClick}
        width="100%"
        margin="0 0 1rem"
      ></Button>
      <Button
        className="signup__button"
        buttonName="계정이 없으신가요? 가입하기"
        buttonEvent={signupButtonClick}
        width="100%"
      ></Button>
    </LoginContainer>
  );
}
