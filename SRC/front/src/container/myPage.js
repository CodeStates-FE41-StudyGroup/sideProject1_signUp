import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputLayout from '../component/inputLayout';
import Button from '../component/button';
import DropDown from '../component/dropDown';
import RadioButton from '../component/radioButton';
import TextArea from '../component/textArea';
import TextInput from '../component/textInput';
import counrtyCode from '../data/countryCode';
import gender from '../data/gender';
import emailFrom from '../data/emailForm';
import axios from 'axios';

const MyPageContainer = styled.div`
  width: 30rem;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyPageForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    margin: 0 0.5rem;
  }
`;

export default function MyPage({ userInfo, setUserInfo, onChangeUserInfo }) {
  // 전화번호 처리를 위한 state 및 event handler
  const [phoneFront, setPhoneFront] = useState(userInfo.phone[1].slice(0, 3));
  const [phoneMiddle, setPhoneMiddle] = useState(userInfo.phone[1].slice(4, 8));
  const [phoneBack, setPhoneBack] = useState(userInfo.phone[1].slice(9));
  const onChangePhoneNumber = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'phone_front':
        setPhoneFront(value);
        break;

      case 'phone_middle':
        setPhoneMiddle(value);
        break;

      case 'phone_back':
        setPhoneBack(value);
        break;
    }
  };

  // e-mail 직접입력 여부 및 처리를 위한 state 및 event handlers
  const [isDirectlyInput, setIsDirectlyInput] = useState(false);
  const [emailFront, setEmailFront] = useState(userInfo.email.split('@')[0]);
  const [emailBack, setEmailBack] = useState(userInfo.email.split('@')[1]);
  const onChangeEmailDropDown = (e) => {
    const { value } = e.target;
    if (value === 'enterDirectly') {
      setEmailBack('');
      setIsDirectlyInput(true);
    } else {
      setEmailBack(value);
      setIsDirectlyInput(false);
    }
  };
  const onChangeEmailFull = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email_front':
        setEmailFront(value);
        break;

      case 'email_back':
        setEmailBack(value);
        break;
    }
  };

  // '자기소개'를 제외하고, 비어있는 항목이 있는지 확인
  const [isComplete, setIsComplete] = useState(true);
  useEffect(() => {
    if (
      userInfo.username &&
      userInfo.password &&
      userInfo.gender &&
      userInfo.dateOfBirth.year &&
      userInfo.dateOfBirth.month &&
      userInfo.dateOfBirth.day &&
      userInfo.phone[0] &&
      phoneFront &&
      phoneMiddle &&
      phoneBack &&
      emailFront &&
      emailBack
    ) {
      setIsComplete(true);
      setUserInfo({
        ...userInfo,
        email: `${emailFront}@${emailBack}`,
        phone: [userInfo.phone[0], `${phoneFront}-${phoneMiddle}-${phoneBack}`],
      });
    } else {
      setIsComplete(false);
    }
  }, [phoneFront, phoneMiddle, phoneBack, emailFront, emailBack]);

  // 수정하기 버튼 구현
  const reviseButtonHandler = async (e) => {
    e.preventDefault();
    if (isComplete) {
      await axios({
        method: 'put',
        url: `http://localhost:4000/userinfo/${userInfo.username}`,
        data: userInfo,
      })
        .then((res) => {
          console.log(res.data);
          alert('수정이 완료되었습니다.');
        })
        .catch((error) => console.error(error));
    }
  };

  // 홈으로 가기 버튼 구현
  const navigate = useNavigate();
  const goHomeButton = () => {
    navigate('/');
  };

  return (
    <>
      <h2 className="page__title">마이페이지</h2>
      <MyPageContainer className="signup__container">
        <MyPageForm>
          <InputLayout className="form__input--username" label="아이디">
            <TextInput
              type="text"
              name="username"
              value={userInfo.username}
              disabled={true}
            />
          </InputLayout>

          <InputLayout className="form__input--password" label="비밀번호">
            <TextInput
              type="password"
              name="password"
              defaultValue={userInfo.password}
              onChangeEvent={onChangeUserInfo}
              placeholder="비밀번호를 입력해주세요."
            />
          </InputLayout>

          <InputLayout className="form__input--birth" label="생년월일">
            <TextInput
              type="date"
              name="dateOfBirth"
              value={`${userInfo.dateOfBirth.year}-${userInfo.dateOfBirth.month}-${userInfo.dateOfBirth.day}`}
              onChangeEvent={onChangeUserInfo}
            />
          </InputLayout>

          <InputLayout className="form__input--gender" label="성별">
            <RadioButton
              radioName="성별"
              name="gender"
              defaultValue={userInfo.gender}
              onChangeEvent={onChangeUserInfo}
              radioList={gender}
            />
          </InputLayout>

          <InputLayout className="form__input--email" label="이메일">
            <TextInput
              name="email_front"
              defaultValue={emailFront}
              onChangeEvent={onChangeEmailFull}
              type="text"
              margin="0 0.25rem 0 0"
            />
            @
            <TextInput
              name="email_back"
              defaultValue={emailBack}
              onChangeEvent={onChangeEmailFull}
              disabled={!isDirectlyInput}
              type="text"
              margin="0 0.5rem 0 0.25rem"
            />
            <DropDown
              optionList={emailFrom}
              defaultValue={emailBack}
              onChangeEvent={onChangeEmailDropDown}
            />
          </InputLayout>

          <InputLayout className="form__input--phone" label="전화번호">
            <DropDown
              optionList={counrtyCode}
              defaultValue={userInfo.phone[0]}
              name="countryCode"
              onChangeEvent={onChangeUserInfo}
              margin="0 0.5rem 0 0"
            />
            <TextInput
              name="phone_front"
              defaultValue={phoneFront}
              onChangeEvent={onChangePhoneNumber}
              type="text"
              margin="0 0.25rem 0 0"
            />
            -
            <TextInput
              name="phone_middle"
              defaultValue={phoneMiddle}
              onChangeEvent={onChangePhoneNumber}
              type="text"
              margin="0 0.25rem 0"
            />
            -
            <TextInput
              name="phone_back"
              defaultValue={phoneBack}
              onChangeEvent={onChangePhoneNumber}
              type="text"
              margin="0 0 0 0.25rem"
            />
          </InputLayout>

          <InputLayout className="form__input--introduction" label="자기소개">
            <TextArea
              name="introduction"
              defaultValue={userInfo.introduction}
              placeholder="간단한 자기소개를 입력해주세요."
              onChangeEvent={onChangeUserInfo}
              height="4rem"
            />
          </InputLayout>
        </MyPageForm>
        <ButtonContainer className="button__container">
          <Button buttonName="홈으로" buttonEvent={goHomeButton} width="40%" />
          <Button
            buttonName="수정하기"
            buttonEvent={reviseButtonHandler}
            width="40%"
          />
        </ButtonContainer>
      </MyPageContainer>
    </>
  );
}
