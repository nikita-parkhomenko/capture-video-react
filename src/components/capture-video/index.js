import { Jumbotron, Container, Row, Col, Button, Fade, Spinner } from 'reactstrap';
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';

import { TYPE_CAPTURE_VIDEO, selector } from './reducer';

const CaptureVideo = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const dispatch = useDispatch();
  const { disabled, isRecording } = useSelector(selector);
  const toggle = () => setFadeIn(!fadeIn);
  /**
    Коллбэк-реф передаем функцмю в качестве ref атрибута, эта функция получит
    DOM element в качестве аргумента, который я перенаправлю в сагу
   */
  const setVideoRef = useCallback(videoRef => {
    console.log(videoRef);

    videoRef && dispatch({
      type: TYPE_CAPTURE_VIDEO.SET_MEDIA_REF,
      payload: { videoRef }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: TYPE_CAPTURE_VIDEO.INITIALIZE });

    return () => dispatch({ type: TYPE_CAPTURE_VIDEO.CLEAR });
  }, [dispatch]);

  if (disabled) {
    return <div className="d-flex justify-content-center my-5">
      <Spinner style={{ width: '80px', height: '80px' }} type="grow" color="info" />
    </div>;
  }

  return (
    <Jumbotron fluid className="pt-5">
      <Container className="d-flex flex-column align-items-center" fluid>
        <h3> Capture video </h3>
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
          <Col className="d-flex flex-column align-items-center">
            <video
                ref={setVideoRef}
                muted
                className="d-block h-50 mb-4"
                width="100%"
                autoPlay
            />
            <div>
              {
                isRecording
                  ? <FontAwesomeIcon style={{ cursor: 'pointer' }} size="4x" icon={faPause} color="tomato" />
                  : <FontAwesomeIcon style={{ cursor: 'pointer' }} size="4x" icon={faPlay} color="tomato" />
              }
              {
                isRecording
                    ? <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        className="ml-5"
                        size="4x"
                        icon={faStop}
                        color="tomato"
                    />
                    : null
              }
            </div>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default CaptureVideo;