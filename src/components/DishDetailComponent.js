import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component {

  constructor(props) {
    super(props);
  }

  renderDish(dish) {
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
    )
  }

  renderComments(comments) {
    if (comments == undefined || comments == null)
      return (<div></div>);

    const commentsHTML = comments.map((comment) => {
      return (
        <li>
          <p>{comment.comment}</p>
          <p>-- {comment.author}</p>
        </li>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {commentsHTML}
        </ul>
      </div>
    );
  }

  render() {
    const dish = this.props.dish;
    if (dish == null)
      return (<div></div>);
    else return (
      <div className="row">

        {this.renderDish(dish)}
        {this.renderComments(dish.comments)}

      </div>
    );
  }
}

export default DishDetail;