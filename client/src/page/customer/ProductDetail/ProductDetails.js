import React, { useEffect, useState } from "react";
import { Col, Row, Button, Image } from "react-bootstrap";
import { findById } from "../../../api/product";

import "./Productdetail.css";
import { useParams } from "react-router";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const getProduct = async (id) => {
    let productt = await findById(id);
    setProduct(productt);
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  return (
    <>
      <Row>
        <Col md={9}>
          <Row className="g-4">
            <Col md={5} key={product._id} className="mx-3">
              <Image
                src={product?.img}
                style={{ width: "100%", minHeight: "30rem" }}
              ></Image>
            </Col>
            <Col md={6} key={product._id}>
              <h1>{product.name}</h1>

              <h5 className="mt-2 mb-3">
                Business Name:{" "}
                <span className="text-info mx-2">{product.seller}</span>
              </h5>

              <div className="d-flex flex-column" style={{}}>
                <h3 className="text-danger mb-5 mt-3"> {product.price} VND</h3>
              </div>
              <h5>Description</h5>
              <p>{product.description}</p>
              <p>
                {product.attributes &&
                  product.attributes.map((item) => (
                    <h5 key={item.name}>
                      {item.name} : {item.value}
                    </h5>
                  ))}
              </p>

              <div className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  className="text-center bg-warning border-0 mt-4 mx-2"
                  style={{ height: "4em", width: "20em" }}
                >
                  Add To Cart
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default ProductDetail;
