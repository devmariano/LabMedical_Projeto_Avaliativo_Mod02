import {FormLoginComponent} from '../components/Form/Login/Login.component';
import * as Styled from './Login.style';

import { Container, Row, Col } from 'react-bootstrap'



export const LoginPage = () => {
 
    return(
        <>
        <Container fluid className='g-0'>
        <Row className='g-0'>  
        <Col md={8} className="d-none d-md-flex" >
            <Styled.bgImage/>
        </Col>
        <Col md={4} >
            <Styled.Login>
            <FormLoginComponent/>
            </Styled.Login>
        </Col>
        </Row>
        </Container>    
        </>
    )
}  