import React, { Component } from 'react';
import {
    Form,    
} from "super-easy-react-forms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const moment = require("moment");

export default class AddEditCustomer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            formData: this.props.editFormData
        };
    }

    setFormData = (e, fldObj) => {
        console.log(fldObj);
        this.setState({ formData: { ...this.state.formData, ...fldObj } });
    }
    
    render() {        
        return (
            <div>
                <Form onSubmit={() => {
                    this.props.formType == "add" ? this.props.saveCustomer(this.state.formData) : this.props.updateCustomerData(this.state.formData)
                }}>
                    <div><b> First Name  </b></div>
                    <input
                        name="firstName"                        
                        label="First Name"                        
                        value={this.state.formData.firstName}
                        onChange={(e) => {
                            console.log("in on change");
                            this.setFormData(e, { "firstName": e.target.value });
                        }}
                        required
                    />
                    <br />
                    <br />
                    <div><b> Last Name  </b></div>
                    <input
                        name="lastName"
                        label="Last Name"                        
                        value={this.state.formData.lastName}
                        onChange={(e) => {
                            this.setFormData(e, { "lastName": e.target.value });
                        }}
                        required
                    />
                    <br />
                    <br />
                    <div><b> Birth Date  </b></div>
                    <div style={{ width: "190px" }}                        >
                        <DatePicker
                            name="dateOfBirth"
                            dateFormat="yyyy-MM-dd"
                            selected={moment.utc(this.state.formData.dateofBirth).local().toDate()}
                            onChange={(date) => {
                                date = !date ? moment.utc().local().toDate() : date
                                this.setFormData(null, { "dateofBirth": date });
                            }}                        
                            required
                            />
                    </div>                    
                    <br />
                    <div><b> Business Name  </b></div>
                    <input
                        name="businessName"
                        label="Business Name"                      
                        value={this.state.formData.businessName}
                        onChange={(e) => {
                            this.setFormData(e, { "businessName": e.target.value });
                        }}
                        required
                    />
                    <br />
                    <br />
                    <button onClick={this.props.closeModal} style={{ marginLeft: "1%", marginRight: "2%" }}>Close</button>
                </Form>
            </div>
        );
    }    
}