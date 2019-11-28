import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import {withRouter} from 'react-router-dom';

const RegisterForm = ({history}) => { 
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register, 
    auth: auth.auth, 
    authError : auth.authError, 
    user : user.user
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
  }, [dispatch]); 
  
  useEffect(() => {  
    if(authError){
      console.log('오류 발생')
      console.log(authError)
    }
    if(auth){
      console.log('회원가입 성공')
      console.log(auth)  
      dispatch(check())
    } 
  }, [auth, authError, dispatch]); 

  
  useEffect(() => {  
    if(user){
      console.log('check 성공', user) 
    } 
  }, [user]);  

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit} 
    />
  );
};

export default withRouter(RegisterForm)
