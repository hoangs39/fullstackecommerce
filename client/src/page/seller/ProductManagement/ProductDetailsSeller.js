import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  deleteProduct,
  updateProduct,
} from "../../../api/seller";
import { getCategoryById } from "../../../api/category";
import { formattedDate } from "../../../service/authService";
const ProductDetailsSeller = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editedProduct, setEditedProduct] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [category, setCategory] = useState("");

  const fetchProduct = async () => {
    const data = await getProductById(id);
    setEditedProduct(data);
    setIsDirty(false);
  };
  useEffect(() => {
    fetchProduct();
    getCategoryName(id);
  }, [id]);

  const handleEditField = (fieldName, value) => {
    const updatedProduct = { ...editedProduct, [fieldName]: value };
    setEditedProduct(updatedProduct);
    setIsDirty(true);
  };
  const handleEditAttribute = (index, value) => {
    console.log(value);
    const updatedAttributes = [...editedProduct.attributes];
    updatedAttributes[index] = { ...updatedAttributes[index], value };

    const updatedProduct = { ...editedProduct, attributes: updatedAttributes };
    setEditedProduct(updatedProduct);
    setIsDirty(true);
  };

  const handleSaveChanges = async () => {
    await updateProduct(editedProduct, id);
    fetchProduct();
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(id);
    navigate("/");
  };

  const getCategoryName = async (id) => {
    const data = await getCategoryById(id);
    console.log(data);
    setCategory(data?.name);
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg={3} md={12} className="mb-3 mb-md-0">
            <img
              src={editedProduct.img || ""}
              alt="Product"
              className="img-fluid"
            />
          </Col>
          <Col lg={9} md={12}>
            <h2>Product Details</h2>

            <Form>
              {/* Display image above all information for medium screens and below */}

              {/* Other form fields */}
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editedProduct.name || ""}
                  onChange={(e) => handleEditField("name", e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editedProduct.price || ""}
                  onChange={(e) => handleEditField("price", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={editedProduct.description || ""}
                  onChange={(e) =>
                    handleEditField("description", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={editedProduct.img || ""}
                  onChange={(e) => handleEditField("img", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Created At</Form.Label>
                <Form.Control
                  type="text"
                  value={formattedDate(editedProduct.createdAt) || ""}
                  // onChange={(e) => handleEditField("category", e.target.value)}
                  disabled
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Updated At</Form.Label>
                <Form.Control
                  type="text"
                  value={formattedDate(editedProduct.updatedAt) || ""}
                  // onChange={(e) => handleEditField("category", e.target.value)}
                  disabled
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category || ""}
                  // onChange={(e) => handleEditField("category", e.target.value)}
                  disabled
                ></Form.Control>
              </Form.Group>

              <h3>Additional Attribute</h3>
              {editedProduct?.attributes?.map((item, index) => {
                return (
                  <Form.Group>
                    <Form.Label>
                      {item.name} - {item.required ? "Require" : "Optional"}
                    </Form.Label>
                    <Form.Control
                      type={item.type}
                      value={item.value || ""}
                      onChange={(e) =>
                        handleEditAttribute(index, e.target.value)
                      }
                      required={item.required}
                    ></Form.Control>
                  </Form.Group>
                );
              })}
            </Form>

            <Button
              variant="primary"
              onClick={handleSaveChanges}
              disabled={!isDirty}
            >
              Save Changes
            </Button>
            <Button variant="danger" onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetailsSeller;
