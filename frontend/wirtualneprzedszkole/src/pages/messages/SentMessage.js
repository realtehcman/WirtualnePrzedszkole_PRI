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
      Status
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
      Wyświetl
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
    return (
      <div data-testid="sent-message" className="App_card">
        <div className="scrollable-div">
          <table className="content-table w-100">
            <thead>
              <tr className="table-head">
                <td>Data</td>
                <td>Autor</td>
                <td>Temat</td>
                <td>Treść</td>
                <td>Akcje</td>
              </tr>
            </thead>
            <tbody>
              {this.state.sent_messages.map((sent_messages) => (
                <tr key={sent_messages.id}>
                  <td id="td--message">{this.dateConvertToNormalFormat(sent_messages.sentDate)}</td>
                  <td id="td--message">{sent_messages.author}</td>
                  <td id="td--message">{sent_messages.subject}</td>
                  <td id="td--message">
                    <Navi value={sent_messages.id} />
                    <Navi2 value={sent_messages.id} />
                  </td>
                  <td className="foobar">
                    <button
                      onClick={() => this.deleteSentMessages(sent_messages.id)}
                      className="btn btn-danger"
                    >
                      Usuń
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
