import React, { Component } from 'react';

import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

   constructor(props) {
      super(props);
      this.state = {
         dishes: DISHES,
         selectedDish: null
      };
   }

   onDishSelect = (dishId) => {
      this.setState({ selectedDish: dishId });
   }

   render() {
      return (
         <>
            <Header/>
            <Menu dishes={this.state.dishes} onClick={this.onDishSelect} />
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            <Footer/>
         </>
      );
   }
}

export default Main;