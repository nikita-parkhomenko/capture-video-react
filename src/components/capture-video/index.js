import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Jumbotron, Container, Row, Col, Button, Fade } from 'reactstrap';

import { TYPE_CAPTURE_VIDEO } from './reducer';

const CaptureVideo = props => {
  const dispatch = useDispatch();
  const [fadeIn, setFadeIn] = useState(false);
  const toggle = () => setFadeIn(!fadeIn);

  useEffect(() => {
    console.log('useEffect dispatch initialize action');
    dispatch({ type: TYPE_CAPTURE_VIDEO.INITIALIZE });

    return () => dispatch({ type: TYPE_CAPTURE_VIDEO.CLEAR });
  }, []);

  return (
    <Jumbotron fluid>
      <Container className="d-flex flex-column align-items-center" fluid>
        <h5 className="display-3"> Capture video </h5>
        <p className="lead"> Capture video and audio using MediaRecorder </p>
        <Row>
          <Col className="text-center" >
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