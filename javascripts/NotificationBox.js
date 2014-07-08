/** @jsx React.DOM */

var Message = React.createClass({
  render: function() {
    time = moment(this.props.time);
    now = moment().unix();
    minutes_ago = time.diff(now, 'minutes', false);
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



var NotificationBox = React.createClass({
  componentDidMount: function() {
    var that = this;
    this.props.channel.bind('notification', function(data) {
      console.log(data);
      if(data.target_player == null || that.props.playerId == data.target_player) {
        that.props.messages.push({
          tag: data.tag,
          time: data.time,
          contents: data.contents
        });
        that.forceUpdate();
      }
    });
    this.interval = setInterval(this.update, 10000);
  },
  update: function() {
    this.forceUpdate();
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (<MessageWindow messages={this.props.messages} hovered={false}/>)
  }
});

SkirmishApp.messageBox = {
  all: []
};