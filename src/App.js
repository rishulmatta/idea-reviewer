import React, {Component} from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import './App.css';
import {connect} from 'react-redux';
import {fetchUserDetails} from './actions/auth';
import Register from './pages/register';
import Login from './pages/login';
import Idea from './pages/user-idea';
import SideBar from './pages/sidebar';
import Toast from './components/toast';

class App extends Component {
    constructor(opt) {
        super(opt);
        this.state = {
            active: window.location.hash || 'register'
        };
        this.routePaths = this.routePaths.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isAuth) {
            window.location.hash = '#idea';
            return {
                active: '#idea'
            };
        } else {
            if (prevState.active == '#idea') {
                window.location.hash = '#login';
                return {active: '#login'};
            }
            return null;
        }
    }

    routePaths() {
        const hash = window.location.hash;
        this.setState({
            active: hash
        });
    }

    getActivePage() {
        const path = this.state.active;
        switch (path) {
            case '#login':
                return <div className="container__content__login__register__signup"><Login/></div>;
            case '#idea':
                return <Idea/>;
            default:
                return <div className="container__content__login__register__signup"><Register/></div>;
        }
    }

    componentDidMount() {
        if (localStorage.getItem('accessTokens')) {
            this.props.fetchDetails();
        }
        window.addEventListener('hashchange', this.routePaths);
    }

    render() {
        return (

            <div className="container">
                <SideBar/>
                <div className="container__content">
                    {this.getActivePage()}
                </div>
                <Toast/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetails: () => dispatch(fetchUserDetails())
    };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
