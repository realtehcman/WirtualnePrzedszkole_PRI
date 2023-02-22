import React from "react";
import { useNavigate } from "react-router-dom";
import MessageService from "./MessageService";
import "../GroupDisplay/Popup.css";
import "../User/Table.scss";

const Navi = (props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/ReadMessage/" + props.value)}
      className="btn btn-info"
    >
      {props.t('look')}
    </button>
  );
};

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      received_messages: [],
    };
    this.deleteReceivedMessages = this.deleteReceivedMessages.bind(this);
  }

  deleteReceivedMessages(id) {
    MessageService.deleteReceivedMessages(id).then((response) => {
      this.setState({
        received_messages: this.state.received_messages.filter(
          (received_messages) => received_messages.id !== id
        ),
      });
    });
  }

  componentDidMount() {
    MessageService.getReceivedMessages().then((response) => {
      this.setState({ received_messages: response.data });
    });
  }

  dateConvertToNormalFormat(responseDate) {
    const date = new Date(responseDate)
    return date.toLocaleString()
  }

  render() {
    const {t} = this.props
    return (
      <div data-testid="message" className="h-100">
        <div className="scrollable-div maxArea">
          <table className="content-table w-100">
            <thead>
              <tr className="table-head">
                <td>{t('data')}</td>
                <td>{t('from')}</td>
                <td>{t('topic')}</td>
                <td>{t('contents')}</td>
                <td>{t('actions')}</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.received_messages
                  .sort((a, b) => b.id - a.id)
                  .map((received_messages) => (
                    <tr key={received_messages.id}>
                      <td>{this.dateConvertToNormalFormat(received_messages.sentDate)}</td>
                      <td id="td--message">{received_messages.author}</td>
                      <td id="td--message">{received_messages.subject}</td>
                      <td id="td--message">
                        {" "}
                        <Navi value={received_messages.id} t={t} />
                      </td>
                      <td className="foobar">
                        <button
                          onClick={() =>
                            this.deleteReceivedMessages(received_messages.id)
                          }
                          className="btn btn-danger"
                        >
                          {t('delete')}
                        </button>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}
export default Message;
