import React from 'react'
import { MdLocationOn, MdWeb } from "react-icons/md";
import { BsBuilding, BsCalendar } from "react-icons/bs";
import { BiNote } from "react-icons/bi";
import './CardDetails.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class CardDetails extends React.Component {

    render() {
        const { title, company, location, date, note, postingURL } = this.props.card;
        const { toggleModal } = this.props;
        return (
            <Modal centered isOpen={this.props.modalIsOpen} toggle={() => toggleModal({})}>
                <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }}><h2>{title}</h2></ModalHeader>
                <ModalBody className="details-container">
                    <div className="details-header"><BsBuilding class="details-icon" /> Company</div>
                    <div className="details">{company}</div>
                    <div className="details-header"><MdLocationOn class="details-icon" /> Location</div>
                    <div className="details">{location}</div>
                    <div className="details-header"><BsCalendar class="details-icon" /> Date Applied</div>
                    <div className="details">{date}</div>
                    <div className="details-header"><BiNote class="details-icon" /> Notes</div>
                    <div className="details">{note}</div>
                    <div className="details-header"><MdWeb class="details-icon" /> URL to Job Posting</div>
                    <div className="details">{postingURL}</div>
                    <Button color="danger" className="float-right">Delete</Button>
                </ModalBody>
            </Modal>
        )
    }
}