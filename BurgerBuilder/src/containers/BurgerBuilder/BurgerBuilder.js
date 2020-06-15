import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing:false,
        loading:false

    }

    updatePurchaseState (ingredients){
      
        const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        } )
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }
  

    addIngredientHandler =(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
       
        updatedIngredients[type] =updatedCount;
        const priceIngredient = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceIngredient;

        this.setState({totalPrice: updatedPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    

    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];

        if(oldCount === 0)
            return;

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceIngredient = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceIngredient;
        this.setState({totalPrice: updatedPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
   
    purchaseHandler= ()=>{
        const state = this.state.purchasing
        this.setState({purchasing: !state});
    }

    purchaseContinuHandler = ()=>{
        this.setState({loading:true});
        const order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Boca Cristian',
                address:{
                    street: 'Septimiu Albini 109',
                    zipCode: '41351',
                    country: 'Romania'
                },
                email:'bocacrst@gmail.com'
            },
            deliveryMethod: 'fastest'

        }

        axios.post('/orders.json',order).then(response=>{
            this.setState({loading:false, purchasing:false})
        }).catch(error=> { this.setState({loading:false,purchasing:false})});
    }


    render(){
    
        const disabledInfo ={ ...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary continue={this.purchaseContinuHandler} cancel={this.purchaseHandler} 
        ingredients={this.state.ingredients} price={this.state.totalPrice}/>

        if(this.state.loading){
            orderSummary= <Spinner/>;
        }

  
        return(
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
                    {orderSummary}
                </Modal>
                <BuildControls ingredientAdded ={this.addIngredientHandler} 
                ingredientRemove={this.removeIngredientHandler}
                disabled={disabledInfo}  purchasable ={this.state.purchasable} 
                price={this.state.totalPrice} ordered={this.purchaseHandler}
               />
               
                
            </React.Fragment>
        );
    }
}
export default BurgerBuilder;