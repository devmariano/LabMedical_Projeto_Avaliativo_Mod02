import {FormLoginComponent} from '../../components/Form/Login/Login.component';
import * as Styled from './Login.style';

import { Container, Row, Col } from 'react-bootstrap'



export const LoginPage = () => {
 
    return(
        <>
        <Container fluid className='g-0'>
        <Row className='g-0'>  
        <Col className="d-none d-md-flex" >
            <Styled.bgImage/>
        </Col>
        <Col className="col-md-auto ml-auto">
            <Styled.Login>
            <FormLoginComponent/>
            </Styled.Login>
        </Col>
        </Row>
        </Container>    
        </>
    )
}  