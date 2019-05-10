import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        userName: ""
    }

    render() {
        return (
        <HomePageRouter/>    
        )
    }
    
}
function HomePageRouter() {
    return (
        <Router>
        <div>
        <nav>
        <Link to="home_page"> Welcome ! </Link>
        </nav>
        </div>
        </Router>
    );
}


export default Homepage