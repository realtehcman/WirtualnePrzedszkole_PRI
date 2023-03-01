import React from "react";
import { useNavigate } from "react-router-dom";
import "../GroupDisplay/Popup.css";
import "../User/Table.scss";
import SentMessageService from "./SentMessageService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18next from 'i18next';
import { withTranslation } from "react-i18next";
const { t } = i18next;

const Navi2 = (props) => {
  const { t } = i18next;
  const navigate = useNavigate();
  return (
      <button
          onClick={() =>
              navigate("/StatusMessage/" + props.value)
          }
          className="btn btn-info"
      >
        {t('status')}

      </button>
  );
};

const Navi = (props) => {
  const { t } = i18next;
  const navigate = useNavigate();
  return (
      <button
          onClick={() => navigate("/ViewMessage/" + props.value)}
          className="btn btn-info"
      >
            {t('view')}
      </button>
  );
};

class SentMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sent_messages: [],
      error: null
    };
    this.deleteSentMessages = this.deleteSentMessages.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    if (error.response && error.response.status === 403) {
      this.setState({ error: error });
    } else {
      throw error;
    }
  }

  deleteSentMessages2(id) {
    SentMessageService.deleteSentMessages(id).then((response) => {
      this.setState({
        sent_messages: this.state.sent_messages.filter(
            (sent_messages) => sent_messages.id !== id
        ),
      });
    });
  }

  deleteSentMessages(id) {
    let groupName = this.state.sent_messages.find(sent_messages => sent_messages.id === id);
    if(window.confirm(t("confirm_msg_deletion"))) {
      SentMessageService.deleteSentMessages(id)
          .then((response) => {
            this.setState({
              sent_messages: this.state.sent_messages.filter((sent_messages) => sent_messages.id !== id),
            });
              toast.success(t('success_message_deletion'), {
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
    SentMessageService.getSentMessages().then((response) => {
      let sortedData = response.data.sort((a, b) => b.id - a.id);
      this.setState({ sent_messages: sortedData });
    }).catch(error => {
      if (error.response && error.response.status === 403) {
        this.setState({ error: error });
      } else {
        throw error;
      }
    });
  }

  dateConvertToNormalFormat(responseDate) {
    const date = new Date(responseDate)
    return date.toLocaleString()
  }

  render() {
    const { t } = i18next;

    if (this.state.error) {

      return <h1>403 - Nie masz uprawnień, aby uzyskać dostęp do tej strony</h1>;
    }

    return (
      <div data-testid="sent-message" className="scrollable-div">
        <ToastContainer />
        <table className="content-table">
          <thead>
            <tr className="table-head">
              <td>{t('date')}</td>
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
                  <Navi value={sent_messages.id} />
                  <Navi2 value={sent_messages.id} />
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
    );
  }
}
export default withTranslation()(SentMessage);
