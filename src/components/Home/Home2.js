import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/myImg.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
             백엔드/데이터 분석/머신러닝 등등 다양한 분야에 관심을 갖고 도전하는 걸 좋아하는 사람입니다.
              <br />
              <br />주로 
                <b className="purple"> Python, Java </b>를 ,그리고 가끔은&nbsp;
                <b className="purple">Javascript </b> 도 사용합니다. 
              <br />
              <br />
                <b className="purple">Backend Engineering, Data Engineering </b> 에 관심을 가지고 공부하는 중이고, 몇몇 프로젝트를 진행해보면서
                {" "}
                <b className="purple">
                  Deep Learning</b>에도 흥미가 생겨 현재는 <b className="purple">Natural Launguage Processing
                </b> 쪽으로 지식을 쌓아나가고 있습니다.
              <br />
              <br />
              가능할 때마다 <b className="purple">Django</b>와
              <b className="purple">&nbsp; React.js</b> 같은 <b className="purple">Javascript</b> 라이브러리를 활용해서 이것저것 개발해보고 있습니다.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img 
                src={myImg} 
                className="img-fluid" 
                alt="avatar"
                style={{ maxHeight: "290px"  }} 
                />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/world970511"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/Soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/soumyajit4419/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/s.o.u.m.y.a_j.i.t/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
