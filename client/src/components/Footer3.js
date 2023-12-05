// import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
export const Footer3 = () => {
    return (
        <div className="text-md-start mt-2">
            <Row className="mt-3">
                {/* <Col sm={6} md={3} className="mx-auto mb-4">
            <h5 className="text-uppercase fw-bold mb-4">
              Mentscape
            </h5>
            <p>
              Mentscape is an application focusing solely on mental healthcare services. Menscape allows people facing mental issues to connect with a variety of professional therapists easily.
            </p>
          </Col> */}
                <Col sm={6} md={4} className="mx-auto mb-4" >
                    <h5 className="text-uppercase fw-bold mb-4">
                        LAZADA SOUTH EAST ASIAN
                    </h5>
                    <Row>
                        <Col sm={6} md={3} className="mx-auto mb-4">
                            <Image src="holder.js/171x180" rounded />
                        </Col>
                        <Col sm={6} md={3} className="mx-auto mb-4">
                            <Image src="holder.js/171x180" rounded />
                        </Col>
                        <Col sm={6} md={3} className="mx-auto mb-4">
                            <Image src="holder.js/171x180" rounded />
                        </Col>
                        <Col sm={6} md={3} className="mx-auto mb-4">
                            <Image src="holder.js/171x180" rounded />
                        </Col>
                    </Row>
                </Col>

                <Col sm={6} md={4} className="mx-auto mb-4">
                    <h5 className="text-uppercase fw-bold mb-4">Follow US</h5>
                    <Row>
                        <Col sm={6} md={3} className="mx-auto mb-4">
                            <Image src="holder.js/171x180" rounded />
                        </Col>
                        <Col sm={6} md={3} className="mx-auto mb-4">
                            <Image src="holder.js/171x180" rounded />
                        </Col>
                        <Col sm={6} md={3} className="mx-auto mb-4">
                            <Image src="holder.js/171x180" rounded />
                        </Col>
                        <Col sm={6} md={3} className="mx-auto mb-4">
                            <Image src="holder.js/171x180" rounded />
                        </Col>
                    </Row>
                </Col>

                <Col sm={12} md={4} className="mx-auto mb-4">
                    <h5 className="text-uppercase fw-bold mb-4"> © Lazada<span className="fw-bold">2023</span></h5>
                </Col>


            </Row>
        </div>

    )
}
