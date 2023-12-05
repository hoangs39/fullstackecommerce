import { useEffect, useState } from "react";
import { getOrderById } from "../../../api/customer";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { findById } from "../../../api/product";
import { updateOrder } from "../../../api/customer";

function OrderDetailsCustomer() {
  const [productsWithDetails, setProductsWithDetails] = useState([]);
  const { id } = useParams();

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
  const fetchOrder = async () => {
    const userOrder = await getOrderById(id);
    if (userOrder) {
      fetchProducts(userOrder.products);
    }
  };
  const handleStatusChange = async (productId, newStatus) => {
    const data = {
      productId,
      newStatus,
    };
    await updateOrder(data, id);
    fetchOrder();
  };
  return (
    <>
      <Container fluid className="mb-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Total Price</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
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
                <td>{product.status}</td>
                {!product.finalStage && product.status === "Shipped" && (
                  <td colSpan={2}>
                    <button
                      className="p-2 mx-2 rounded-3 border-0 bg-primary text-white"
                      onClick={() =>
                        handleStatusChange(product.productId, "Accepted")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="p-2 rounded-3 bg-danger border-0 bg-primary text-white"
                      onClick={() =>
                        handleStatusChange(product.productId, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default OrderDetailsCustomer;
