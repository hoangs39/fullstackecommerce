import React, { useState } from "react";
import { Modal, Button, ListGroup, Row, Col, Form } from "react-bootstrap";

const Cart = ({ cartItems, showCart, setShowCart, updateCartItem,removeFromCart, placeOrderF,added }) => {

  const [err,setErr] = useState("");

  const getTotalPrice = () => {
    return cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Modal
      show={showCart}
      onHide={() => setShowCart(false)}
      dialogClassName="cart-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
        <Modal.Title className="text-center text-danger">{err !== "" && err}</Modal.Title>

      </Modal.Header>
      <Modal.Body> 
        <ListGroup>
          {cartItems?.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col xs={6}>
                  <p>{item.name}</p>
                  <p>Price: ${item.price}</p>
                </Col>
                <Col xs={4}>
                  <Form.Control
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartItem(item._id, parseInt(e.target.value))
                    }
                  />
                </Col>
                <Col xs={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <p>Total Price: ${getTotalPrice()}</p>
        <Button variant="primary" onClick={()=> {
          if(added){
            placeOrderF(cartItems);
          }
          setErr("");
        }}>Checkout</Button>
        <Button variant="secondary" onClick={() => setShowCart(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
