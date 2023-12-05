import React, { useEffect, useState } from "react";
import { changeStatus, getSellers } from "../../../api/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpZA,
  faBriefcase,
  faCheckCircle,
  faEnvelope,
  faHandPointer,
  faKey,
  faPhone,
  faSearch,
  faSignal,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import AdminDashboard from "./AdminDashBoard";
import { Col } from "react-bootstrap";
import LoaderSpinner from "../../../components/LoaderSpinner";

const SellerApproval = () => {
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [order, setOrder] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const allSellers = await getSellers();
    if (allSellers) {
      setSellers(allSellers);
      setFilteredSellers(allSellers);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApproveSeller = async (sellerId) => {
    await changeStatus(sellerId, "Approved");
    fetchData();
  };

  const handleRejectSeller = async (sellerId) => {
    await changeStatus(sellerId, "Rejected");
    fetchData();
  };

  const handleFilter = (decision) => {
    if (decision === "search") {
      setFilteredSellers(sellers.filter((s) => s.email.includes(searchName)));
    } else if (decision === "order") {
      setFilteredSellers(
        filteredSellers.sort((prev, cur) => {
          return order * prev.email.localeCompare(cur.email);
        })
      );
    }
  };

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <div>
      <div className="seller-approval">
        {filteredSellers && <AdminDashboard sellers={sellers} />}
        <Row className="mb-2">
          <Col>
            <label htmlFor="search">Email: </label>
            <input
              type="text"
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            ></input>
            <button
              onClick={() => {
                handleFilter("search");
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button
              onClick={() => {
                setOrder(order * -1);
                handleFilter("order");
              }}
              className="mx-3 border-0 rounded-3 bg-light"
              style={{ width: "10rem" }}
            >
              <FontAwesomeIcon icon={faArrowUpZA} className="mx-1" />
              Filter By Name
            </button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">
                <FontAwesomeIcon icon={faKey} className="mx-1" />
                ID
              </th>
              <th scope="col">
                <FontAwesomeIcon icon={faEnvelope} className="mx-1" />
                Email
              </th>
              <th scope="col">
                <FontAwesomeIcon icon={faPhone} className="mx-1" />
                Phone
              </th>
              <th scope="col">
                <FontAwesomeIcon icon={faBriefcase} className="mx-1" />
                Business Name
              </th>
              <th scope="col">
                <FontAwesomeIcon icon={faSignal} className="mx-1" />
                Status
              </th>
              <th scope="col">
                <FontAwesomeIcon icon={faHandPointer} className="mx-1" />
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSellers.map((seller, index) => (
              <tr
                key={seller._id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{index}</td>
                <td>{seller._id}</td>
                <td>{seller.email}</td>
                <td>{seller.phone}</td>
                <td>{seller.businessName}</td>
                <td
                  className={` ${
                    seller.sellerStatus === "Approved"
                      ? "text-success"
                      : seller.sellerStatus === "Pending"
                      ? "text-warning"
                      : "text-danger"
                  }`}
                >
                  {seller.sellerStatus}
                </td>
                <td colSpan={2}>
                  <button
                    className="approve-button p-2 mx-2 rounded-3 border-0 bg-success text-white"
                    onClick={() => handleApproveSeller(seller._id)}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="mx-1"
                      size="sm"
                    />
                    Approve
                  </button>
                  <button
                    className="reject-button p-2 rounded-3 bg-danger border-0 text-white"
                    onClick={() => handleRejectSeller(seller._id)}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="mx-1"
                      size="sm"
                    />
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SellerApproval;
