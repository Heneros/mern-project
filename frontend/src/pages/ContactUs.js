import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";

import Breadcrumbs from "../components/Breadcrumbs";
import { useFeedbackMutation } from "../redux/slices/userApiSlice";
export default function ContactUs() {
  const [feedback] = useFeedbackMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { name, subject, email, message };
      // console.log("Sending data:", data);
      await feedback(data);
      // await feedback({ name, subject, email, message });
      // await feedback({
      //   name,
      //   subject,
      //   email,
      //   message,
      // });
      // if (response.error) {
      //   console.log(response.error.message || "An error occurred");
      // } else {
      //   console.log("Feedback submitted successfully");
      // }
    } catch (err) {
      console.log(
        "Error submitting feedback:",
        err?.data?.message || err.error
      );
    }
  };
  return (
    <>
      <Breadcrumbs />
      <div className="container py-3">
        <div className="bg-light py-2 px-4 mb-3">
          <h3 className="m-0">Contact Us For Any Queries</h3>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="bg-light mb-3" style={{ padding: "30px" }}>
              <h6 className="font-weight-bold">Get in touch</h6>
              <p>
                Labore ipsum ipsum rebum erat amet nonumy, nonumy erat justo sit
                dolor ipsum sed, kasd lorem sit et duo dolore justo lorem stet
                labore, diam dolor et diam dolor eos magna, at vero lorem elitr
              </p>
              <div className="d-flex align-items-center mb-3">
                <i className="fa fa-2x fa-map-marker-alt text-primary mr-3"></i>
                <div className="d-flex flex-column">
                  <h6 className="font-weight-bold">Our Office</h6>
                  <p className="m-0">123 Street, New York, USA</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="fa fa-2x fa-envelope-open text-primary mr-3"></i>
                <div className="d-flex flex-column">
                  <h6 className="font-weight-bold">Email Us</h6>
                  <p className="m-0">
                    <Link to={`mailto:info@example.com`}>info@example.com</Link>
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-2x fa-phone-alt text-primary mr-3"></i>
                <div className="d-flex flex-column">
                  <h6 className="font-weight-bold">Call Us</h6>
                  <p className="m-0">
                    <Link to={`tel:0123456789`}>+012 345 6789</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div
              className="contact-form bg-light mb-3"
              style={{ padding: "30px" }}
            >
              <div id="success"></div>
              <Form onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        className="p-4"
                        id="name"
                        placeholder="Your Name"
                        required="required"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        data-validation-required-message="Please enter your name"
                      />
                      <p className="help-block text-danger"></p>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="email"
                        className=" p-4"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        required="required"
                        data-validation-required-message="Please enter your email"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Control
                    type="text"
                    className="p-4"
                    id="subject"
                    placeholder="Subject"
                    required="required"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    data-validation-required-message="Please enter a subject"
                  />
                  <p className="help-block text-danger"></p>
                </Form.Group>
                <Form.Group>
                  <textarea
                    rows="4"
                    className="form-control"
                    id="message"
                    placeholder="Message"
                    required="required"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    data-validation-required-message="Please enter your message"
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </Form.Group>
                <div>
                  <button
                    className="btn btn-primary font-weight-semi-bold px-4"
                    style={{ height: "50px" }}
                    type="submit"
                    id="sendMessageButton"
                  >
                    Send Message
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
