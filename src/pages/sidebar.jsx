import React from 'react';
import {connect} from 'react-redux';

const UserDetails = ({userDetails, logout}) => {
    return <div className="sidebar__brand-container">
        <img src={userDetails.avatar_url} className="sidebar__profile-pic"/>
        <div> {userDetails.name} </div>
        <a href="javascript:void(0)" onClick={(e) => {e.preventDefault(); logout()}}>
            Log out
        </a>
    </div>
};

const BrandHeader = () => {
    return <div className="sidebar__brand-header">
        The Idea Pool
    </div>
};

const SideBar = (props) => {
    return <div className="container__side-bar">
        <BrandHeader/>
        {props.userDetails ?
            <UserDetails userDetails={props.userDetails} logout={props.logout} />
            : <div></div>}
    </div>;
};

const mapStateToProps = (state) => {
  return {
      userDetails: state.auth.userDetails
  }
};

const mapDisaptchToProps = (state) => {
  return {
      logout: () => alert('logout')
  }
};

const SideBarContainer = connect(mapStateToProps)(SideBar);

export default SideBarContainer;