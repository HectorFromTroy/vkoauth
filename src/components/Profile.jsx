import React, { Component } from "react";


class Profile extends Component{
  componentDidMount(){
    this.props.getProfileInfo();
  };
  render(){
    return (
      <div className="profile">
        <main className="profile-main">
          <section className="profile-info-container">
            <h2>Профиль</h2>
            <div className="profile-info">
              <img src={this.props.profileInfo.photo_100} alt="profile avatar" className="avatar"/>
              <span className="profile-info__first-name first-name">
                {this.props.profileInfo.first_name}
              </span>
              <span className="profile-info__last-name">
                {this.props.profileInfo.last_name}
              </span>
            </div>
          </section>
          <section className="friends-info-container">
            <h2>Друзья</h2>
            <div className="friends-info">
              <ul className="friends-list">
                {this.props.friendsInfo.map((friend, index) => (
                  <li key={index} className="friends-list__item">
                    <img src={friend.photo_100} alt="friends avatar" className="avatar"/>
                    <span className="friends-info__first-name first-name">
                      {friend.first_name}
                    </span>
                    <span className="friends-info__last-name">
                      {friend.last_name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    );
  };
};

export default Profile;