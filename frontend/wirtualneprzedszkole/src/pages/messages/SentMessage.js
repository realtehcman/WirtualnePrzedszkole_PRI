import React from "react";
import { useNavigate } from "react-router-dom";
import "../GroupDisplay/Popup.css";
import "../User/Table.scss";
import SentMessageService from "./SentMessageService";

const Navi2 = (props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        navigate("/StatusMessage/" + props.value)
      }
      className="btn btn-info"
    >
      {props.t('status')}
    </button>
  );
};

const Navi = (props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/ViewMessage/" + props.value)}
      className="btn btn-info"
    >
      {props.t('view')}
    </button>
  );
};

class SentMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sent_messages: [],
    };
    this.deleteSentMessages = this.deleteSentMessages.bind(this);
  }

  deleteSentMessages(id) {
    SentMessageService.deleteSentMessages(id).then((response) => {
      this.setState({
        sent_messages: this.state.sent_messages.filter(
          (sent_messages) => sent_messages.id !== id
        ),
      });
    });
  }



  componentDidMount() {
    SentMessageService.getSentMessages().then((response) => {
      let sortedData = response.data.sort((a, b) => b.id - a.id);
      this.setState({ sent_messages: sortedData });
    });
  }

  dateConvertToNormalFormat(responseDate) {
    const date = new Date(responseDate)
    return date.toLocaleString()
  }

  render() {
    const {t} = this.props

    return (
      <div data-testid="sent-message">

        <div className="scrollable-div maxArea">
          <table className="content-table w-100">
            <thead>
              <tr className="table-head">
                <td>{t('data')}</td>
                <td>{t('author')}</td>
                <td>{t('topic')}</td>
                <td>{t('contents')}</td>
                <td>{t('actions')}</td>
              </tr>
            </thead>
            <tbody>
              {this.state.sent_messages.map((sent_messages) => (
                <tr key={sent_messages.id}>
                  <td id="td--message">{this.dateConvertToNormalFormat(sent_messages.sentDate)}</td>
                  <td id="td--message">{sent_messages.author}</td>
                  <td id="td--message">{sent_messages.subject}</td>
                  <td id="td--message">
                    <Navi value={sent_messages.id} t={t} />
                    <Navi2 value={sent_messages.id} t={t} />
                  </td>
                  <td className="foobar">
                    <button
                      onClick={() => this.deleteSentMessages(sent_messages.id)}
                      className="btn btn-danger"
                    >
                      {t('delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}
export default SentMessage;
