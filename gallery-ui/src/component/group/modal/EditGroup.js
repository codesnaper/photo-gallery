import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { Button, Modal } from "react-bootstrap";

export class EditGroupModal extends React.Component {

    render(){
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="editgroup"
                centered
                >
                    <form class="needs-validation" novalidate>
                <Modal.Header closeButton>
                    <Modal.Title id="editgroup">
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row g-3">
                    <div class="col-6">
                        <label for="validationCustom01" class="form-label">Group Name</label>
                        {this.props.group != null ?
                            <input type="text" class="form-control" id="validationCustom01" required value={this.props.group.name}/>
                            :<input type="text" class="form-control" id="validationCustom01" required />                        
                        }
                        <div class="invalid-feedback">
                            Provide Group Name 
                        </div>
                    </div>
                    <div class="col-6">
                        <label for="validationCustom02" class="form-label">Total Member</label>
                        {this.props.group != null ?
                            <input type="number" class="form-control" id="validationCustom02" required value={this.props.group.userid.length} disabled/>
                            :<input type="number" class="form-control" id="validationCustom02" required value = "0" disabled/>                        
                        }
                    </div>
                    <div class="col-6">
                        <label for="validationCustom03" class="form-label">Group Password</label>
                        {this.props.group != null ?
                            <input type="password" class="form-control" id="validationCustom03" required value={this.props.group.password} />
                            :<input type="password" class="form-control" id="validationCustom03" required />                        
                        }
                        <div class="invalid-feedback">
                            Provide Password
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="validationCustom04" class="form-label">User</label>
                        <select class="form-select" multiple aria-label="select example">
                        {this.props.group && this.props.group.users.length !=0 ?
                             this.props.group.users.map((user, index) => {return (
                            <option value={user.id}>{user.name} {user.lastname}
                            </option>
                        )}):
                            <option value="" selected>There are no member in the group.</option>
                        }
                        </select>
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button class="btn btn-primary" type="submit">Add Member</button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                </form> 
                </Modal>
        );
    }
}