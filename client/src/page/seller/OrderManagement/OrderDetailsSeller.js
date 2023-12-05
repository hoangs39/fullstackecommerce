import { useEffect, useState } from "react";
import { getOrderById, updateOrder } from "../../../api/seller";
import { Container, Table, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { findById } from "../../../api/product";

function OrderDetailsSeller() {
  const [productsWithDetails, setProductsWithDetails] = useState([]);
  const { id } = useParams();

  const [customerData, setCustomerData] = useState({});
  const fetchOrder = async () => {
    const userOrder = await getOrderById(id);
    if (userOrder) {
      setCustomerData(userOrder.customer);
      fetchProducts(userOrder.products);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchProducts = async (products) => {
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const fullProduct = await fetchProduct(product.productId);
        return {
          ...product,
          productName: fullProduct.name,
          unitPrice: fullProduct.price,
          totalPrice: fullProduct.price * product.quantity,
        };
      })
    );
    setProductsWithDetails(productsWithDetails);
  };

  const fetchProduct = async (id) => {
    const data = await findById(id);
    return data;
  };
  const handleStatusChange = async (productId, newStatus) => {
    
    const data = {
      productId,
      newStatus
    }
    await updateOrder(data,id)
    fetchOrder();
  };

  console.log(customerData)
  return (
    <>
      <Container fluid className="mb-5">
        <span>User informantion</span>
        <br />
        <span>Id: {customerData._id}</span>
        <br />
        <span>Email: {customerData.email} </span>
        <br />
        <span>Phone: {customerData.phone}</span>
        <br />
        <span>Address: {customerData.address}</span>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Total Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {productsWithDetails.map((product, index) => (
              <tr
                key={product.productId}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{index}</td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.unitPrice}</td>
                <td>{product.totalPrice}</td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    value={product.status}
                    disabled={product.finalStage}
                    onChange={(e) =>
                      handleStatusChange(product.productId, e.target.value)
                    }
                  >
                    <option value={product.status}>{product.status}</option>
                    {product.status !== "Shipped" &&  <option value="Shipped">Shipped</option>}
                    {product.status !== "Cancled" && <option value="Canceled">Canceled</option>}
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default OrderDetailsSeller;
