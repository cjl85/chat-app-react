import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

let config = {
    apiKey: "AIzaSyBm9uf04eF9_Eu6ogeFcswenwNIddJ9f1k",
    authDomain: "bloc-chat-react-6502e.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-6502e.firebaseio.com",
    projectId: "bloc-chat-react-6502e",
    storageBucket: "bloc-chat-react-6502e.appspot.com",
    messagingSenderId: "498815482222"
  };
  firebase.initializeApp(config);



  class App extends Component {
    constructor(props){
      super(props);
      this.state = {
                    activeRoom: '',
                    activeRoomId: '',
                    user: ''
      }
    }

    updateRoom(roomId){
      if (roomId === '') {
        this.setState({activeRoomId: '', activeRoom: ''})
      } else {
      this.setState({activeRoomId: roomId.key, activeRoom: roomId.name});
      }
    }

    setUser(currentUser){
        this.setState({user: currentUser});
    }

    render() {
      return (
        <div className={this.App}>
          <nav className={this.roomNavigation}>
            <header className={this.appHeader}>
              <h1>Chat Room</h1>
            </header>
            <div className={this.logIn}>
              <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
            </div>
            <RoomList firebase={firebase}
                      updateRoom={this.updateRoom.bind(this)}
                      activeRoomId={this.state.activeRoomId}
                      activeRoom={this.state.activeRoom}/>
          </nav>
          <section className={this.messagelist}>
          <MessageList firebase={firebase}
                         activeRoom = {this.state.activeRoom}
                         activeRoomId = {this.state.activeRoomId}
                         user = {this.state.user}/>
          </section>
        </div>
      );
    }
  }

  export default App;
