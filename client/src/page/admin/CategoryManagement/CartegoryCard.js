import React, { useState } from "react";
import "./CateTree.module.css";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryCard = ({
  category,
  handleDeleteCategory,
  handleCreateCategory,
  handleAddAttribute,
}) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  // Attribute state and form inputs
  const [showAttributes, setShowAttributes] = useState(false);
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newAttributeType, setNewAttributeType] = useState("text");
  const [newAttributeRequired, setNewAttributeRequired] = useState(true);

  const handleCreateAndClose = () => {
    if (newCategoryName) {
      handleCreateCategory(category._id, newCategoryName);
      setNewCategoryName(""); // Clear the input field
    }
    setShowNewCategoryInput(false); // Close the input field
  };

  const handleCloseInput = () => {
    setShowNewCategoryInput(false);
    setNewCategoryName(""); // Clear the input field
  };

  const handleShowAttributes = () => {
    setShowAttributes(!showAttributes);
  };

  const handleAddNewAttribute = async () => {
    if (newAttributeName && newAttributeType) {
      const a = await handleAddAttribute(
        category._id,
        newAttributeName,
        newAttributeRequired,
        newAttributeType
      );
      console.log(a)
      setNewAttributeName(""); // Clear the input field
      setNewAttributeType("text"); // Reset attribute type
      setNewAttributeRequired(true); // Reset attribute required
    }
  };

  return (
    <ul className="category-card mt-3">
      <div className="d-flex">
        <FontAwesomeIcon icon={faTurnUp} rotation={90} className="mx-1" />
        <li className="category-info d-flex">
          <span>Category'sName:</span>
          <span className="text-success"> {category.name}</span>
          <span style={{ marginLeft: "2em" }}>Actions:</span>
          <button
            className="btn btn-danger mx-1"
            onClick={() => handleDeleteCategory(category._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={() => {
              setShowNewCategoryInput(!showNewCategoryInput);
            }}
          >
            Add Subcategory
          </button>
          <button
            className="btn btn-info toggle-attributes mx-1"
            onClick={handleShowAttributes}
          >
            {showAttributes ? "Hide Attributes" : "Show Attributes"}
          </button>
        </li>
      </div>

      {showNewCategoryInput && (
        <div className="mt-3">
          <div className="subcategory-form d-flex mt-1">
            {/* <label className="form-check-label">Subcategory's Name:</label> */}
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter new subcategory name"
              className="form-control w-25"
            />
            <div className="button-group d-flex w-50">
              <button
                className="btn btn-success"
                onClick={handleCreateAndClose}
              >
                Create
              </button>
              <button className="btn btn-secondary " onClick={handleCloseInput}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAttributes && (
        <div className="attributes mt-3">
          <ul className="list-group">
            <span className="text-primary">Attributes List:</span>
            {category.attributes.length > 0 ? category.attributes.map((attribute) => (
              <li key={attribute?.name} className="">
                <span className="text-success">Name:</span> {attribute?.name} |{" "}
                <span className="text-success"> Type:</span> {attribute?.type} |{" "}
                <span className="text-success">Required:</span>{" "}
                {attribute?.required ? "Required" : "Optional"}
              </li>
            )) : "No Attribute Created."}
          </ul>

          <div className="mt-3 text-primary">
            Attributes Form:
            <br />
          </div>

          <div className="attribute-form d-flex mt-2">
            <label className="form-check-label">Name:</label>
            <input
              type="text"
              value={newAttributeName}
              onChange={(e) => setNewAttributeName(e.target.value)}
              placeholder="Attribute Name"
              className="form-control w-25"
            />
            <label className="form-check-label">Type:</label>
            <select
              value={newAttributeType}
              onChange={(e) => setNewAttributeType(e.target.value)}
              className="form-select w-25"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
            </select>
            <input
              type="checkbox"
              checked={newAttributeRequired}
              onChange={(e) => setNewAttributeRequired(e.target.checked)}
              className="form-check-input"
            />
            <label className="form-check-label">Required</label>
            <button
              className="btn btn-success w-25"
              onClick={handleAddNewAttribute}
            >
              Add Attribute
            </button>
          </div>
        </div>
      )}

      {/* <div className="subcategories"> */}
      {category.subcategories.map((subcategory) => (
        <CategoryCard
          key={subcategory._id}
          category={subcategory}
          handleDeleteCategory={handleDeleteCategory}
          handleCreateCategory={handleCreateCategory}
          handleAddAttribute={handleAddAttribute}
        />
      ))}
      {/* </div> */}
    </ul>
  );
};

export default CategoryCard;
