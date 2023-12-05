import React, { useEffect, useState } from "react";
import { Table, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formattedDate } from "../../../service/authService";
import {
  faArrowsUpDown,
  faCalendar,
  faHomeUser,
  faKey,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const ProductTable = ({ products }) => {
  const [searchProduct, setSearchProduct] = useState([]);
  const [currentSearch, setCurrentSeacrh] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [direction, setDirection] = useState(1);
  const [searchOption, setSearchOption] = useState("name");

  const handleSearch = (search) => {
    setCurrentSeacrh(search);
    let updatedProductsList = [...products];
    updatedProductsList = updatedProductsList.filter((p) =>
      p[searchOption].toString().includes(search)
    );
    setSearchProduct(updatedProductsList);
  };

  const handling = (decision) => {
    const updatedProductsList = [...searchProduct];
    switch (decision) {
      case "price":
        updatedProductsList.sort((prev, cur) => {
          return direction * (prev.price - cur.price);
        });
        break;
      case "name":
        updatedProductsList.sort((prev, cur) => {
          return direction * prev.name.localeCompare(cur.name);
        });
        break;
      case "date":
        updatedProductsList.sort((prev, cur) => {
          if (prev.createdAt < cur.createdAt) {
            return direction * -1;
          } else if (prev.createdAt > cur.createdAt) {
            return direction * 1;
          } else {
            return 0;
          }
        });
        break;
      default:
        break;
    }
    setProductsList(updatedProductsList);
  };
  const handleFilter = (decision) => {
    if (activeFilter !== decision) {
      handling(decision);
      setActiveFilter(decision);
    } else {
      setActiveFilter(null);
      handleSearch(currentSearch);
    }
    //
  };
  const removeFilter = () => {
    setProductsList(products);
    setSearchProduct(products);
    setCurrentSeacrh("");
    setDirection(1);
    setActiveFilter(null);
    setSearchOption("name");
  };
  useEffect(() => {
    handling(activeFilter);
  }, [direction, searchProduct]);

  useEffect(() => {
    setSearchProduct(products);
    setProductsList(products);
  }, [products]);
  console.log(searchProduct);
  return (
    <div className="product-table">
      <Row className="mb-2">
        <Col>
          <Form.Control
            size="sm"
            as="select"
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value={"name"}>Name</option>
            <option value={"price"}>Price</option>
            <option value={"createdAt"}>Date</option>
          </Form.Control>
          <input
            type="text"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              setDirection(direction * -1);
            }}
            className={`mx-3 border-0 rounded-3 ${
              direction === 1 ? "bg-success text-white" : "bg-danger"
            }`}
            style={{ width: "10rem" }}
          >
            <FontAwesomeIcon icon={faArrowsUpDown} />
            {direction === 1 ? "Ascending" : "Descending"}
          </button>

          <button
            onClick={() => {
              handleFilter("name");
            }}
            className={`mx-3 border-0 rounded-3 ${
              activeFilter === "name" ? "bg-primary text-white" : ""
            }`}
            style={{ width: "14rem" }}
          >
            Name
          </button>
          <button
            onClick={() => {
              handleFilter("price");
            }}
            className={`mx-3 border-0 rounded-3 ${
              activeFilter === "price" ? "bg-primary text-white" : ""
            }`}
            style={{ width: "10rem" }}
          >
            Price
          </button>
          <button
            onClick={() => {
              handleFilter("date");
            }}
            className={`mx-3 border-0 rounded-3 ${
              activeFilter === "date" ? "bg-primary text-white" : ""
            }`}
            style={{ width: "14rem" }}
          >
            By Date
          </button>

          <button
            onClick={() => {
              removeFilter();
            }}
            className={`mx-3 border-0 rounded-3`}
            style={{ width: "14rem" }}
          >
            Remove Filter
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
              <FontAwesomeIcon icon={faHomeUser} className="mx-1" />
              Name
            </th>
            <th scope="col">
              <FontAwesomeIcon icon={faMoneyCheckDollar} className="mx-1" />
              Price
            </th>
            <th scope="col">
              <FontAwesomeIcon icon={faCalendar} className="mx-1" />
              Date Added
            </th>
            <th scope="col">
              <FontAwesomeIcon icon={faCalendar} className="mx-1" />
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {productsList.map((product, index) => (
            <React.Fragment key={product._id}>
              <tr
                className={`
           
                 ${index % 2 === 0 ? " even-row" : " odd-row"}`}
              >
                <td>{index}</td>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{formattedDate(product.createdAt)}</td>
                <td>
                  <button
                    className="mx-3 border-0 rounded-3 text-white bg-success"
                    style={{ width: "14rem" }}
                  >
                    <Link to={`/seller/product/${product._id}`}>
                      {" "}
                      View Details
                    </Link>
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
