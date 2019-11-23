import React from 'react'; 
import {Route}from 'react-router-dom'
import PostListPage from './pages/PostListPage'
import LoginPage from './pages/LoginPage'
import PostPage from './pages/PostPage'
import WriterPage from './pages/WriterPage'
import RegisterPage from './pages/RegisterPage' 
import './App.css';

function App() {
  return (
    <>
      <Route component={PostListPage} path = {['/@:username', '/']} exact/>
      <Route component={LoginPage} path = '/login' /> 
      <Route component={RegisterPage} path = '/register' />
      <Route component={WriterPage} path = '/write' /> 
      <Route component={PostPage} path = '/@:username/:postId' />
    </> 
  );
}

export default App;
