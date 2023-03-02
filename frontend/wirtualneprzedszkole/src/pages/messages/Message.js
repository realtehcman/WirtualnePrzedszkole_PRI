import React from "react";
import {useNavigate} from "react-router-dom";
import MessageService from "./MessageService";
import "../GroupDisplay/Popup.css";
import "../User/Table.scss";
import SentMessageService from "./SentMessageService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withTranslation } from "react-i18next";
import i18next from 'i18next';
const { t } = i18next;

const Navi = (props) => {
  const { t } = i18next;

  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/ReadMessage/" + props.value)}
      className="btn btn-info"
    >
            {t('look')}

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
    let groupName = this.state.received_messages.find(sent_messages => sent_messages.id === id);
    if(window.confirm(t("confirm_msg_deletion?"))) {
      MessageService.deleteReceivedMessages(id)
          .then((response) => {
            this.setState({
              received_messages: this.state.received_messages.filter((received_messages) => received_messages.id !== id),
            });
            toast.success(t("success_message_deletion"), {
              position: toast.POSITION.TOP_RIGHT
            });
          })
          .catch(error => {
            toast.error(t("error_group_deletion") + " " + groupName + ".", {
              position: toast.POSITION.TOP_RIGHT
            });
          });
    }
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
    const { t } = i18next;

    return (
      <div data-testid="message" className="scrollable-div">
        <ToastContainer />
        <table className="content-table">
          <thead>
            <tr className="table-head">
              <td>{t('date')}</td>
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
                      <td id="td--message">{this.dateConvertToNormalFormat(received_messages.sentDate)}</td>
                      <td id="td--message">{received_messages.author}</td>
                      <td id="td--message">{received_messages.subject}</td>
                      <td id="td--message">
                        {" "}
                        <Navi value={received_messages.id} />
                      </td>
                      <td className="foobar">
                        <button
                            onClick={() =>
                                this.deleteReceivedMessages(received_messages.id)
                            }
                            className="btn btn-danger"
                        >
                          {i18next.t('delete')}

                        </button>
                      </td>
                    </tr>
                ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}
export default withTranslation()(Message);
