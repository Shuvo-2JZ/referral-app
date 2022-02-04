import React, { Fragment, useState } from "react";
import { Col, Container, Dropdown, Offcanvas, Row } from "react-bootstrap";
import { FixedSizeList } from "react-window";
import {
  AiFillBank,
  AiOutlineEdit,
  AiOutlineUser,
  AiOutlineUserAdd,
  BsListUl,
  CgDetailsMore,
  FiColumns,
  FiTrash2,
  RiFileExcel2Line,
} from "react-icons/all";
import "react-contexify/dist/ReactContexify.css";
import { Menu, Item, useContextMenu } from "react-contexify";
import CurrencyFormat from "react-currency-format";
import Swal from "sweetalert2";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import { withRouter } from "react-router-dom";
import { ReferralDeleteServices } from "../../APIServices/ReferralDeleteServices";
import { setReferenceDetails } from "../../helper/sessionHelper";
import exportFromJSON from "export-from-json";
const ReferenceList = (props) => {
  const [ItemList, SetItemList] = useState(props.ItemList);
  const [SearchBy, SetSearchBy] = useState("Name");
  const [ViewType, setViewType] = useState("column");
  const [showDetails, setShowDetails] = useState(false);
  const [Details, setDetails] = useState([]);

  // getting the user list
  const [UserList, SetUserList] = useState(props.UserList);

  // merging two list
  ItemList.forEach((item) => {
    UserList.map((user) => {
      if (user.userRef === item.referralCIF) {
        item["fullName"] = user.fullName;
        item["userRef"] = user.userRef;
        item["rmName"] = user.rmName;
        item["branchName"] = user.branchName;
        item["rmMobile"] = user.rmMobile;
        item["mobileNo"] = user.mobileNo;
      }
    });
  });

  // console.log(ItemList);

  const MENU_ID = "MENU_ID";
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function displayMenu(e) {
    show(e, { props: { id: Number(e.currentTarget.id) } });
  }

  function handleItemClick({ event, props, data, triggerEvent }) {
    switch (event.currentTarget.id) {
      case "Details":
        DetailsPopUp(props.id);
        break;
      case "Update":
        GoForUpdate(props.id);
        break;
      case "UpdateRM":
        GoForUpdateRM(props.id);
        break;
      case "Delete":
        DeletePopUp(props.id);
        break;
    }
  }

  const SearchList = (e) => {
    let keyword = e.target.value;
    if (keyword !== "") {
      if (SearchBy === "name") {
        const results = ItemList.filter((search) => {
          return search.name.toLowerCase().startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "mobile") {
        const results = ItemList.filter((search) => {
          return search.mobile.toLowerCase().startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "fullName") {
        const results = ItemList.filter((search) => {
          return search.fullName
            .toLowerCase()
            .startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "userRef") {
        const results = ItemList.filter((search) => {
          return search.userRef.toLowerCase().startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "rmName") {
        const results = ItemList.filter((search) => {
          return search.rmName.toLowerCase().startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "userRef") {
        const results = UserList.filter((search) => {
          return search.userRef.toLowerCase().startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "rmName") {
        const results = UserList.filter((search) => {
          return search.rmName.toLowerCase().startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "assignRFCIF") {
        const results = ItemList.filter((search) => {
          return search.assignRFCIF
            .toLowerCase()
            .startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "branchName") {
        const results = ItemList.filter((search) => {
          return search.branchName
            .toLowerCase()
            .startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      }
    } else {
      SetItemList(props.ItemList);
    }
  };

  const SearchByOnChange = (e) => {
    SetSearchBy(e.target.value);
  };

  const RowListColumn = ({ index, style }) => (
    <Row
      onClick={DetailsPopUp.bind(this, ItemList[index].referralID)}
      onContextMenu={displayMenu}
      id={`${ItemList[index].referralID}`}
      className="grid-row animated slideInUp justify-content-center align-self-center"
      style={style}
    >
      <Col className="grid-col  align-self-center " md={2} lg={2}>
        {ItemList[index].name}
      </Col>
      <Col className="grid-col  align-self-center" md={2} lg={2}>
        {ItemList[index].mobile}
      </Col>
      <Col className="grid-col  align-self-center" md={1} lg={1}>
        {ItemList[index].need}
      </Col>
      <Col className="grid-col  align-self-center" md={1} lg={1}>
        <CurrencyFormat
          value={parseFloat(ItemList[index].amount).toFixed(0)}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <div className="m-0 p-0">৳ {value}</div>}
        />
      </Col>
      <Col className="grid-col  align-self-center " md={2} lg={2}>
        {ItemList[index].fullName}
      </Col>
      <Col className="grid-col  align-self-center " md={1} lg={1}>
        {ItemList[index].rmName}
      </Col>
      <Col className="grid-col  align-self-center " md={1} lg={1}>
        {ItemList[index].rmMobile}
      </Col>
      <Col className="grid-col  align-self-center" md={1} lg={1}>
        {ItemList[index].status}
      </Col>
      <Col className="grid-col  align-self-center " md={1} lg={1}>
        {ItemList[index].mobileNo}
      </Col>
    </Row>
  );

  const RowList = ({ index, style }) => (
    <Container
      onClick={DetailsPopUp.bind(this, ItemList[index].referralID)}
      onContextMenu={displayMenu}
      id={`${ItemList[index].referralID}`}
      className=" animated m-0 p-0 fadeIn"
      style={style}
    >
      <Row className="grid-row-list">
        <Col md={4} lg={4} className="align-self-center">
          <p className="grid-row-list-item-lg">
            <b>Customer Name:</b> {ItemList[index].name}
          </p>
          <p className="grid-row-list-item-lg">
            <b>Customer Mobile:</b> {ItemList[index].mobile}
          </p>
          <p className="grid-row-list-item-lg">
            <b>Customer City:</b> {ItemList[index].city}
          </p>
        </Col>
        <Col md={4} lg={4} className="align-self-center">
          <p className="grid-row-list-item-lg">
            <b>Customer Need:</b> {ItemList[index].need}
          </p>
          <p className="grid-row-list-item-lg">
            <b>Amount:</b> {ItemList[index].amount}
          </p>
          <p className="grid-row-list-item-lg">
            <b>Customer Occupation:</b> {ItemList[index].occupation}
          </p>
        </Col>
        <Col md={4} lg={4} className="align-self-center">
          <p className="grid-row-list-item-lg">
            <b>Make date:</b> {ItemList[index].makedate}
          </p>
          <p className="grid-row-list-item-lg">
            <b>Assign RM:</b> {ItemList[index].assignRFCIF}
          </p>
          <p className="grid-row-list-item-lg">
            <b>Status:</b> {ItemList[index].status}
          </p>
        </Col>
      </Row>
    </Container>
  );

  let GridHead;
  let GridViewHeight;
  let GridListChild;
  if (ViewType === "column") {
    GridHead = (
      <Row className="grid-row-head ">
        <Col className="grid-col-head  align-self-center " md={2} lg={2}>
          Customer Name
        </Col>
        <Col className="grid-col-head  align-self-center" md={2} lg={2}>
          Customer Phone
        </Col>
        <Col className="grid-col-head  align-self-center" md={1} lg={1}>
          Customer Need
        </Col>
        <Col className="grid-col-head  align-self-center" md={1} lg={1}>
          Loan Amount
        </Col>
        <Col className="grid-col-head  align-self-center" md={2} lg={2}>
          User Name
        </Col>
        <Col className="grid-col-head  align-self-center" md={1} lg={1}>
          RM Name
        </Col>
        <Col className="grid-col-head  align-self-center" md={1} lg={1}>
          RM Phone
        </Col>
        <Col className="grid-col-head align-self-center" md={1} lg={1}>
          Status
        </Col>
        <Col className="grid-col-head align-self-center" md={1} lg={1}>
          User Phone No.
        </Col>
      </Row>
    );
    GridViewHeight = 35;
    GridListChild = RowListColumn;
  } else {
    GridViewHeight = 100;
    GridListChild = RowList;
  }

  const listRef = React.createRef();

  const DetailsPopUp = (id) => {
    setShowDetails(true);
    ItemList.map((item, i) => {
      if (item["referralID"] == id) {
        setDetails(item);
      }
    });
  };
  const DetailsPopUpClose = () => {
    setShowDetails(false);
  };

  const GoForUpdate = (referralID) => {
    ItemList.map((item, i) => {
      if (item["referralID"] == referralID) {
        setReferenceDetails(item);
        props.history.push("/ReferenceUpdate");
      }
    });
  };
  const GoForUpdateRM = (referralID) => {
    ItemList.map((item, i) => {
      if (item["referralID"] == referralID) {
        setReferenceDetails(item);
        props.history.push("/ReferenceUpdateRM");
      }
    });
  };

  const DeletePopUp = (referralID) => {
    Swal.fire({
      showClass: { popup: " animated fadeIn" },
      html:
        '<div class="w-100 text-center">' +
        '<h3 class="content-title-lg mt-4 mb-2">Do you want to delete ?</h3>' +
        "<p>Once delete, you can not revert it back.</p> " +
        "</div>",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6777EF",
    }).then((result) => {
      if (result.isConfirmed) {
        ReferralDeleteServices(referralID).then((res) => {
          if (res == 1) {
            SuccessToast("Delete Successful");
            props.history.push("/ReferenceList");
          } else {
            ErrorToast("Request Fail ! Try Again");
          }
        });
      }
    });
  };

  const exportCSV = (data) => {
    const d = new Date();
    let time = d.getTime();
    const fileName = "Ref_List_" + time;
    const exportType = "csv";
    exportFromJSON({ data, fileName, exportType });
  };
  const exportXLS = (data) => {
    const d = new Date();
    let time = d.getTime();
    const fileName = "Ref_List_" + time;
    const exportType = "xls";
    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <Fragment>
      <Container fluid={true} className="content-body m-0">
        <Row className=" p-0 m-0 ">
          <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
            <Container className="content-card " fluid={true}>
              <Row className="m-0 p-0">
                <Col className="p-1 align-self-center">
                  <h5 className="content-title">
                    Reference ({ItemList.length})
                  </h5>
                </Col>
                <Col
                  className=" p-1 align-self-center"
                  md={5}
                  sm={5}
                  lg={5}
                  xs={5}
                >
                  <div className="input-group">
                    <select
                      className="form-control bg-light w-40 form-select"
                      onChange={SearchByOnChange}
                    >
                      <option value="name">Customer Name</option>
                      <option value="mobile">Customer Phone</option>
                      <option value="fullName">User Name</option>
                      <option value="userRef">User CIF</option>
                      <option value="rmName">RM Name</option>
                      <option value="assignRFCIF">RM CIF</option>
                      <option value="branchName">Branch</option>
                    </select>
                    <input
                      onChange={SearchList}
                      placeholder="Search.."
                      type="text"
                      className="form-control w-60"
                    />
                  </div>
                </Col>
                <Col className="p-1 align-self-center">
                  <Dropdown className="w-100">
                    <Dropdown.Toggle
                      variant="light"
                      className="w-100 btn  btn-light"
                      id="dropdown-basic"
                    >
                      <RiFileExcel2Line />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={exportCSV.bind(this, ItemList)}>
                        CSV
                      </Dropdown.Item>
                      <Dropdown.Item onClick={exportXLS.bind(this, ItemList)}>
                        XLS
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className="p-1  align-self-center">
                  <button
                    onClick={() => {
                      setViewType("column");
                    }}
                    className="btn w-100 btn-light"
                  >
                    <FiColumns />
                  </button>
                </Col>
                <Col className="p-1 align-self-center">
                  <button
                    onClick={() => {
                      setViewType("list");
                    }}
                    className="btn w-100 btn-light"
                  >
                    <BsListUl />
                  </button>
                </Col>
              </Row>

              <hr className="content-title-hr" />

              <div>
                {GridHead}
                <FixedSizeList
                  ref={listRef}
                  {...props}
                  className="grid-div"
                  itemCount={ItemList.length}
                  height={420}
                  itemSize={GridViewHeight}
                >
                  {GridListChild}
                </FixedSizeList>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>

      <Menu id={MENU_ID}>
        <Item id="Details" onClick={handleItemClick}>
          <CgDetailsMore className="mx-2 text-dark" /> Details
        </Item>
        <Item id="Update" onClick={handleItemClick}>
          <AiOutlineEdit className="mx-2 text-dark" /> Update
        </Item>
        <Item id="UpdateRM" onClick={handleItemClick}>
          <AiOutlineUser className="mx-2 text-dark" /> Change RM
        </Item>
        <Item id="Delete" onClick={handleItemClick}>
          <FiTrash2 className="mx-2 text-dark" />
          Delete
        </Item>
      </Menu>
      <Offcanvas
        className="animated shadow-sm bg-white slideInRight"
        placement={"end"}
        show={showDetails}
        onHide={DetailsPopUpClose}
        {...props}
      >
        <Offcanvas.Header className="bg-light" closeButton>
          <Offcanvas.Title>
            <h1 className="content-title">REFERRAL DETAILS</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>User CIF: </b>
              {Details["referralCIF"]}
            </li>
            <li className="list-group-item">
              <b>User Name: </b>
              {UserList.map((user) => {
                if (user.userRef === Details["referralCIF"]) {
                  return user.fullName;
                }
              })}
            </li>
            <li className="list-group-item">
              <b>User Phone: </b>
              {UserList.map((user) => {
                if (user.userRef === Details["referralCIF"]) {
                  return user.mobileNo;
                }
              })}
            </li>
            <li className="list-group-item">
              <b>Customer Need: </b>
              {Details["need"]}
            </li>
            <li className="list-group-item">
              <b>Need Amount: </b>
              {Details["amount"]}
            </li>
            <li className="list-group-item">
              <b>Customer Name: </b>
              {Details["name"]}
            </li>
            <li className="list-group-item">
              <b>Customer Mobile:</b> {Details["mobile"]}
            </li>
            <li className="list-group-item">
              <b>Customer Email: </b>
              {Details["email"]}
            </li>
            <li className="list-group-item">
              <b>Customer Occupation: </b>
              {Details["occupation"]}
            </li>
            <li className="list-group-item">
              <b>City: </b>
              {Details["city"]}
            </li>
            <li className="list-group-item">
              <b>Remarks: </b>
              {Details["remarks"]}
            </li>
            <li className="list-group-item">
              <b>Make date: </b>
              {Details["makedate"]}
            </li>
            <li className="list-group-item">
              <b>Status: </b>
              {Details["status"]}
            </li>
            <li className="list-group-item">
              <b>Assigned RM: </b>
              {Details["assignRFCIF"]}
            </li>
            <li className="list-group-item">
              <b>Assigned RM Name: </b>
              {UserList.map((user) => {
                if (user.userRef === Details["referralCIF"]) {
                  return user.rmName;
                }
              })}
            </li>
            <li className="list-group-item">
              <b>Assigned RM Phone: </b>
              {UserList.map((user) => {
                if (user.userRef === Details["referralCIF"]) {
                  return user.rmMobile;
                }
              })}
            </li>
            <li className="list-group-item">
              <b>Assigned RM Branch: </b>
              {UserList.map((user) => {
                if (user.userRef === Details["referralCIF"]) {
                  return user.rmBranch;
                }
              })}
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
};

export default withRouter(ReferenceList);
