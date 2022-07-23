import { MDBIcon, MDBTable, MDBTableBody, MDBTableHead ,MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {HeaderNavbar} from './../../navbar/navbar';
import {AddMemberModal} from './../modal/AddMember';
import {EditGroupModal} from './../modal/EditGroup';
import { DeleteGroupModal } from "../modal/DeleteGroup";
import { service } from "../../../service/ServiceContext";

class GroupHome extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modalShow: false,
            editModalShow: false,
            addGroup: false,
            deleteGroup: false,
            groups: [],
            index: -1
        }
    }

    setModalShow(modalStatus, index){
        this.setState({modalShow: modalStatus});
        this.setState({index: index});
    }

    setEditModalShow(modalStatus, index) {
        this.setState({editModalShow: modalStatus});
        this.setState({index: index});
    }

    setAddModalShow(modalStatus){
        this.setState({addGroup: modalStatus});
    }

    setDeleteGroupShow(status, index){
        this.setState({deleteGroup: status});
        this.setState({index: index});
    }

    componentDidMount(){
        this.loadGroups();
    }

    loadGroups(){
        return new Promise((resolve, reject) => {
            let allPromise = [];
            this.context.groupService.getGroups()
            .then(groupsData => {
                allPromise = groupsData.map((groupData) => {
                    return new Promise((resolve,reject) => {
                        this.context.userService.findUserByIDs(groupData.userid)
                        .then((userData) => {
                            groupData.users = userData;
                            resolve()
                        })
                        .catch(err => alert(JSON.stringify(err)));
                    });
                });
                Promise.all(allPromise)
                .then(() => this.setState({groups: groupsData}))
                .catch(err => console.log(err))
                
            })
        });
    }

    renderPagination(){
        return (
            <nav aria-label='...'>
                            <ul className='pagination mb-0'>
                                <li className='page-item disabled'>
                                <span className='page-link'>Previous</span>
                                </li>
                                <MDBPaginationItem>
                                <MDBPaginationLink href='#'>1</MDBPaginationLink>
                                </MDBPaginationItem>
                                <li className='page-item active' aria-current='page'>
                                <span className='page-link'>
                                    2<span className='visually-hidden'>(current)</span>
                                </span>
                                </li>
                                <MDBPaginationItem>
                                <MDBPaginationLink href='#'>3</MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem>
                                <MDBPaginationLink href='#'>Next</MDBPaginationLink>
                                </MDBPaginationItem>
                            </ul>
                            </nav>
        );
    }

    renderGroupData(){
        return(
            <>
            {this.state.groups && this.state.groups.map((group, index) => {return (
                <tr>
                <th scope="row">{index}</th>
                <td>{group.name}</td>
                <td>{group.userid.length}</td>
                <td>{group.password}</td>
                <td>
                    <Button className="m-2 mt-0 mb-0" variant="outline-primary" onClick={() => this.setModalShow(true, index)}>
                        Add Member
                    </Button>

                    <AddMemberModal
                        show={this.state.index === index && this.state.modalShow}
                        onHide={() => this.setModalShow(false, -1)}/>

                    <Button variant="outline-info" className="m-2 mt-0 mb-0" onClick={() => this.setEditModalShow(true,index)}>
                        View/Edit
                    </Button>

                    <EditGroupModal
                        group = {group}
                        title='View / Edit Group'
                        show={this.state.index == index && this.state.editModalShow}
                        onHide={() => this.setEditModalShow(false,-1)}/>

                    <Button variant="outline-danger" className="m-2 mt-0 mb-0" onClick={() => this.setDeleteGroupShow(true,index)}>
                        Delete
                    </Button>

                    <DeleteGroupModal
                        group = {group}
                        show={this.state.index == index && this.state.deleteGroup}
                        onHide={() => this.setDeleteGroupShow(false,-1)}/>
                </td>
                </tr>);
            })}
            </>
        );
    }

    renderTableFunction(){
        return (
            <tr>
                <th>

                </th>
                <th>
                    <Button variant="primary"  onClick={() => this.setAddModalShow(true)}>
                        <MDBIcon fas icon="plus" /> <span className="m-2">Add New Group</span>
                    </Button>
                    <EditGroupModal
                        title='Add New Group'
                        show={this.state.addGroup}
                        onHide={() => this.setAddModalShow(false)}/>
                </th>
            </tr>
        );
    }
    
    render(){
        return (
            <>
                <HeaderNavbar/>
                <Container>
                <Row>
                    <Col>
                    <MDBTable responsive>
                        <MDBTableHead>
                            {this.renderTableFunction()}
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Group Name</th>
                            <th scope="col">Member</th>
                            <th scope="col">Group Password</th>
                            <th scope="col">Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {this.renderGroupData()}
                        </MDBTableBody>
                        </MDBTable> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.renderPagination()}
                    </Col>
                </Row>
            </Container>
            </>
            
        );
    }
   
        
}

GroupHome.contextType = service;

export {GroupHome as default};