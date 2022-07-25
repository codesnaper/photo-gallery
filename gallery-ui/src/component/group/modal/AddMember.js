import React from "react";
import { Button, Modal } from "react-bootstrap";

export class AddMemberModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {anonymous: false}
    }

    handleChange(event){
        if(event.target.name === 'anonymous'){
            this.setState({anonymous: !this.state.anonymous}); 
        }
       
    } 

    render(){
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <form class="needs-validation" novalidate>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Member
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row g-3">
                    <div class="col-12">
                        <div class="form-check form-switch">
                            <input class="form-check-input form-control"  onChange={e=> this.handleChange(e)} name="anonymous" type="checkbox" id="flexSwitchCheckChecked" />
                            <label class="form-check-label"  for="flexSwitchCheckChecked">Anonymous User</label>
                        </div> 
                        <p class="text-muted">
                            Checkmark if user is not available in application.
                        </p>                                 
                    </div>
                    {!this.state.anonymous &&
                    <div class="col-12">
                        <label for="validationCustom02" class="form-label">Select User</label>
                        <select class="form-select form-select-lg mb-3 form-control" id="validationCustom02"  required aria-label=".form-select-lg example">
                            <option selected>Click to select user</option>
                            <option value="1">user1</option>
                            <option value="2">user2</option>
                            <option value="3">user3</option>
                        </select>
                    </div>}
                    {this.state.anonymous &&
                        <>
                            <div class="col-12 ">
                        <label for="validationCustomUsername" class="form-label">Email</label>
                        <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="email" onChange={this.handleChange} class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
                        <div class="invalid-feedback">
                            Email Required for anonymous user
                        </div>
                        </div>
                        </div>
                        <p class="text-muted">
                                User can login with their email and member password set.
                            </p>
                        <div class="col-md-12">
                            <label for="validationCustom03" class="form-label">Nick Name</label>
                            <input type="text" class="form-control" id="validationCustom03" required/>
                            <div class="invalid-feedback">
                                Provide Nick Name.
                            </div>
                        </div>
                        </>
                    }
                    
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