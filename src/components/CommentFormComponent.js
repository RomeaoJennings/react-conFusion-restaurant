import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

   constructor(props) {
      super(props);

      this.state = {
         isModalOpen: false
      }
   }

   toggleModal = () => {
      this.setState({
         isModalOpen: !this.state.isModalOpen
      });
   }

   handleSubmit = (values) => {
      console.log("Current State is: " + JSON.stringify(values));
      alert("Current State is: " + JSON.stringify(values));
   }

   CommentModal = () => {
      return (
         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
               <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                     <Label htmlFor="rating" xs={12}>Rating</Label>
                     <Col xs={12}>
                        <Control.select defaultValue="1" model=".rating" name="rating" className="form-control">
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                        </Control.select>
                     </Col>
                  </Row>
                  <Row className="form-group">
                     <Label htmlFor="author" xs={12}>Your Name</Label>
                     <Col xs={12}>
                        <Control.text model=".author" id="author"
                           name="author" className="form-control"
                           placeholder="Your Name"
                           validators={
                              { minLength: minLength(3), maxLength: maxLength(15) }
                           }
                        />
                        <Errors className="text-danger"
                           model=".author"
                           show="touched"
                           messages={{
                              minLength: 'Must be at least 3 characters',
                              maxLength: 'Must be 15 characters or less'
                           }}
                        />
                     </Col>
                  </Row>
                  <Row className="form-group">
                     <Label htmlFor="comment" xs={12}>Comment</Label>
                     <Col xs={12}>
                        <Control.textarea model=".comment" id="comment" name="comment"
                           rows="6" className="form-control"
                        />
                     </Col>
                  </Row>
                  <Row className="form-group">
                     <Col xs={12}>
                        <Button type="submit" color="primary">Submit</Button>
                     </Col>
                  </Row>
               </LocalForm>
            </ModalBody>
         </Modal>
      );
   }

   render() {
      return (
         <React.Fragment>
            <Col xs={12} className="ml-0 pl-0">
               <Button color="outline-secondary" onClick={this.toggleModal}>
                  <span className="fa fa-pencil fa-lg" /> Submit Comment
               </Button>
            </Col>
            {this.CommentModal()}
         </React.Fragment>
      );
   }
}

export default CommentForm;