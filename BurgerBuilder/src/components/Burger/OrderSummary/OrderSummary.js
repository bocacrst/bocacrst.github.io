import React, { Component } from 'react';
import Button from '../../UI/Button/Button';



class orderSummary extends Component {
    render(){

    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey)=>{
        return(
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
            )
        })
   

        return(
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A burger with: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)} $</strong></p>
                <p>Continue ?</p>
        
                <Button btnType={"Danger"} clicked={this.props.cancel}> CANCEL </Button>
                <Button btnType={"Success"} clicked={this.props.continue}> CONTINUE </Button>
               
            </React.Fragment>
           );
    }
   

};
export default orderSummary;