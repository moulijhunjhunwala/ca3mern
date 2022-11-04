import React from 'react'
import { Container, Row } from 'react-bootstrap';
import './MainScreen.css';

const MainScreen = ({title, children}) => {
  return (
    <div className="main-screen-back">
        <Container>
            <Row style={{textTransform: 'capitalize'}}>
                {title && <>
                    <h1>{title}</h1>
                    <hr></hr>
                </>}
                {children}
            </Row>
        </Container>
    </div>
  )
}

export default MainScreen