import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  render() {
    return (
      <div data-testid="sent-message" className="scrollable-div">
        <table className="content-table">
          <thead>
            <tr className="table-head">
              <td>Id</td>
              <td>Autor</td>
              <td>Temat</td>
              <td>Treść</td>
              <td>Akcje</td>
            </tr>
          </thead>
          <tbody>
            {this.state.sent_messages.map((sent_messages) => (
              <tr key={sent_messages.id}>
                <td id="td--message">{sent_messages.id}</td>
                <td id="td--message">{sent_messages.author}</td>
                <td id="td--message">{sent_messages.subject}</td>
                <td id="td--message">
                  <Navi value={sent_messages.id} />
                  <Navi2 value={sent_messages.id} />
                </td>
                <td className="foobar">
                  <button2
                    onClick={() => this.deleteSentMessages(sent_messages.id)}
                    className="btn btn-danger"
                  >
                    Usuń
                  </button2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default SentMessage;
