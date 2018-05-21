import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/auth';
import Brand from '../static/brand_icon.png';
import Divider from '@material-ui/core/Divider';

const UserDetails = ({userDetails, lgout}) => {
    return <div className="sidebar__brand-container">
        <Divider light />
        <img src={userDetails.avatar_url} className="sidebar__profile-pic"/>
        <div> {userDetails.name} </div>
        <a href="javascript:void(0)" onClick={(e) => {e.preventDefault(); lgout();}}>
            Log out
        </a>
    </div>
};

const BrandHeader = () => {
    return <React.Fragment>
    <img src={Brand} className="container__side-bar__brand-image"/>
    <div className="sidebar__brand-header">
        The Idea Pool
    </div>
    </React.Fragment>
};

const SideBar = (props) => {
    return <div className="container__side-bar">
        <BrandHeader/>
        {props.userDetails ?
            <UserDetails {...props} />
            : <div></div>}
    </div>;
};

const mapStateToProps = (state) => {
  return {
      userDetails: state.auth.userDetails
  }
};

const mapDisaptchToProps = (dispatch) => {
  return {
      lgout: () => dispatch(logout())
  }
};

const SideBarContainer = connect(mapStateToProps, mapDisaptchToProps)(SideBar);

export default SideBarContainer;