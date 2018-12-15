import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Col, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
   return (
      <div className="col-12 col-md-5 m-1">
         <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
               <CardTitle>{dish.name}</CardTitle>
               <CardText>{dish.description}</CardText>
            </CardBody>
         </Card>
      </div>
   );
}

function RenderComments({ comments, dishId, addComment }) {
   if (comments == null)
      return null;

   const commentsHTML = comments.map((comment) => {
      return (
         <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(comment.date))}</p>
         </li>
      );
   });

   return (
      <React.Fragment>
         <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
               {commentsHTML}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment}/>
         </div>
      </React.Fragment>
   );
}

function DishDetail(props) {
   const dish = props.dish;
   if (dish == null)
      return null;
   else return (
      <div className="container">
         <div className="row">
            <Breadcrumb>
               <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
               <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
               <h3>{dish.name}</h3>
               <hr />
            </div>
         </div>
         <div className="row">
            <RenderDish dish={dish} />
            <RenderComments comments={props.comments} 
               addComment={props.addComment}
               dishId={props.dish.id} 
            />
         </div>
      </div>
   );
}

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
      this.toggleModal();
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
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

export default DishDetail;