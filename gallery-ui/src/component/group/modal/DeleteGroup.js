import React from "react";
import { Button, Modal } from "react-bootstrap";

export class DeleteGroupModal extends React.Component {

    render(){
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Group : <b>'{this.props.group.name}'</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this group: '{this.props.group.name}' ?</p>
                    <p>
                        <span>Group has total <b>{this.props.group.userid.length}</b> member.</span><br/>
                        <span>All the member will loose the access to pic and video share to them on this group.</span><br/>
                        <span>If memeber is not registered with our application they will loose the access.</span>
                    </p>
                    
                </Modal.Body>
                <Modal.Footer>
                    <button class="btn btn-danger" type="submit">Delete</button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                </Modal>
        );
    }
}