import React from 'react'
import styled from 'styled-components'

import palette from '../../lib/styles/palette'
import { Link } from 'react-router-dom'

const AuthTemplateWrapper = styled.div`
position:absolute; 
left: 0; 
top:0; 
width: 100%;
height: 100%;
background: ${palette.gray[2]};
display : flex; 
flex-direction : column; 
justify-content:center; 
align-items: center;
`;
const Whitebox = styled.div`
.logo-area{
    display : block; 
    padding-bottom :2rem;
    text-align: center; 
    font-weight : bold;
    letter-spacing :2px;
}
box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
padding: 2rem; 
width: 360px; 
background : white;
border-radius : 2px;
`

const AuthTemplate = ({children}) =>{
    return (
        <AuthTemplateWrapper>
            <Whitebox>
                <div className="logo-area">
                    <Link to= "/">솔방이 메모장</Link>
                </div>
            {children}
            </Whitebox> 
        </AuthTemplateWrapper>
    )
}
export default AuthTemplate; 