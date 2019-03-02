import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    };
    this.messagesRef = this.props.firebase.database().ref('messages');

    }

  componentDidMount () {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message )});
    });

  }

  handleChange(e){
    e.preventDefault();
    this.setState({
      username: !this.props.user ? "Guest" : this.props.user.displayName,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoomId
    });
  }

  createMessage(e) {
    e.preventDefault();
    if (this.props.activeRoomId === '') {
      window.alert("Please Choose a Chat Room First =)")
    }
    else {
      this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
      })
    }
    this.setState({
      username: '',
      content: '',
      sentAt:'',
      roomId:''
    })
  }

  render() {
    return (
      <div>
        <div className={this.chatroomName}>
          <h2>{(this.props.activeRoom === '') ? "" : this.props.activeRoom}</h2>
        </div>
        <div className={this.messages}>
          {this.state.messages.filter(message => message.roomId === this.props.activeRoomId).map((message,index)=>
          <div key={index} className={this.messageBlock}>
            <div className={this.messageUsername}>{message.username}</div>
            <div className={this.messageContent}>{message.content}<span className={this.messageSentAt}>{message.sentAt}</span></div>
          </div>)}
        </div>
        <div className={this.newMessage}>
          <form className={this.messageForm} onSubmit={(e)=>this.createMessage(e)}>
            <div>
              <input className={this.messageBox}type="text" size="105" value={this.state.content} placeholder="Message Enter Here" onChange={(e)=>this.handleChange(e)} /><input className={this.sendButton} type="submit" value="Send"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default MessageList;
