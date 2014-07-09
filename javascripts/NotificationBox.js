/** @jsx React.DOM */
var Message = React.createClass({
  render: function() {
    time = moment(this.props.time);
    now = moment(+moment());
    minutes_ago = now.diff(time, 'minutes', false);
    // todo fix time updating
    return (
      <tr>
        <td className={this.props.tag}>{minutes_ago} minute(s) ago</td>
        <td>{this.props.message}</td>
      </tr>
      );
  }
});

var MessageWindow = React.createClass({
  render: function() {
    var messages = this.props.messages.map(function(message) {
      return <Message tag={message.tag} time={message.time} message={message.contents}/>
    });
    var className = 'message-window ' + (this.props.hovered === true ? 'hovered' : '');
    return (<div class={className}>
      <table>
        <tr>
          <th>Time</th>
          <th>Message</th>
        </tr>
            {messages}
      </table>
    </div>);
  }
});

var ChatInput = React.createClass({
  sendChatMessage: function() {
    var message = this.refs.chatBox.getDOMNode().value.trim();

    if(!message) return false;

    $.ajax({
      type: 'POST',
      url: this.props.chatEndpoint,
      data: { chat_message: message },
      failure: function () {SkirmishDOM.flash('Failed to submit chat message')}
    });

    this.refs.chatBox.getDOMNode().value = '';
    return false;
  },
  handleKeyDown: function(e) {
    if(e.keyCode == 13) //13 is enter
      this.sendChatMessage();
  },
  render: function() {
    return (
      <div id='chat-input'>
        <input type='text' ref='chatBox' onKeyDown={this.handleKeyDown}/>
        <button onClick={this.sendChatMessage}>Submit</button>
      </div>
    );
  }
});



var NotificationBox = React.createClass({
  componentDidMount: function() {
    var that = this;
    this.props.channel.bind('notification', function(data) {
      if(data.target_player == null || that.props.playerId == data.target_player) {
        that.props.messages.unshift({
          tag: data.tag,
          time: data.time,
          contents: data.contents
        });
        that.update();
      }
    });
    this.interval = setInterval(this.update, 200);
  },
  update: function() {
    this.forceUpdate();
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>
        <MessageWindow messages={this.props.messages} hovered={false}/>
        <ChatInput chatEndpoint={this.props.chatEndpoint} />
      </div>
    );
  }
});

SkirmishApp.messageBox = {
  all: []
};