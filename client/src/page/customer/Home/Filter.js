import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Navbar, Nav, Button } from "react-bootstrap";
import { organizeCategoriesIntoTree } from "../../../api/category";
import HierarchicalSelect from "./HierarcicalSelect";
const Filter = ({
  removeFilter,
  decision,
  order,
  categories,
  handleCategory,
  handleFilter,
  selectedCategories,
  setSelectedCategories,
}) => {
  return (
    <>
      <HierarchicalSelect
        categoriesData={organizeCategoriesIntoTree(categories)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      ></HierarchicalSelect>
      <Dropdown className={`mx-1`}>
        <Dropdown.Toggle
          variant={decision === "price" ? "primary" : "light"}
          id="dropdown-basic"
        >
          Filter By Price
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              handleFilter(-1, "price");
            }}
            active={decision === "price" && order === -1}
          >
            Descending Order
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              handleFilter(1, "price");
            }}
            active={decision === "price" && order === 1}
          >
            Acsending Order
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="mx-1">
        <Dropdown.Toggle
          variant={decision === "name" ? "primary" : "light"}
          id="dropdown-basic"
        >
          Filter By Name
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              handleFilter(-1, "name");
            }}
            active={decision === "name" && order === -1}
          >
            Descending Order
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              handleFilter(1, "name");
            }}
            active={decision === "name" && order === 1}
          >
            Acsending Order
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="mx-1">
        <Dropdown.Toggle
          variant={decision === "date" ? "primary" : "light"}
          id="dropdown-basic"
        >
          Filter By Date Added
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              handleFilter(-1, "date");
            }}
            active={decision === "date" && order === -1}
          >
            Descending Order
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              handleFilter(1, "date");
            }}
            active={decision === "date" && order === 1}
          >
            Acsending Order
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="light" onClick={removeFilter}>Remove Filter</Button>
    </>
  );
};

export default Filter;
