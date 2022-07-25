import React from 'react';
import {HeaderNavbar} from './../navbar/navbar'
import {HomeCard} from './../homeCard/homeCard';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectGroup: false,
            isAnonymous: false
        };
    }
    
    
    render(){
        return (
            <div className='home'>
                <>
                    <HeaderNavbar selectGroup={this.state.selectGroup}/>
                    <Container className='mt-2 mt-lg-4'>
                        <Row>
                            <Col>
                            <MDBCard>
                                <MDBCardBody className='mt-3 mb-3 ml-3'>
                                <h3 className='text-center'>Welcome <b>Shubham Khandelwal</b> !!!</h3>
                                        {this.state.isAnonymous && !this.state.selectGroup?
                                        <h4 className='text-center'>Member of <b>Shubham group</b> !!!</h4>:''}
                                        {this.state.selectGroup ?
                                         <Container>
                                            <Row className="justify-content-md-center mb-4"><Col lg="4" md="6" sm="12"><div class="form-floating">
                                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                <option selected>Shubham Group 1</option>
                                                <option value="1">Shubham Group 2</option>
                                            </select>
                                            <label>Select Groups</label>
                                            </div>
                                            </Col>
                                            </Row>
                                            </Container>
                                            :''}
                                </MDBCardBody>
                            </MDBCard>
                            </Col>
                        </Row>
                        <Row className='mt-2 mt-lg-4'>
                            {!this.state.selectGroup ? <HomeCard alt="image" href = "group" name = "Pics" src="image/image.svg"></HomeCard>:'' }
                            {!this.state.selectGroup ? <HomeCard alt="video" href = "group" name = "Video" src="image/video.png"></HomeCard>:'' }
                            {!this.state.selectGroup ? <HomeCard alt="video" href = "group" name = "Upload Pic/ Video" src="image/video.png"></HomeCard>:'' }
                            {this.state.isAnonymous ? '': <HomeCard alt="group" href = "group" name = "Groups" src="image/group.png"></HomeCard>}
                            {this.state.isAnonymous ? '': <HomeCard alt="image" href = "group" name = "Share" src="image/image.svg"></HomeCard>}
                            {this.state.isAnonymous ? '': <HomeCard alt="image" href = "group" name = "Member" src="image/image.svg"></HomeCard>}
                            {this.state.isAnonymous ? '': <HomeCard alt="image" href = "group" name = "Setting" src="image/image.svg"></HomeCard>}
                        </Row>
                    </Container>
                </>
            </div>
        );
    }
}

export {Home as default};