import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bulma/css/bulma.css";
import foods from "./foods.json";
import FoodBox from "./components/FoodBox.js";
import AddFood from "./components/AddFood";
import CoolButton from "./components/CoolButton";
import FormField from "./components/FormField";
import List from "./components/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Copy of the Array
      foodsCopy:foods,
      // For adding new food
      toggleForm: true,
      // List of foods added when clicked
      todays:[],
      // Whatever is typed in the search field
      search:""
    };
    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleTodaysFood = this.handleTodaysFood.bind(this);
    this.handleAddFood= this.handleAddFood.bind(this); 
  }

  // Sets the search state to whatever is typed in the search field
  handleSearchInput = (event) => {
    this.setState({
      search: event.target.value
    }
    )
  }

  // creates an object of foods that are clicked and pushed into the todays array
  handleTodaysFood(foodi) {
    console.log("Hello")
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log(this.state.foodsCopy[0].calories);
    let food = Object.assign({},foodi)
    let finalCalories = food.quantity*food.calories
    food.calories=finalCalories
    this.state.todays.push(food);
    this.setState({ todays: this.state.todays });
  }

  // Add new food
  handleAddFood(food) {
    this.state.foodsCopy.push(food);
    this.setState({ foodsCopy: this.state.foodsCopy });
  }

  // handles the new food add form
  handleToggleFormInput = () => {
    this.setState({
    toggleForm: this.state.toggleForm ? false:true
   })
  }


  handleNumberInput = (event,i) => {
    this.state.foodsCopy[i].quantity = event.target.value
    this.setState({foodsCopy: this.state.foodsCopy
})
}
  render() {
    return (
      <div>
      <div>
      <FormField label="IronNutrition" value={this.state.search} name="search" type="text" placeholder="insert something" inputchange={(e) => this.handleSearchInput(e)} />
      </div>
       
        <div className="zones">
        <ul>
          {this.state.foodsCopy.filter((e)=>e.name.includes(this.state.search)).map((food, index) => (
            <FoodBox
              key={index}
              index={index}
              name={food.name}
              calories={food.calories}
              image={food.image}
              quantity={food.quantity}
              todays= {this.handleTodaysFood}
              handleNumberInput={this.handleNumberInput}
            />
          ))}
        </ul>
        {this.state.toggleForm ? (
          <CoolButton className="button is-small is-success" click= {this.handleToggleFormInput}  >
            Create Food
          </CoolButton>
        ) : (
          <AddFood   addfoods={this.handleAddFood} toggle= {this.handleToggleFormInput}/>
        )}
        </div>
        <div className="zones ">
        <h1>Today's Foods </h1>
        <ul>
          {this.state.todays.map((today, index) => (
            <List
              key={index}
              value={today.quantity}
              name={today.name}
              calories={today.calories}
            />
          ))}
        </ul>
        </div>
      </div>
    );
  }
}
{
}
export default App;