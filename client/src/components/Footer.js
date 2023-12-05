// import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { Footer2 } from './Footer2';
import { Footer3 } from './Footer3';
export const Footer = () => {
  return (
    <Container fluid className=" bg-sky pt-3" >
      <div className="text-md-start mt-2">
        <Row className="mt-3" style={{ backgroundColor: "#d1d0cf"}}>
          <Col sm={6} md={3} className="mx-auto mb-4" >
            <h5 className="text-uppercase fw-bold mb-4">
              Contact Us
            </h5>
            <p><Link to="/" className="text-reset">Hotline & Online chat {"(24/7)"}</Link></p>
            <p><Link to="/" className="text-reset">Help Center</Link></p>
            <p><Link to="/" className="text-reset">How To Buy</Link></p>
            <p><Link to="/" href="../../pages/Privacy/thirdparty.php" className="text-reset">Shipping and Delivery</Link></p>
            <p><Link to="/" href="../../pages/Privacy/thirdparty.php" className="text-reset">International Product Policy</Link></p>
            <p><Link to="/" href="../../pages/Privacy/thirdparty.php" className="text-reset">How To Return</Link></p>
          </Col>

          <Col sm={6} md={3} className="mx-auto mb-4">
            <h5 className="text-uppercase fw-bold mb-4">LAZADA VIETNAM</h5>
            <p><Link to="/" className="text-reset">All Categories</Link></p>
            <p><Link to="/" className="text-reset">About Lazada</Link></p>
            <p><Link to="/" className="text-reset">Sell on Lazada</Link></p>
            <p><Link to="/" className="text-reset">Afﬁliate Program</Link></p>
            <p><Link to="/" className="text-reset">Careers</Link></p>
            <p><Link to="/" className="text-reset">{"Terms & Conditions"}</Link></p>
            <p><Link to="/" className="text-reset">Privacy Policy</Link></p>
            <p><Link to="/" className="text-reset">{"Press & Media"}</Link></p>
            <p><Link to="/" className="text-reset">Intellectual Property Protection</Link></p>
            <p><Link to="/" className="text-reset">Operating Regulation</Link></p>
            <p><Link to="/" className="text-reset">{"Procedure of claim and dispute handling"}</Link></p>
          </Col>
          <Col sm={6} md={3} className="mx-auto mb-4">
            <Image src="holder.js/171x180" rounded />
          </Col>

          <Col sm={6} md={3} className="mx-auto mb-4">
            <Row>
              <Col sm={6} md={3} className="mx-auto mb-4">
                <Image src="holder.js/171x180" rounded />
              </Col>
              <Col sm={6} md={3} className="mx-auto mb-4">
                <Image src="holder.js/171x180" rounded />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Footer2 />
      <Footer3 />
    </Container>
  )
}
