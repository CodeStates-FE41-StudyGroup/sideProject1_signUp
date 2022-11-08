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

const SignUpContainer = styled.div`
  width: 30rem;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CautionMessage = styled.div`
  display: flex;
  align-items: center;
  color: #ff4000;
  height: 2rem;
  font-weight: 500;
`;

export default function SignUp({ userInfo, setUserInfo, onChangeUserInfo }) {
  // 회원가입 후 페이지 전환을 위해 react-router-dom의 useNavigate hook 사용
  const navigate = useNavigate();

  // 아이디 유효성 검사 및 중복 확인
  const [isAvailableUsername, setIsAvailableUsername] = useState(true);
  const [isDuplicatedUsername, setIsDuplicatedUsername] = useState(false);
  const duplicateCheckHandler = async (e) => {
    e.preventDefault();
    if (/^[A-Za-z0-9]{5,}$/.test(userInfo.username)) {
      setIsAvailableUsername(true);
      await axios({
        method: 'get',
        url: 'http://localhost:4000/userinfo/duplicateCheckCondition',
        params: {
          username: userInfo.username,
        },
      })
        .then((res) => {
          console.log(res.data.message);
          alert('사용 가능한 아이디입니다.');
          setIsDuplicatedUsername(false);
        })
        .catch((err) => {
          console.error(err);
          setIsDuplicatedUsername(true);
        });
    } else {
      setIsAvailableUsername(false);
    }
  };

  // 전화번호 처리를 위한 state 및 event handler
  const [phoneFront, setPhoneFront] = useState('');
  const [phoneMiddle, setPhoneMiddle] = useState('');
  const [phoneBack, setPhoneBack] = useState('');
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
  const [emailFront, setEmailFront] = useState('');
  const [emailBack, setEmailBack] = useState('');
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

  // 가입하기 버튼 구현
  const signupButtonHandler = async (e) => {
    e.preventDefault();
    if (isComplete) {
      await axios({
        method: 'post',
        url: 'http://localhost:4000/userinfo/',
        data: userInfo,
      })
        .then((res) => {
          console.log(res.data.message);
          navigate('/signupcompleted');
        })
        .catch((error) => console.error(error));
    } else {
      alert(`필수 항목들을 모두 입력해주세요.`);
    }
  };

  return (
    <>
      <h2 className="page__title">회원가입</h2>
      <SignUpContainer className="signup__container">
        <SignUpForm>
          <InputLayout className="form__input--username" label="아이디">
            <TextInput
              type="text"
              name="username"
              onChangeEvent={onChangeUserInfo}
              placeholder="아이디를 입력해주세요."
            />
            <Button
              buttonName="중복확인"
              buttonEvent={duplicateCheckHandler}
              margin="0 0 0 0.5rem"
            />
          </InputLayout>
          {isAvailableUsername ? (
            isDuplicatedUsername ? (
              <CautionMessage>중복된 아이디입니다.</CautionMessage>
            ) : null
          ) : (
            <CautionMessage>
              아이디는 영문과 숫자를 포함한 5자 이상으로 입력해주세요.
            </CautionMessage>
          )}

          <InputLayout className="form__input--password" label="비밀번호">
            <TextInput
              type="password"
              name="password"
              onChangeEvent={onChangeUserInfo}
              placeholder="비밀번호를 입력해주세요."
            />
          </InputLayout>

          <InputLayout className="form__input--birth" label="생년월일">
            <TextInput
              type="date"
              name="dateOfBirth"
              onChangeEvent={onChangeUserInfo}
            />
          </InputLayout>

          <InputLayout className="form__input--gender" label="성별">
            <RadioButton
              radioName="성별"
              name="gender"
              onChangeEvent={onChangeUserInfo}
              radioList={gender}
            />
          </InputLayout>

          <InputLayout className="form__input--email" label="이메일">
            <TextInput
              name="email_front"
              onChangeEvent={onChangeEmailFull}
              type="text"
              margin="0 0.25rem 0 0"
            />
            @
            <TextInput
              name="email_back"
              onChangeEvent={onChangeEmailFull}
              value={emailBack}
              disabled={!isDirectlyInput}
              type="text"
              margin="0 0.5rem 0 0.25rem"
            />
            <DropDown
              optionList={emailFrom}
              onChangeEvent={onChangeEmailDropDown}
            />
          </InputLayout>

          <InputLayout className="form__input--phone" label="전화번호">
            <DropDown
              optionList={counrtyCode}
              name="countryCode"
              onChangeEvent={onChangeUserInfo}
              margin="0 0.5rem 0 0"
            />
            <TextInput
              name="phone_front"
              onChangeEvent={onChangePhoneNumber}
              type="text"
              margin="0 0.25rem 0 0"
            />
            -
            <TextInput
              name="phone_middle"
              onChangeEvent={onChangePhoneNumber}
              type="text"
              margin="0 0.25rem 0"
            />
            -
            <TextInput
              name="phone_back"
              onChangeEvent={onChangePhoneNumber}
              type="text"
              margin="0 0 0 0.25rem"
            />
          </InputLayout>

          <InputLayout className="form__input--introduction" label="자기소개">
            <TextArea
              name="introduction"
              placeholder="간단한 자기소개를 입력해주세요."
              onChangeEvent={onChangeUserInfo}
              height="4rem"
            />
          </InputLayout>
        </SignUpForm>
        <Button buttonName="가입하기" buttonEvent={signupButtonHandler} />
      </SignUpContainer>
    </>
  );
}
