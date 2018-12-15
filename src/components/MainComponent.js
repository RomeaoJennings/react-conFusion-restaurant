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
import { addComment } from '../redux/ActionCreators';


const mapStateToProps = (state) => {
   return {
      dishes: state.dishes,
      comments: state.comments, 
      promotions: state.promotions,
      leaders: state.leaders
   }
}

const mapDispatchtoProps = (dispatch) => ({
   addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {

   constructor(props) {
      super(props);
   }

   firstFeatured(items) {
      return items.filter((item) => item.featured)[0];
   }


   render() {
      
      const featDish = this.firstFeatured(this.props.dishes);
      const featPromo = this.firstFeatured(this.props.promotions);
      const featLeader = this.firstFeatured(this.props.leaders);
      
      const HomePage = () => { 
         return ( 
            <Home  dish={featDish} promotion={featPromo} leader={featLeader} /> 
         ); 
      };

      const DishWithID = ({ match }) => {                      
         const id = parseInt(match.params.dishId, 10);
         const dish = this.props.dishes.filter((item) => item.id === id)[0];
         const dishComments = this.props.comments.filter((item) => item.dishId === id);
         
         return (
            <DishDetail dish={dish} 
               comments={dishComments}
               addComment={this.props.addComment}
            />
         );
      }

      return (
         <>
            <Header/>
            <Switch>
               <Route path="/home" component={HomePage} />
               <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
               <Route path="/menu/:dishId" component={DishWithID} />
               <Route exact path="/aboutus" component= {() => <About leaders={this.props.leaders}/>}/>
               <Route exact path="/contactus" component={ Contact }/>
               <Redirect to="/home" />
            </Switch>
            <Footer/>
         </>
      );
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Main));