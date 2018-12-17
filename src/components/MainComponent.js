import React, { Component } from 'react';

import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
   return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
   }
}

const mapDispatchtoProps = (dispatch) => ({
   postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
   fetchDishes: () => { dispatch(fetchDishes()) },
   fetchComments: () => { dispatch(fetchComments()) },
   fetchPromos: () => { dispatch(fetchPromos()) },
   fetchLeaders: () => { dispatch(fetchLeaders()) },
   resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
   postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => { dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)) }
});

class Main extends Component {

   componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchPromos();
      this.props.fetchComments();
      this.props.fetchLeaders();
   }

   firstFeatured(items) {
      return items.filter((item) => item.featured)[0];
   }


   render() {
      const featDish = this.firstFeatured(this.props.dishes.dishes);
      const featPromo = this.firstFeatured(this.props.promotions.promotions);
      const featLeader = this.firstFeatured(this.props.leaders.leaders);

      const HomePage = () => {
         return (
            <Home dish={featDish}
               promotion={featPromo}
               leader={featLeader}
               dishesLoading={this.props.dishes.isLoading}
               dishesErrMess={this.props.dishes.errMess}
               promosLoading={this.props.promotions.isLoading}
               promosErrMess={this.props.promotions.errMess}
               leadersLoading={this.props.leaders.isLoading}
               leadersErrMess={this.props.leaders.errMess}
            />
         );
      };

      const DishWithID = ({ match }) => {
         const id = parseInt(match.params.dishId, 10);
         const dish = this.props.dishes.dishes.filter((item) => item.id === id)[0];
         const dishComments = this.props.comments.comments.filter((item) => item.dishId === id);

         return <DishDetail dish={dish}
            comments={dishComments}
            postComment={this.props.postComment}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            commentsErrMess={this.props.comments.errMess}
         />;
      }

      return (

         <>
            <Header />
            <TransitionGroup>
               <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                  <Switch>
                     <Route path="/home" component={HomePage} />
                     <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                     <Route path="/menu/:dishId" component={DishWithID} />
                     <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                     <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                     <Redirect to="/home" />
                  </Switch>
               </CSSTransition>
            </TransitionGroup>
            <Footer />
         </>
      );
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Main));