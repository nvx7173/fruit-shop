import React, { useEffect, useState } from "react";
import "./style.css";
import freshfruit from "../../images/freshfruit.png";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineHome,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { IoIosLogIn, IoIosContacts } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, signup } from "../../actions";
import MyVerticallyCenteredModal from "../../components/UI/Modal";
import { TextField } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Icon from "@material-ui/core/Icon";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  updateUsers,
  updatePassword,
  sendMailConfirmAction,
  updateForgotPassword,
  sendMailNewPassword,
} from "../../actions";

const Header = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [updateInfoModal, setUpdateInfoModal] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [confirmEmailTokenModal, setConfirmEmailTokenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const auth = useSelector((state) => state.auth);
  const notifyUpdate = () => toast("Cập nhật thành công! Mời đăng nhập lại");
  const notifyUpdatePassword = () =>
    toast("Đổi mật khẩu thành công! Mời đăng nhập lại");

  const [newFullname, setNewFullname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmEmailToken, setConfirmEmailToken] = useState("");

  const dispatch = useDispatch();
  const notifyLogin = () => toast("Đăng nhập thành công, Wellcome!");
  const notifyLoginFail = () =>
    toast("Đăng nhập thất bại!\nKiểm tra lại tài khoản hoặc mật khẩu!");
  const notifyLogout = () => toast("Đăng xuất thành công!");
  const notifySignup = () => toast("Đăng ký thành công!");
  const notifySignupFail = () => toast("Đăng ký thất bại!");
  const notifyUpdatePassForgot = () =>
    toast("Xác nhận thành công !\nMật khẩu mới đã được gửi về Email của bạn!");
  const notifyUpdatePassForgotError = () =>
    toast("Xác nhận thất bại !\nMã xác nhận không đúng!");
  const userLogin = async () => {
    if (email === "") {
      alert("Mời nhập Email!");
      return;
    }
    if (password === "") {
      alert("Mời nhập mật khẩu!");
      return;
    }
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      email[0] == "@" ||
      email[0] == "." ||
      email.includes("@.") ||
      email.includes(".@") ||
      email[email.length - 1] == "@" ||
      email[email.length - 1] == "."
    ) {
      alert("Nhập sai định dạng email");
      return;
    }
    if (password.length < 6) {
      alert("Mời nhập mật khẩu tối thiểu 6 kí tự!");
      return;
    }
    try {
      await dispatch(login({ email, password }));
      if (auth.fullname !== "") {
        await notifyLogin();
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      await notifyLoginFail();
    }
  };

  const userSignup = async () => {
    if (fullname === "") {
      alert("Mời nhập họ tên!");
      return;
    }
    if (email === "") {
      alert("Mời nhập Email!");
      return;
    }
    if (password === "") {
      alert("Mời nhập mật khẩu!");
      return;
    }
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      email[0] == "@" ||
      email[0] == "." ||
      email.includes("@.") ||
      email.includes(".@") ||
      email[email.length - 1] == "@" ||
      email[email.length - 1] == "."
    ) {
      alert("Nhập sai định dạng email");
      return;
    }
    if (password.length < 6) {
      alert("Mời nhập mật khẩu tối thiểu 6 kí tự!");
      return;
    }
    try {
      await dispatch(signup({ fullname, email, password }));
      notifySignup();
      setModalSignUp(false);
      await dispatch(login({ email, password }));
    } catch (error) {
      await notifySignupFail();
    }
  };

  const logout = () => {
    dispatch(signout());
    notifyLogout();
  };

  const changePassword = () => {
    const form = new Object();
    if (auth) {
      form._id = auth.user._id;
      form.oldPassword = oldPassword;
      form.newPassword = newPassword;
      dispatch(updatePassword(form));
      dispatch(signout());
      setModalInfo(false);
      setUpdatePasswordModal(false);
      notifyUpdatePassword();
    }
  };
  const updateInfo = () => {
    const form = new Object();
    if (auth) {
      form._id = auth.user._id;
      form.fullname = newFullname;
      form.email = newEmail;
      form.role = auth.user.role;
      dispatch(updateUsers(form)).then(() => {
        dispatch(signout());
        setModalInfo(false);
        setUpdateInfoModal(false);
        notifyUpdate();
      });
    }
  };
  const renderLoggedInMenu = () => {
    return (
      <>
        <Link to="#" onClick={() => setModalInfo(true)}>
          <AiOutlineUserAdd />
          <span className="nav-text">{auth.user.fullname}</span>
        </Link>
        <Link onClick={logout}>
          <RiLogoutBoxLine />
          <span className="nav-text">Sign Out</span>
        </Link>
      </>
    );
  };
  const renderNonLoggedInMenu = () => {
    return (
      <>
        <Link onClick={() => setModalShow(true)}>
          <IoIosLogIn />
          <span className="nav-text">Sign In</span>
        </Link>
        <Link onClick={() => setModalSignUp(true)}>
          <AiOutlineUserAdd />
          <span className="nav-text">Sign Up</span>
        </Link>
      </>
    );
  };

  const confirm = () => {
    const form = new Object();
    form.confirmEmail = confirmEmail;
    dispatch(sendMailConfirmAction(form));
    setConfirmEmailTokenModal(true);
  };
  const confirmToken = () => {
    if (confirmEmailToken === "123456789") {
      const form = new Object();
      form.email = confirmEmail;
      form.newPass = "0123456789";
      dispatch(updateForgotPassword(form));
      dispatch(sendMailNewPassword(form));
      notifyUpdatePassForgot();
      setConfirmEmailTokenModal(false);
      setForgotPasswordModal(false);
    } else {
      notifyUpdatePassForgotError();
    }
  };
  useEffect(() => {
    if (auth.authenticate) {
      setModalShow(false);
    }
  }, [auth.authenticate]);

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <Navbar expand="lg">
        <Navbar.Brand to="#home" className="logo-image">
          <img src={freshfruit} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/">
              <AiOutlineHome />
              <span className="nav-text">Home</span>
            </Link>

            <Link to="/about-us">
              <AiOutlineInfoCircle />
              <span className="nav-text">About Us</span>
            </Link>

            <Link to="/contact-us">
              <IoIosContacts />
              <span className="nav-text">Contact Us</span>
            </Link>
            {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
            <Link to="/cart">
              <AiOutlineShoppingCart />
              <span className="nav-text">Cart</span>
            </Link>
            <Link to="/account/orders">
              <AiOutlineShoppingCart />
              <span className="nav-text">My Orders</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <h1 className="form-title flex-item">Sign In</h1>
        <TextField
          className="form-input flex-item"
          type="email"
          id="input-with-icon-textfield"
          label="Tài khoản"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="form-input"
          type="password"
          id="input-with-icon-textfield"
          label="Mật khẩu"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityOff />
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="form-btn"
          onClick={userLogin}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Login
        </Button>
        <div
          className="form-text"
          onClick={() => setForgotPasswordModal(true)}
          style={{ cursor: "pointer" }}
        >
          <p>Quên mật khẩu ?</p>
        </div>
      </MyVerticallyCenteredModal>

      {/* SignUp =======================================================================*/}
      <MyVerticallyCenteredModal
        show={modalSignUp}
        onHide={() => setModalSignUp(false)}
      >
        <h1 className="form-title flex-item">Sign Up</h1>
        <TextField
          className="form-input flex-item"
          type="text"
          id="input-with-icon-textfield"
          label="Họ và tên"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        {/* ============================================================================= */}
        <TextField
          className="form-input flex-item"
          type="email"
          id="input-with-icon-textfield"
          label="Tài khoản"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* ============================================================================== */}
        <TextField
          className="form-input"
          type="password"
          id="input-with-icon-textfield"
          label="Mật khẩu"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityOff />
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* =============================================================================== */}
        <Button
          className="form-btn"
          onClick={userSignup}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Register
        </Button>
      </MyVerticallyCenteredModal>

      {/* User Info */}
      <MyVerticallyCenteredModal
        show={modalInfo}
        onHide={() => setModalInfo(false)}
      >
        <h1 className="form-title flex-item">User Info</h1>
        {auth.authenticate ? (
          <>
            <p>Họ tên : {auth.user.fullname}</p>
            <p>Email : {auth.user.email}</p>
          </>
        ) : (
          ""
        )}
        {/* =============================================================================== */}
        <Button
          className="form-btn"
          onClick={() => {
            setNewFullname(auth.user.fullname);
            setNewEmail(auth.user.email);
            setUpdateInfoModal(true);
          }}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Sửa thông tin
        </Button>
        <Button
          className="form-btn"
          onClick={() => {
            setUpdatePasswordModal(true);
          }}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Đổi mật khẩu
        </Button>
      </MyVerticallyCenteredModal>

      {/* Update User Info */}
      <MyVerticallyCenteredModal
        show={updateInfoModal}
        onHide={() => setUpdateInfoModal(false)}
      >
        <h1 className="form-title flex-item">Update Info</h1>
        <p>Nhập họ tên mới:</p>
        <input
          className="form-control"
          type="text"
          value={newFullname}
          onChange={(e) => setNewFullname(e.target.value)}
        />
        {/* =============================================================================== */}
        <p>Nhập Email mới:</p>
        <input
          className="form-control"
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <Button
          className="form-btn"
          onClick={updateInfo}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Update
        </Button>
      </MyVerticallyCenteredModal>

      {/* Update Password */}
      <MyVerticallyCenteredModal
        show={updatePasswordModal}
        onHide={() => setUpdatePasswordModal(false)}
      >
        <h1 className="form-title flex-item">Update Password</h1>
        <p>Nhập mật khẩu cũ:</p>
        <input
          className="form-control"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        {/* =============================================================================== */}
        <p>Nhập mật khẩu mới:</p>
        <input
          className="form-control"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p>Xác nhận mật khẩu mới:</p>
        <input
          className="form-control"
          type="password"
          value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)}
        />
        <Button
          className="form-btn"
          onClick={changePassword}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Update
        </Button>
      </MyVerticallyCenteredModal>

      {/* Forgot password */}
      <MyVerticallyCenteredModal
        show={forgotPasswordModal}
        onHide={() => setForgotPasswordModal(false)}
      >
        <h1 className="form-title flex-item">Forget Password</h1>
        <p>Nhập email :</p>
        <input
          className="form-control"
          type="text"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
        {/* =============================================================================== */}

        <Button
          className="form-btn"
          onClick={confirm}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Gửi
        </Button>
      </MyVerticallyCenteredModal>

      {/* Confirm Email */}
      <MyVerticallyCenteredModal
        show={confirmEmailTokenModal}
        onHide={() => setConfirmEmailTokenModal(false)}
      >
        <h1 className="form-title flex-item">Forget Password</h1>
        <p>Nhập mã xác nhận :</p>
        <input
          className="form-control"
          type="text"
          value={confirmEmailToken}
          onChange={(e) => setConfirmEmailToken(e.target.value)}
        />
        {/* =============================================================================== */}

        <Button
          className="form-btn"
          onClick={confirmToken}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Gửi
        </Button>
      </MyVerticallyCenteredModal>
    </div>
  );
};

export default Header;
