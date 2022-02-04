import React, { Component, Fragment } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import {Link, NavLink,Redirect} from "react-router-dom";
import {AiOutlineHome, AiOutlineUsergroupAdd} from "react-icons/ai";
import {BiNetworkChart, BiUserCircle} from "react-icons/bi";
import {BsArrowLeftCircle, BsArrowRightCircle, BsArrowsFullscreen} from "react-icons/bs";
import sidebarLogo from "../../assets/images/sidebarLogo.svg";
import {removeLoginInfo} from "../../helper/sessionHelper";
import {IoDocumentTextOutline, IoIosHelpCircleOutline} from "react-icons/all";


class MasterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      logOutRedirect:false,
      SideNav:true,
    };
  }


  MenuBarClickHandler = () => {
    let sideNav = this.sideNav;
    let content = this.content;
    let topNav = this.topNav;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
      topNav.classList.add("top-navbar-expand");
      topNav.classList.remove("top-navbar");
      this.setState({SideNav:false})
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
      topNav.classList.remove("top-navbar-expand");
      topNav.classList.add("top-navbar");
      this.setState({SideNav:true})
    }
  };
  Logout=()=>{
      removeLoginInfo();
      this.setState({logOutRedirect:true})
  }

  LogoutRedirect=()=>{
    if(this.state.logOutRedirect===true){
      return(
          <Redirect to="/login"/>
      )
    }
  }

  FullScreen = () => {
    if (this.state.isFullScreen === true) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
      this.setState({ isFullScreen: false });
    } else {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
      this.setState({ isFullScreen: true });
    }
  };
  render() {

          let NavArrow= <BsArrowLeftCircle />
          if(this.state.SideNav===true){
               NavArrow= <BsArrowLeftCircle />
          }
          else {
               NavArrow= <BsArrowRightCircle />
          }

          return (
              <Fragment>
                  {this.LogoutRedirect()}
                  <div>
                      <Navbar ref={(div) => {this.topNav = div;}} className=" fixed-top top-navbar ">
                          <Container fluid={true}>
                              <Navbar.Brand onClick={this.MenuBarClickHandler}>
                                  <a className="text-white h3">
                                      {NavArrow}
                                  </a>
                              </Navbar.Brand>
                              <div className="float-right">
                                  <button className="mx-1 text-white btn"  >
                                      <BiUserCircle className="text-white"/>
                                  </button>
                                  <button className="mx-1 text-white btn" onClick={this.Logout} >
                                      Logout
                                  </button>
                                  <button className="mx-1 text-white btn"  onClick={this.FullScreen} >
                                      {" "}
                                      <BsArrowsFullscreen />
                                  </button>
                              </div>

                          </Container>
                      </Navbar>
                      <div ref={(div) => {this.sideNav = div;}} className="side-nav-open">
                          <div className="side-nav-top text-center">
                              <Link to="/" className="text-center">
                                  <img alt="" className="side-nav-logo" src={sidebarLogo} />
                              </Link>
                          </div>

                          <NavLink exact={true} activeClassName="side-bar-item-active" to="/" className="side-bar-item">
                              <AiOutlineHome className="side-bar-item-icon" />
                              <span className="side-bar-item-caption">Home</span>
                          </NavLink>

                          <NavLink exact={true} activeClassName="side-bar-item-active" to="/UserList" className="side-bar-item">
                              <AiOutlineUsergroupAdd className="side-bar-item-icon" />
                              <span className="side-bar-item-caption">Users</span>
                          </NavLink>

                          <NavLink exact={true} activeClassName="side-bar-item-active" to="/ReferenceList" className="side-bar-item">
                              <BiNetworkChart className="side-bar-item-icon" />
                              <span className="side-bar-item-caption">Reference</span>
                          </NavLink>

                          <NavLink exact={true} activeClassName="side-bar-item-active" to="/FaqList" className="side-bar-item">
                              <IoIosHelpCircleOutline className="side-bar-item-icon" />
                              <span className="side-bar-item-caption">FAQ</span>
                          </NavLink>

                          <NavLink exact={true} activeClassName="side-bar-item-active" to="/DocumentsList" className="side-bar-item">
                              <IoDocumentTextOutline className="side-bar-item-icon" />
                              <span className="side-bar-item-caption">Documents</span>
                          </NavLink>

                      </div>
                      <div ref={(div) => {this.content = div;}} className="content">
                          {this.props.children}
                      </div>
                  </div>

              </Fragment>
          );
      }


}
export default MasterLayout;
