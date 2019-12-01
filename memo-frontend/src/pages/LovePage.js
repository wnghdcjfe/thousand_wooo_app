import React from 'react';  
import './love.css'
import HeaderContainer from '../containers/common/HeaderContainer';  
const importAll = r => r.keys().map(r); 
const images = importAll(require.context('../image', false, /\.(png|jpe?g|svg|gif)$/)); 
  
const LovePage = () => {
  return ( 
    <>
    <HeaderContainer /> 
    {images.map(img => <div className="imgWrapper"key={img}><img src={img}></img></div>)} 
    </>
  );
};

export default LovePage; 

