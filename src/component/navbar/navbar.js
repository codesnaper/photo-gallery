import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export class HeaderNavbar extends React.Component{

    render() {
        return (
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="#home">Photo Apps</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                  <Nav.Link href="#link">Favourite</Nav.Link>
                    {!this.props.selectGroup && 
                    <NavDropdown title="Album" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Group Album</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Own Album
                    </NavDropdown.Item>
                    </NavDropdown>
                    }
                    {!this.props.selectGroup && 
                    <NavDropdown title="Share" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Shared Pic</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Shared Video
                    </NavDropdown.Item>
                    </NavDropdown>
                    }
                    
                    
                  </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                {!this.props.selectGroup && 
                    <NavDropdown title="Notification" id="basic-nav-dropdown">
                    <NavDropdown.Divider />
                    <NavDropdown.Item>No Notifiaction</NavDropdown.Item>
                </NavDropdown>
                    }
                <Navbar.Text>
                    Signed in as: <a href="#login">Shubham Khandelwal</a>
                </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          );
    }
}