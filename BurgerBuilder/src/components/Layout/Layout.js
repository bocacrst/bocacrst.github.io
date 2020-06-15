import React,{Component} from 'react';
import classes from './Layout.module.css'
import ToolBar from '../Navigation/ToolBar/ToolBar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'



class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    sideDtawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }
    sideDtawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return{showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
        return ( 
            <React.Fragment>
                <ToolBar drawerToggle={this.sideDtawerToggleHandler}/>
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDtawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
           </React.Fragment>
           )
    }
} 

export default Layout;