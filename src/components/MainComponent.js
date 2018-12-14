import React, { Component } from 'react';

import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

   constructor(props) {
      super(props);
      this.state = {
         dishes: DISHES,
      };
   }

   render() {
      
      const HomePage = () => { return ( <Home /> ); };
      
      return (
         <>
            <Header/>
            <Switch>
               <Route path="/home" component={HomePage} />
               <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
               <Redirect to="/home" />
            </Switch>
            <Footer/>
         </>
      );
   }
}

export default Main;