import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { getCategories, allAttributes } from "../../../api/category";
import { createProduct, getProduct } from "../../../api/seller";

export default function AddProduct({ setProducts }) {
  const [formValues, setFormValues] = useState({
    productName: "",
    productPrice: 0,
    productDescription: "",
    productImg: "",
    selectedCategory: null,
    attributeValues: {},
  });

  const [categories, setCategories] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);

  const fetchProduct = async () => {
    const data = await getProduct();
    setProducts(data);
  };

  const loadCategories = async () => {
    const allCategories = await getCategories();
    setCategories(allCategories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const fetchAttribute = async (categoryId) => {
    const attributes = await allAttributes(categoryId);
    setProductAttributes(attributes);
  };

  useEffect(() => {
    if (formValues.selectedCategory) {
      fetchAttribute(formValues.selectedCategory);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        attributeValues: {},
      }));
    }
  }, [formValues.selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      selectedCategory: categoryId,
    }));
  };

  const handleFieldChange = (fieldName, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: value,
    }));
  };

  const handleAttributeChange = (attributeName, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      attributeValues: {
        ...prevFormValues.attributeValues,
        [attributeName]: {
          name: attributeName,
          required:
            productAttributes.find((attr) => attr.name === attributeName)
              ?.required || false,
          type:
            productAttributes.find((attr) => attr.name === attributeName)?.type ||
            "text",
          value: value,
        },
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const attributesArray = Object.values(formValues.attributeValues);

    const productData = {
      name: formValues.productName,
      description: formValues.productDescription,
      img: formValues.productImg,
      category: formValues.selectedCategory,
      attributes: attributesArray,
      price: formValues.productPrice,
    };

    const res = await createProduct(productData);
    console.log(res);

    if (res) {
      loadCategories();
      fetchProduct();
      setFormValues({
        productName: "",
        productPrice: 0,
        productDescription: "",
        productImg: "",
        selectedCategory: null,
        attributeValues: {},
      });
    }else{
        
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={formValues.productName}
          onChange={(e) => handleFieldChange("productName", e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={formValues.productDescription}
          onChange={(e) =>
            handleFieldChange("productDescription", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Product Price</Form.Label>
        <Form.Control
          type="number"
          value={formValues.productPrice}
          onChange={(e) => handleFieldChange("productPrice", e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          value={formValues.productImg}
          onChange={(e) => handleFieldChange("productImg", e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={formValues.selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value={null}>Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {productAttributes?.length > 0 && <h3>Additional Attributes</h3>}
      {productAttributes?.map((attribute) => (
        <Form.Group key={attribute.name}>
          <Form.Label>{attribute.name}</Form.Label>
          <Form.Control
            type={attribute.type === "number" ? "number" : "text"}
            required={attribute.required}
            value={formValues.attributeValues[attribute.name]?.value || ""}
            onChange={(e) =>
              handleAttributeChange(attribute.name, e.target.value)
            }
          />
        </Form.Group>
      ))}
      <Button type="submit">Create Product</Button>
    </Form>
  );
}
