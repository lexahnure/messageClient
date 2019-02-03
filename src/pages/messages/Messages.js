import Multiselect from '../../components/multiselect';
import { getUsers, getMessages, postMessage } from '../../services';

import './messages.scss';

class Messages extends Component {
  state = {
    users: [],
    message: {},
    messages: [],
    error: ''
  }

  componentDidMount() {
    // const messageBox = this.messageBox;
    getUsers().then(users => this.setState({ users }));
    this.receiveMessages();
  }

  receiveMessages = () => {
    const userID = window.localStorage.getItem('userID');
    const { location } = this.props;
    const loc = location.pathname.trim().split('/')[1] || userID;
    getMessages(loc).then(messages => this.setState({ messages }));
  }

  changeHandler = (event, targetUsers) => {    
    const { message } = this.state;
    let newMessage;
    if (!event) {
      const recipUsers = targetUsers.map(el => el._id);
      newMessage = {
        ...message,
        recipients: recipUsers,
      };
    } else {
      newMessage = {
        ...message,
        [event.target.name]: event.target.value
      };
    }

    this.setState({ message: newMessage, error: '' });
  }

  sender = (event) => {
    event.preventDefault();
    const { message } = this.state;
    if (message.recipients) {
      return postMessage(message).then(res => res && this.receiveMessages());
    }
    return this.setState({ error: 'No recipients' });
  }

  scrollDownToMessages = (messageBox) => {
    if (messageBox) {
      const elHeight = messageBox.offsetHeight;
      const fullHeight = messageBox.scrollHeight;
      messageBox.scrollTo(0, (fullHeight - elHeight));
    }
  };


  render() {
    const { users, messages, error } = this.state;

    return (
      <>
        <div className="helloBoard">
          <h2>Hello, </h2>
          <p>You have messages</p>
        </div>
        <div className="messages-box" ref={el => this.scrollDownToMessages(el)}>
          {
            messages && (
              messages.map((el, index) => {
                return (
                  <div key={index} className="message">
                    <div className="message-title">{el.title}</div>
                    <div className="message-subject">{el.subject}</div>
                  </div>
                );
              })
            )
          }
        </div>
        <form className="messages-send-box" onSubmit={this.sender}>
          <div className="message-input">
            <input type="text" placeholder="Enter message title" required name="title" onChange={this.changeHandler} />
          </div>
          <div className="message-input">
            <textarea type="text" placeholder="Enter message subject" required name="subject" onChange={this.changeHandler} />
          </div>
          <Multiselect users={users} handler={selected => this.changeHandler(null, selected)} />
          {
            error && (
              <mark>{error}</mark>
            )
          }
          <input type="submit" value="Send" />
        </form>
      </>
    );
  }
}

export default Messages;
