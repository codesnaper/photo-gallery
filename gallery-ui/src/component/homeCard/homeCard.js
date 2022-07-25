import React from "react";
import { Card, Col } from "react-bootstrap";

export class HomeCard extends React.Component{
    render(){
        return (
                <Col className="mb-lg-4 mb-3" lg="4" md="6" sm="12">
                <Card className="home-card">
                    <a href={this.props.href}>
                    <Card.Img className="home-card-image" alt={this.props.alt} src={this.props.src} />
                    <Card.ImgOverlay>
                        <Card.Title className="position-absolute bottom-0 start-50 translate-middle-x">
                            <h3 className="text-center">{this.props.name}</h3>
                        </Card.Title>
                    </Card.ImgOverlay>
                    </a>
                </Card>
                </Col>
        );
    }
}