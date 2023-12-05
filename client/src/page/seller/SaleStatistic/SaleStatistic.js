import { useState, useEffect } from "react";
import { getProdutStatistic } from "../../../api/seller";
import { Container, Table } from "react-bootstrap";

function SaleStatistic() {
  const [products, setProducts] = useState({});
  const getStat = async () => {
    const stat = await getProdutStatistic();
    if (stat) {
      console.log(stat);
      setProducts(stat);
      return;
    }
  };

  useEffect(() => {
    getStat();
  }, []);

  return (
    <>
      {" "}
      <Container fluid className="mb-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">New</th>
              <th scope="col">Approved</th>
              <th scope="col">Rejected</th>
              <th scope="col">Shipped</th>
              <th scope="col">Canceled</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(products).map((key, index) => (
              <tr
                key={products[key]._id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{index}</td>
                <td>{products[key].product}</td>
                <td>{products[key].price}</td>
                <td>{products[key].statuses["New"] || 0}</td>
                <td>{products[key].statuses["Accepted"]}</td>
                <td>{products[key].statuses["Rejected"]}</td>
                <td>{products[key].statuses["Shipped"]}</td>
                <td>{products[key].statuses["Canceled"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default SaleStatistic;
