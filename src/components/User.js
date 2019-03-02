import React, { Component} from 'react';

class User extends Component {

signIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
}

signOut() {
  this.props.firebase.auth().signOut();
}

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
});
}




  render() {

    return (
      <div className={this.userLogin}>
        <div>Logged in as: {this.props.user === null ? "Guest" : this.props.user.displayName}</div>
        <div className={this.signInOutButtons}>
          {
            this.props.user === null ?
            <button className={this.signInButton} onClick={() => {this.signIn()}}>Sign In</button>
            :
            <button className={this.signOutButton} onClick={() => {this.signOut()}}>Sign Out</button>
          }
        </div>
      </div>
    )
  }
}
export default User;
