import React from 'react';   
import styled from 'styled-components';
import HeaderContainer from '../containers/common/HeaderContainer';  
const importAll = r => r.keys().map(r); 
const images = importAll(require.context('../image', false, /\.(png|jpe?g|svg|gif)$/)); 

const ImgWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto; 
  & > img{
    width: 100%; 
  } 
`
const LovePage = () => {
  return ( 
    <>
    <HeaderContainer /> 
    {images.map(img => <ImgWrapper key={img}><img src={img}></img></ImgWrapper>)} 
    </>
  );
};

export default LovePage; 

