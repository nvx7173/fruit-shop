import axios from "../helpers/axios";

export const sendMailAction = (mail) => {
  return async (dispatch) => {
    const res = await axios.post(`/sendmail`, mail);
  };
};

export const sendMailConfirmAction = (mail) => {
  return async (dispatch) => {
    const res = await axios.post(`/sendmailconfirm`, mail);
  };
};
