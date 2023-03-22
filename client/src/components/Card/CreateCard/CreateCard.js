import React from 'react'
import CARD_SERVICE from "../../../services/CardService"
import { MdWork, MdLocationOn, MdWeb, MdPayment, MdDriveEta, MdContactMail } from "react-icons/md";
import { BiNote } from "react-icons/bi";
import { BsBuilding, BsCalendar } from "react-icons/bs";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './CreateCard.css'

export default class CreateCard extends React.Component {

    state = {
        title: '',
        company: '',
        date: '',
        note: '',
        location: '',
        salary: 0,
        postingURL: '',
        modalIsOpen: false,
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, company, date, note, location, jobtype, salary, postingURL, contactName, contactInfo } = this.state;

        // create card in db
        CARD_SERVICE.createCard({ title, company, date, note, location, jobtype, salary, postingURL, contactName, contactInfo })
            .then((serverResponse) => {
                const { card, successMessage } = serverResponse.data;

                // set the state
                this.props.updateCardState(card, successMessage);

                // insert newly created card in first column
                const { columns } = this.props;
                columns[Object.keys(columns)[0]].cards.push(card)

                // update column in db and state
                this.props.replaceColumns(columns[Object.keys(columns)[0]], columns[Object.keys(columns)[0]])

                this.props.toggleCreateModal()

                // clear form after submission
                this.setState({
                    title: '',
                    company: '',
                    date: '',
                    note: '',
                    location: '',
                    jobtype: '',
                    salary: 0,
                    postingURL: '',
                    contactName: '',
                    contactInfo: ''
                })

                this.props.displayNotification()
            })
    }

    render() {
        const { title, company, date, note, location, jobtype, salary, postingURL, message, contactName, contactInfo } = this.state;
        return (
            <div>

                <Modal centered isOpen={this.props.displayCreateModal}>
                    <ModalHeader toggle={this.props.toggleCreateModal}>Add New Job</ModalHeader>
                    <ModalBody>
                        <div className="modal-form">

                            <form onSubmit={this.handleSubmit} className="register-form" id="login-form">


                                <div className="details-header"><MdWork className="details-icon" />Job Title *</div>
                                <input type="text" name="title" id="title" required value={title} onChange={this.handleChange} />


                                <div className="details-header"><BsBuilding className="details-icon" />Company Name *</div>
                                <input type="text" name="company" id="company" required value={company} onChange={this.handleChange} />


                                <div className="details-header"><MdLocationOn className="details-icon" />Location</div>
                                <input type="text" name="location" id="location" value={location} onChange={this.handleChange} />


                                <div className="details-header"><MdDriveEta className="details-icon" />Job Type</div>
                                <select className="form-control" value={jobtype} onChange={this.props.handleChange}>
                                    <option value=""></option>
                                    <option value="Onsite">Onsite</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Remote">Remote</option>
                                </select>

                                <div className="details-header"><BsCalendar className="details-icon" />Status Date</div>
                                <input type="date" name="date" id="date" value={date} onChange={this.handleChange} />


                                <div className="details-header"><MdPayment className="details-icon" />Estimated Salary (in thousands)</div>
                                <input type="number" name="salary" id="salary" value={salary} onChange={this.handleChange} />


                                <div className="details-header"><MdWeb className="details-icon" />URL to job posting</div>
                                <input type="text" name="postingURL" id="postingURL" value={postingURL} onChange={this.handleChange} />

                                <div className="details-header"><MdContactMail className="details-icon" />Contact Name</div>
                                <input type="text" name="contactName" id="contactName" value={contactName} onChange={this.handleChange} />

                                <div className="details-header"><MdContactMail className="details-icon" />Contact Info</div>
                                <input type="text" name="contactInfo" id="contactInfo" value={contactInfo} onChange={this.handleChange} />

                                <div className="details-header"><BiNote className="details-icon" />Notes</div>
                                <textarea rows="4" cols="40" name="note" id="note" value={note} onChange={this.handleChange} />

                                <div className="form-group form-button">
                                    <input type="submit" name="create" id="create" className="form-submit-btn" value="Create" />
                                </div>

                            </form>

                                {/* error message */}
                                {message && <div style={{ color: "red", paddingTop: "1rem" }}> {message} </div>}

                        </div>
                    </ModalBody>
                </Modal>

            </div>

        )
    }
}