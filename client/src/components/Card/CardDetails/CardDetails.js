import React from 'react'
import { MdLocationOn, MdWeb, MdDriveEta, MdContactMail } from "react-icons/md";
import { BsBuilding, BsCalendar } from "react-icons/bs";
import { BiNote } from "react-icons/bi";
import { GrStatusInfo } from "react-icons/gr"
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './CardDetails.css'

export default class CardDetails extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        const { _id, title, company, salary, location, jobtype, date, note, postingURL, contactName, contactInfo, currentStatus } = this.props.card;
        const { toggleDetailsModal, toggleEditModal, editCard, deleteCard, displayDetailsModal, displayEditModal, displayNotification, column, card } = this.props;
        return (
            <>
                {displayDetailsModal &&
                    (<Modal size="lg" centered isOpen={displayDetailsModal} toggle={() => toggleDetailsModal({})}>
                        <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }}>{title}</ModalHeader>

                        <ModalBody className="details-container">

                            <div className="details-header"><BsBuilding className="details-icon" /> Company Name</div>
                            <div className="details">{company}</div>

                            <div className="details-header"><MdLocationOn className="details-icon" /> Location</div>
                            <div className="details">
                                {location}
                                {jobtype && ` (${jobtype})`}
                            </div>

                            <div className="details-header"><BsCalendar className="details-icon" /> Date Applied</div>
                            <div className="details">{date? date.slice(0,10): date}</div>

                            <div className="details-header"><GrStatusInfo className="details-icon" /> Current Status</div>
                            <div className="details">{currentStatus}</div>

                            <div className="details-header"><MdWeb className="details-icon" /> Estimated Salary (in thousands)</div>
                            <div className="details">{salary ? `$${salary}k`:``}</div>

                            { postingURL && <>
                            <div className="details-header"><MdWeb className="details-icon" /> URL to Job Posting</div>
                            <div className="details"><a target="_blank" rel="nofollow noreferrer" href={postingURL}>{postingURL}</a></div>
                            </>}
                            
                            {contactName && <>
                            <div className="details-header"><MdContactMail className="details-icon" /> Contact</div>
                            <div className="details">{contactName}</div>
                            <div className="details second">{contactInfo.indexOf('@' > -1) ? <a href={`mailto:${contactInfo}`}>{contactInfo}</a> : contactInfo}</div>
                            </> }

                            <div className="details-header"><BiNote className="details-icon" /> Notes</div>
                            <div className="details">{note}</div>

                            <Button color="danger" className="float-right"
                                onClick={() => { deleteCard(_id, column); toggleDetailsModal({}); displayNotification() }}>Delete</Button>
                            <Button color="light" className="float-right edit-btn"
                                onClick={() => { toggleDetailsModal({}); toggleEditModal() }}
                            >Edit</Button>

                        </ModalBody>
                    </Modal>)}

                { displayEditModal && (

                    <Modal size="lg" centered isOpen={displayEditModal} toggle={() => toggleEditModal({})}>
                        <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }}>{title} (EDIT)</ModalHeader>
                        <ModalBody className="details-container">

                            <form onSubmit={this.handleSubmit}>

                                <div className="details-header">
                                    <BsBuilding className="details-icon" /> Job Title
                            </div>
                                <div className="edit-input">
                                    <input type="text" name="title" id="title" placeholder={title} required value={title} onChange={this.props.handleChange} />
                                </div>

                                <div className="details-header">
                                    <BsBuilding className="details-icon" /> Company Name
                            </div>
                                <div className="edit-input">
                                    <input type="text" name="company" id="company" placeholder={company} required value={company} onChange={this.props.handleChange} />
                                </div>

                                <div className="details-header">
                                    <MdLocationOn className="details-icon" /> Location
                            </div>
                                <div className="edit-input">
                                    <input type="text" name="location" id="location" placeholder={location} value={location} onChange={this.props.handleChange} />
                                </div>

                                <div className="details-header">
                                    <MdDriveEta className="details-icon" /> Job Type
                            </div>
                                <div className="edit-input">
                                    <select className="form-control" value={jobtype} onChange={this.props.handleChange}>
                                        <option value=""></option>
                                        <option value="Onsite">Onsite</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Remote">Remote</option>
                                    </select>
                                    {/* <input type="text" name="jobtype" id="jobtype" placeholder={jobtype} value={jobtype} onChange={this.props.handleChange} /> */}
                                </div>

                                <div className="details-header">
                                    <BsCalendar className="details-icon" /> Date Applied
                            </div>
                                <div className="edit-input">
                                    <input type="date" name="date" id="date" value={date? date.slice(0,10): date} onChange={this.props.handleChange} />
                                </div>

                                <div className="details-header">
                                    <MdWeb className="details-icon" /> Current Status
                            </div>
                                <div className="edit-input">
                                    <input type="text" name="currentStatus" id="currentStatus" placeholder={currentStatus} value={currentStatus} onChange={this.props.handleChange} />
                                </div>

                                <div className="details-header">
                                    <MdWeb className="details-icon" /> Estimated Salary (in thousands)
                            </div>
                                <div className="edit-input">
                                    <input type="text" name="salary" id="salary" placeholder={salary} value={salary} onChange={this.props.handleChange} />
                                </div>

                                <div className="details-header">
                                    <MdWeb className="details-icon" /> URL to Job Posting
                            </div>
                                <div className="edit-input">
                                    <input type="text" name="postingURL" id="postingURL" placeholder={postingURL} value={postingURL} onChange={this.props.handleChange} />
                                </div>

                                <div className="details-header">
                                    <MdContactMail className="details-icon" /> Contact Name
                            </div>
                                <div className="edit-input">
                                    <input type="text" name="contactName" id="contactName" placeholder={contactName} value={contactName} onChange={this.props.handleChange} />
                                </div>

                                <div className="details-header">
                                    <MdContactMail className="details-icon" /> Contact Info
                            </div>
                                <div className="edit-input">
                                    <input type="text" name="contactInfo" id="contactInfo" placeholder={contactInfo} value={contactInfo} onChange={this.props.handleChange} />
                                </div>

                                <div className="details-header">
                                    <BiNote className="details-icon" /> Notes
                            </div>
                                <div className="edit-input">
                                    <textarea rows="5" cols="51" name="note" id="note" style={{ marginTop: ".5rem", marginBottom: "1.5rem", width: "100%" }} placeholder={note} value={note} onChange={this.props.handleChange} />
                                </div>

                                <Button color="light" className="float-right edit-btn"
                                    onClick={() => { editCard(_id, card); toggleEditModal(); displayNotification() }}>Save</Button>
                            </form>

                        </ModalBody>
                    </Modal>
                )}
            </>
        )
    }
} 