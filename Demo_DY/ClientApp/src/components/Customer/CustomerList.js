import React, { Component } from 'react';
import Modal from 'react-modal';
import AddEditCustomer from './AddEditCustomer';

//import {
//    Form,
//    Input
//} from "super-easy-react-forms";

const moment = require("moment");

export class CustomerList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Customers: [], loader: true, showForm: false, modalIsOpen: false, editFormData:{}, formType:"add" };
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        //this.handleAddCustomer = this.handleAddCustomer.bind(this);
    }

    componentDidMount() {        
        this.getCustomerData();
    }

    render() {

        const data = this.state.loader
            ? <p>Loading...</p>
            : this.fillGridWithData(this.state.Customers);

        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                width: '400px',
                height:'550px',
                transform: 'translate(-50%, -50%)',
            },
        };

        return (
            <div>
                <div style={{ paddingBottom: "7%", width: "100%" }}>
                    <button className="btn btn-primary" style={{ float: "right" }}
                        onClick={() => {
                            this.setState({ formType: "add", editFormData: {}})
                            this.showModal()
                        }} >Add customer</button> </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    //onAfterOpen={afterOpenModal}
                    onRequestClose={()=> this.closeModal()}
                    style={customStyles}
                    contentLabel="Customer"
                >
                    <AddEditCustomer
                        closeModal={() => this.closeModal()}
                        saveCustomer={(data) => this.saveCustomer(data)}
                        updateCustomerData={this.updateCustomerData}
                        editFormData={this.state.editFormData}
                        formType={this.state.formType}
                    />
                    
                </Modal>

                <div>
                    {data}
                </div>                
            </div>
        );
    }

    saveCustomer = async (data) => {
        console.log(data);
        await fetch('Customer/Add', {
            method: 'POST',
            body: JSON.stringify(data), //JSON.stringify(event),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async () => {
            await this.getCustomerData();
            this.closeModal();
        });
    }

    showModal = () => {
        console.log("show modal");
        this.setState({ modalIsOpen: true }, () => { console.log(this.state.modalIsOpen) });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    getCustomerData = async () => {
        fetch('Customer/getCustomer').then(res => res.json()).then(result => { this.setState({ Customers: result, loader: false }) });
    }

    updateCustomerData = async (updatedData) => {
        
        //const response = await fetch('Customer/Edit/');
        //const data = await response.json();        
        ////this.setState({ Customer: data, loading: false });

        console.log(updatedData);
        await fetch('Customer/Edit', {
            method: 'POST',
            body: JSON.stringify(updatedData), //JSON.stringify(event),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async () => {
            await this.getCustomerData();
            this.closeModal();
        });
    }

    editClick = (e, customerObj) => {
        this.setState({ editFormData: customerObj, formType:"edit" });
        this.showModal();
        console.log(customerObj);
    }

    deleteClick = async (e, customerId) => {
        await fetch('Customer/Delete/' + customerId)
            .then(() =>  this.getCustomerData());
    }

    fillGridWithData = (Customers) => {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>                        
                        <th>Birth Date</th>
                        <th>Business Name </th>
                        <th>Created Date</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {Customers.map(x =>
                        <tr key={x.customerId}>
                            <td>{x.firstName}</td>
                            <td>{x.lastName}</td>
                            <td>{moment.utc(x.dateofBirth).local().format('YYYY-MM-DD')}</td>
                            <td>{x.businessName}</td>
                            <td>{moment.utc(x.createdDate).local().format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td> <button className="btn btn-secondary" onClick={(e) => { this.deleteClick(e, x.customerId) }} >Delete</button> </td>
                            <td> <button className="btn btn-secondary" onClick={(e) => { this.editClick(e, x) }}  >Edit </button> </td>
                        </tr>
                    )}
                </tbody>
            </table >
        );
    }    
}
