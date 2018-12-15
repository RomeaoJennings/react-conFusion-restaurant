import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';

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

function RenderComments({ comments }) {
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
            <CommentForm />
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
            <RenderComments comments={props.comments} />
         </div>
      </div>
   );
}

export default DishDetail;