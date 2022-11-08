import React from 'react';
import Button from '../component/button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CompletedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  width: 30rem;
  margin: 0 auto;
`;

const CompletedMessageDiv = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
`;

const MainColorStrong = styled.strong`
  color: rgb(52, 152, 219);
  font-size: 1.2rem;
  padding: 0.3rem;
`;

export default function SignUpCompleted(props) {
  const navigate = useNavigate();
  const goHomeButton = () => {
    navigate('/');
  };

  return (
    <CompletedContainer className="signup__completed__container">
      <CompletedMessageDiv>
        안녕하세요<MainColorStrong>{props.username}</MainColorStrong>님!
      </CompletedMessageDiv>
      <CompletedMessageDiv>회원가입이 완료되었습니다.</CompletedMessageDiv>
      <Button
        buttonName="로그인하기"
        buttonEvent={goHomeButton}
        margin="1rem 0 0"
      />
    </CompletedContainer>
  );
}
