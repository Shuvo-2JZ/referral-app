import React, { Fragment, useState } from "react";
import { Col, Container, Dropdown, Offcanvas, Row } from "react-bootstrap";
import { FixedSizeList } from "react-window";
import {
  AiFillBank,
  AiOutlineEdit,
  AiOutlineUser,
  AiOutlineUserAdd,
  BsColumns,
  BsListUl,
  CgDetailsMore,
  FaUsers,
  FiColumns,
  FiTrash2,
  HiOutlineViewGridAdd,
  RiFileExcel2Line,
} from "react-icons/all";
import "react-contexify/dist/ReactContexify.css";
import { Menu, Item, useContextMenu } from "react-contexify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { UserDeleteServices } from "../../APIServices/UserDeleteServices";
import { withRouter } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import { setUserDetails } from "../../helper/sessionHelper";
import exportFromJSON from "export-from-json";

const UserList = (props) => {
  const [ItemList, SetItemList] = useState(props.itemlist);
  const [SearchBy, SetSearchBy] = useState("fullName");
  const [showDetails, setShowDetails] = useState(false);
  const [Details, setDetails] = useState([]);
  const [ViewType, setViewType] = useState("column");

  const MENU_ID = "MENU_ID";
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function displayMenu(e) {
    show(e, { props: { id: e.currentTarget.id } });
  }

  function handleItemClick({ event, props, data, triggerEvent }) {
    switch (event.currentTarget.id) {
      case "Details":
        DetailsPopUp(props.id);
        break;
      case "Update":
        GoUpdate(props.id);
        break;
      case "ChangeRM":
        GoChangeRM(props.id);
        break;
      case "Delete":
        DeletePopUp(props.id);
        break;
    }
  }

  const GoUpdate = (id) => {
    ItemList.map((item, i) => {
      if (item["userRegID"] == id) {
        setUserDetails(item);
        props.history.push("/UserUpdate");
      }
    });
  };

  const GoChangeRM = (id) => {
    ItemList.map((item, i) => {
      if (item["userRegID"] == id) {
        setUserDetails(item);
        props.history.push("/ChangeRM");
      }
    });
  };

  const DetailsPopUp = (id) => {
    setShowDetails(true);
    ItemList.map((item, i) => {
      if (item["userRegID"] == id) {
        setDetails(item);
      }
    });
  };

  const DetailsPopUpClose = () => {
    setShowDetails(false);
  };

  const DeletePopUp = (UserRegID) => {
    Swal.fire({
      showClass: {
        popup: " animated fadeIn",
      },
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
        UserDeleteServices(UserRegID).then((res) => {
          if (res == 1) {
            SuccessToast("Delete Successful");
            props.history.push("/UserList");
          } else {
            ErrorToast("Request Fail ! Try Again");
          }
        });
      }
    });
  };

  // Search By items....
  const SearchList = (e) => {
    let keyword = e.target.value;
    if (keyword !== "") {
      if (SearchBy === "fullName") {
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
      } else if (SearchBy === "mobileNo") {
        const results = ItemList.filter((search) => {
          return search.mobileNo
            .toLowerCase()
            .startsWith(keyword.toLowerCase());
        });
      } else if (SearchBy === "rmcif") {
        const results = ItemList.filter((search) => {
          return search.rmcif.toLowerCase().startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "rmName") {
        const results = ItemList.filter((search) => {
          return search.rmName.toLowerCase().startsWith(keyword.toLowerCase());
        });
        SetItemList(results);
      } else if (SearchBy === "rmBranch") {
        const results = ItemList.filter((search) => {
          return search.rmBranch
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

  // this is the list
  const RowListColumn = ({ index, style }) => (
    <Row
      onClick={DetailsPopUp.bind(this, ItemList[index].userRegID)}
      onContextMenu={displayMenu}
      id={`${ItemList[index].userRegID}`}
      className="grid-row animated fadeIn"
      style={style}
    >
      <Col className="grid-col align-self-center " md={1} lg={1}>
        {index + 1}
      </Col>
      <Col className="grid-col align-self-center" md={2} lg={2}>
        {ItemList[index].fullName}
      </Col>

      {/* CIF */}
      <Col className="grid-col align-self-center" md={1} lg={1}>
        {ItemList[index].userRef}
      </Col>

      <Col className="grid-col align-self-center" md={2} lg={2}>
        {ItemList[index].mobileNo}
      </Col>
      <Col className="grid-col align-self-center" md={2} lg={2}>
        {ItemList[index].rmName}
      </Col>
      <Col className="grid-col align-self-center" md={1} lg={1}>
        {ItemList[index].rmcif}
      </Col>

      <Col className="grid-col align-self-center" md={1} lg={1}>
        {ItemList[index].rmBranch}
      </Col>

      <Col className="grid-col align-self-center" md={1} lg={1}>
        {ItemList[index].rmMobile}
      </Col>
    </Row>
  );

  const RowList = ({ index, style }) => (
    <Container
      fluid={true}
      onClick={DetailsPopUp.bind(this, ItemList[index].userRegID)}
      onContextMenu={displayMenu}
      id={`${ItemList[index].userRegID}`}
      className="animated m-0 p-0 fadeIn"
      style={style}
    >
      <Row className="grid-row-list ">
        <Col md={3} lg={3} className="align-self-center">
          <p className="grid-row-list-item-lg">
            <b>Full Name:</b> {ItemList[index].fullName}
          </p>
          <p className="grid-row-list-item-lg">
            <b>Mobile:</b> {ItemList[index].mobileNo}
          </p>
          <p className="grid-row-list-item-lg">
            <b>CIF:</b> {ItemList[index].userRef}
          </p>
        </Col>
        <Col md={3} lg={3} className="align-self-center">
          <p className="grid-row-list-item-lg">
            <b>User Password:</b> {ItemList[index].userPass}
          </p>
          <p className="grid-row-list-item-lg">
            <b>RM Name:</b> {ItemList[index].rmName}
          </p>
          <p className="grid-row-list-item-lg">
            <b>RM CIF:</b> {ItemList[index].rmcif}
          </p>
        </Col>
        <Col md={3} lg={3} className="align-self-center">
          <p className="grid-row-list-item-lg">
            <b>RM Branch:</b> {ItemList[index].rmBranch}
          </p>
          <p className="grid-row-list-item-lg">
            <b>Mobile:</b> {ItemList[index].mobileNo}
          </p>
          <p className="grid-row-list-item-lg">
            <b>CIF:</b> {ItemList[index].userRef}
          </p>
        </Col>

        <Col md={3} lg={3} className="align-self-center">
          <p className="grid-row-list-item-lg">
            <b>C.Percentage:</b> {ItemList[index].commissionPercentage} %
          </p>
          <p className="grid-row-list-item-lg">
            <b>User Type:</b> {ItemList[index].refUserType}
          </p>
          <p className="grid-row-list-item-lg">
            <b>Institution:</b> {ItemList[index].refUserInstitution}
          </p>
        </Col>
      </Row>
    </Container>
  );
  const listRef = React.createRef();

  // this is the list header
  let GridHead;
  let GridViewHeight;
  let GridListChild;
  if (ViewType === "column") {
    GridHead = (
      <Row className="grid-row-head  ">
        <Col className="grid-col-head-first align-self-center" md={1} lg={1}>
          No
        </Col>
        <Col className="grid-col-head align-self-center" md={2} lg={2}>
          Full Name
        </Col>
        <Col className="grid-col-head align-self-center" md={1} lg={1}>
          CIF
        </Col>
        <Col className="grid-col-head align-self-center" md={2} lg={2}>
          Mobile No.
        </Col>
        <Col className="grid-col-head align-self-center" md={2} lg={2}>
          RM Name
        </Col>
        <Col className="grid-col-head align-self-center" md={1} lg={1}>
          RM CIF
        </Col>

        <Col className="grid-col-head align-self-center" md={1} lg={1}>
          RM Branch
        </Col>

        <Col className="grid-col-head align-self-center" md={2} lg={2}>
          RM Phone No.
        </Col>
      </Row>
    );
    GridViewHeight = 35;
    GridListChild = RowListColumn;
  } else {
    GridViewHeight = 100;
    GridListChild = RowList;
  }

  const exportCSV = (data) => {
    const d = new Date();
    let time = d.getTime();
    const fileName = "User_List_" + time;
    const exportType = "csv";
    exportFromJSON({ data, fileName, exportType });
  };
  const exportXLS = (data) => {
    const d = new Date();
    let time = d.getTime();
    const fileName = "User_List_" + time;
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
                  <h5 className="content-title">Users ({ItemList.length})</h5>
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
                      className="form-control bg-light w-40 form-select form-control-sm"
                      onChange={SearchByOnChange}
                    >
                      <option value="fullName">Full Name</option>
                      <option value="mobileNo">User Mobile</option>
                      <option value="userRef">User CIF</option>
                      <option value="rmName">RM Name</option>
                      <option value="rmcif">RM CIF</option>
                      <option value="rmBranch">RM Branch</option>
                    </select>
                    <input
                      onChange={SearchList}
                      placeholder="Search.."
                      type="text"
                      className="form-control form-control-sm w-60"
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
                <Col className="p-1 align-self-center">
                  <Link to="/UserAdd" className="btn w-100 btn-light">
                    <AiOutlineUserAdd />
                  </Link>
                </Col>
                <Col className="p-1  align-self-center">
                  <Link to="/BulkUserAdd" className="btn w-100 btn-light">
                    <FaUsers />
                  </Link>
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
          <AiOutlineEdit className="mx-2 text-dark" /> Update Details
        </Item>
        <Item id="ChangeRM" onClick={handleItemClick}>
          <AiOutlineEdit className="mx-2 text-dark" /> Change RM
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
            <h1 className="content-title">USER DETAILS</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group list-group-flush">
            <h6 className="">
              <b>
                <AiOutlineUser /> User Profile
              </b>{" "}
            </h6>
            <hr className="m-0" />
            <li className="list-group-item">
              <b>Full Name: </b>
              {Details["fullName"]}
            </li>
            <li className="list-group-item">
              <b>User Ref: </b>
              {Details["userRef"]}
            </li>
            <li className="list-group-item">
              <b>Mobile No: </b>
              {Details["mobileNo"]}
            </li>
            <li className="list-group-item">
              <b>User Pass: </b>
              {Details["userPass"]}
            </li>
            <li className="list-group-item">
              <b>Commission Percentage:</b> {Details["commissionPercentage"]}
            </li>
            <li className="list-group-item">
              <b>Ref User Type: </b>
              {Details["refUserType"]}
            </li>
            <li className="list-group-item">
              <b>Ref User Institution: </b>
              {Details["refUserInstitution"]}
            </li>
            <li className="list-group-item">
              <b>User Details: </b>
              {Details["userDetails"]}
            </li>
          </ul>

          <ul className="list-group my-4 list-group-flush">
            <h6 className="">
              <b>
                <AiOutlineUserAdd /> Assigned RM
              </b>{" "}
            </h6>
            <hr className="m-0" />
            <li className="list-group-item">
              <b>RM CIF: </b>
              {Details["rmcif"]}
            </li>
            <li className="list-group-item">
              <b>RM Name: </b>
              {Details["rmName"]}
            </li>
            <li className="list-group-item">
              <b>RM Branch: </b>
              {Details["rmBranch"]}
            </li>
            <li className="list-group-item">
              <b>RM Mobile: </b>
              {Details["rmMobile"]}
            </li>
          </ul>

          <ul className="list-group list-group-flush">
            <h6 className="">
              <b>
                <AiFillBank /> User Payout Acc
              </b>{" "}
            </h6>
            <hr className="m-0" />
            <li className="list-group-item">
              <b>Bank Acc Name: </b>
              {Details["bankAccName"]}
            </li>
            <li className="list-group-item">
              <b>Bank Name: </b>
              {Details["bankName"]}
            </li>
            <li className="list-group-item">
              <b>Branch Name: </b>
              {Details["branchName"]}
            </li>
            <li className="list-group-item">
              <b>Routing No: </b>
              {Details["routingNo"]}
            </li>
            <li className="list-group-item">
              <b>Bank Acc No: </b>
              {Details["bankAccNo"]}
            </li>
            <li className="list-group-item">
              <b>MFS Acc Type: </b>
              {Details["mfsAccType"]}
            </li>
            <li className="list-group-item">
              <b>MFS Acc No: </b>
              {Details["mfsAccNo"]}
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
};

export default withRouter(UserList);
