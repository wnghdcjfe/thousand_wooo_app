import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, login} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';  
import { check } from '../../modules/user';

const LoginForm = ({ history }) => { 
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login, 
    auth : auth.auth,  
    authError : auth.authError, 
    user : user.user
  })); 
  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault(); 
    const {username, password} = form; 
    dispatch(login({username, password}))
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]); 


  useEffect(() => {  
    console.log(authError, auth)
    if(authError){  
      console.log(authError)
      setError(authError.response.data.message); 
      return;
    }
    if(auth){
      console.log('로그인 성공!')
      console.log(auth) 
      dispatch(check())
    } 
  }, [auth, authError, dispatch]); 
  useEffect(() => {
    console.log(user)
    if(user){
      history.push('/');
      try{
        localStorage.setItem('user', JSON.stringify(user));
      }catch(e){
        console.log('로컬스토리지 애러')
      }
    }
  }, [history, user])
 
  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);
