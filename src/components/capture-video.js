import React, { useState } from 'react';
import { Jumbotron, Container, Row, Col, Button, Fade } from 'reactstrap';

const CaptureVideo = props => {
  const [fadeIn, setFadeIn] = useState(false);
  const toggle = () => setFadeIn(!fadeIn);

  return (
    <Jumbotron fluid>
      <Container fluid>
        <h5 className="display-3"> Capture video </h5>
        <p className="lead"> Capture video and audio using MediaRecorder </p>
        <Row>
          <Col>
          <Button color="primary" onClick={toggle}>Used Technologies Stack</Button>
            <Fade in={fadeIn} tag="h5" className="mt-3">
                React, Redux, Redux-Saga, Reactstrap
            </Fade>
          </Col>
        </Row>
        <Row>
          <Col>
            <video muted className="d-block" width="100%" autoPlay />
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default CaptureVideo;