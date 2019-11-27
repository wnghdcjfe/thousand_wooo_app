import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => { 
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register, 
    auth: auth.auth, 
    authError : auth.authError
  })); 

  const onChange = e => { 
    const { value, name } = e.target; 
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => { 
    e.preventDefault();
    const {username, password, passwordConfirm} = form; 
    if(password !== passwordConfirm){
      alert("비밀번호확인과 비밀번호가 서로 다릅니다.")
      return; 
    }
    dispatch(register({username, password}))
  };  

  useEffect(() => {  
    dispatch(initializeForm('register')); 
    if(authError || auth){
      authError ? console.error('회원가입실패') : console.log('회원가입 성공')
      console.log(authError || auth)
    }
  }, [auth, authError]); 
  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit} 
    />
  );
};

export default RegisterForm
