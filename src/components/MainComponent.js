import React, { Component } from 'react';

import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

   constructor(props) {
      super(props);
      this.state = {
         dishes: DISHES,
         comments: COMMENTS,
         promotions: PROMOTIONS,
         leaders: LEADERS
      };
   }

   firstFeatured(items) {
      return items.filter((item) => item.featured)[0];
   }

   render() {
      
      const featDish = this.firstFeatured(this.state.dishes);
      const featPromo = this.firstFeatured(this.state.promotions);
      const featLeader = this.firstFeatured(this.state.leaders);

      const HomePage = () => { 
         return ( 
            <Home  dish={featDish} promo={featPromo} leader={featLeader} /> 
         ); 
      };

      return (
         <>
            <Header/>
            <Switch>
               <Route path="/home" component={HomePage} />
               <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
               <Route exact path="/contactus" component={ Contact }/>
               <Redirect to="/home" />
            </Switch>
            <Footer/>
         </>
      );
   }
}

export default Main;