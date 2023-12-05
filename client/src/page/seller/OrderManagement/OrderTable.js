import React from "react";
import { Table, Container } from "react-bootstrap";
import { formattedDate } from "../../../service/authService";
import { useNavigate } from "react-router";

const OrderTable = ({ orders }) => {
  const navigate = useNavigate();



  console.log(orders);
  return (
    <Container fluid className="mb-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th scope="col">ID</th>
            <th scope="col">createdAt</th>
            <th scope="col">updatedAt</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr
              key={order._id}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{index}</td>
              <td>{order._id}</td>
              <td>{formattedDate(order.createdAt)}</td>
              <td>{formattedDate(order.updatedAt)}</td>
              <td colSpan={2}>
                <button
                  className=" p-2 mx-2 rounded-3 border-0 bg-primary text-white"
                  onClick={() => {
                    navigate("/seller/order/" + order._id);
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderTable;
