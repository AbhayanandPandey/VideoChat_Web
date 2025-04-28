import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import {
  FaArrowLeft,
  FaArrowRight,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaDesktop,
  FaSignOutAlt
} from 'react-icons/fa';
import './Video.css';

const dummyVideos = [
  { id: 1, name: 'Person 1' },
  { id: 2, name: 'Person 2' },
  { id: 3, name: 'Person 3' },
  { id: 4, name: 'Person 4' },
  { id: 5, name: 'Person 5' },
];

const VideoRoom = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const isMobile = window.innerWidth < 768;
  const videosPerPage = isMobile ? 2 : 4;
  const maxPage = Math.ceil(dummyVideos.length / videosPerPage) - 1;

  const handlePrev = () => currentPage > 0 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < maxPage && setCurrentPage(currentPage + 1);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  const visibleVideos = dummyVideos.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  return (
    <Container fluid className="video-room">
      <Row className="h-100">
        {/* Video Section */}
        <Col md={9} xs={12} className="video-section">
          <div className="videos-wrapper">
            <div className="slider-buttons left">
              <FaArrowLeft
                onClick={handlePrev}
                className={`slider-icon ${currentPage === 0 ? 'disabled' : ''}`}
              />
            </div>

            <div className="videos-grid">
              {visibleVideos.map((video) => (
                <div key={video.id} className="video-box">
                  <div className="video-name">{video.name}</div>
                  <div className="video-feed">Video Stream Here</div>
                </div>
              ))}
            </div>

            <div className="slider-buttons right">
              <FaArrowRight
                onClick={handleNext}
                className={`slider-icon ${currentPage === maxPage ? 'disabled' : ''}`}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="controls">
            <Button variant="danger" className="mx-2"><FaVideoSlash /></Button>
            <Button variant="warning" className="mx-2"><FaMicrophoneSlash /></Button>
            <Button variant="info" className="mx-2"><FaDesktop /></Button>
            <Button variant="secondary" className="mx-2"><FaSignOutAlt /></Button>
          </div>
        </Col>

        {/* Chat Section */}
        <Col md={3} xs={12} className="chat-section">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className="chat-message">{msg}</div>
            ))}
          </div>
          <Form onSubmit={handleSendMessage} className="chat-input-area">
            <Form.Control
              type="text"
              value={newMessage}
              placeholder="Type a message..."
              onChange={(e) => setNewMessage(e.target.value)}
              className="chat-input"
            />
            <Button type="submit" variant="primary" className="send-btn">Send</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VideoRoom;
