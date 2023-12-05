import React, { useState } from "react";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import "./Product.css";
import { useNavigate } from "react-router";
import Filter from "./Filter";
const ProductList = ({
  removeFilter,
  order,
  decision,
  products,
  addToCart,
  categories,
  handleFilter,
  handleCategory,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 12; // Number of items to display per page

  const data = [...products];

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = data.slice(startIndex, endIndex);

  return (
    <Container fluid>
      <Filter
        removeFilter={removeFilter}
        order={order}
        decision={decision}
        categories={categories}
        handleFilter={handleFilter}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        handleCategory={handleCategory}
      />
      <Row className="g-4">
        {productsToDisplay.map((product) => (
          <Col md={2} key={product._id} style={{ marginTop: "3rem" }}>
            <Card className="h-100 product-list">
              <Card.Img
                variant="top"
                src={product.img}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "150px",
                  margin: "0px auto",
                }}
              />
              <Card.Body style={{ fontSize: "17px", lineHeight: "18px" }}>
                <Card.Title className="text-start mt-2 mb-3">
                  {product.name}
                </Card.Title>
                <Card.Text className="mt-4 mb-2" style={{ color: "#db9112" }}>
                  Price: ${product.price}
                </Card.Text>

                {/* <Card.Text className="mb-3">{product.description}</Card.Text> */}
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/productDetails/" + product._id);
                  }}
                  className="w-100 my-2"
                >
                  View Details
                </Button>
                <Button
                  variant="primary"
                  onClick={() => addToCart(product)}
                  className="w-100 my-2"
                  style={{
                    color: "#fff",
                    backgroundColor: "#e59b11",
                    borderColor: "#e59b11",
                  }}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Pagination className="d-flex justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Row>
      {/* } */}
    </Container>
  );
};

export default ProductList;
