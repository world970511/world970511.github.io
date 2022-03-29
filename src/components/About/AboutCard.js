import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
           안녕하세요! 저는 <span className="purple">대한민국, 서울</span>
           에 거주중인 <span className="purple">박나은</span>이라고 합니다.
            <br />현재는 성공회대 글로컬IT학과를 다니면서 
             Backend와 Data Engineering 쪽으로 공부중입니다.
            <br />
            <br />
            코딩하는 것 외에도 다른 취미가 많은 편입니다😂
            </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> 연극,뮤지컬 감상
            </li>
            <li className="about-activity">
              <ImPointRight /> 독서(웹소설,일반 소설 상관 없음)
            </li>
            <li className="about-activity">
              <ImPointRight /> 여행
            </li>
            <li className="about-activity">
              <ImPointRight /> etc...
            </li>
          </ul>
          
          <p style={{ color: "#ffa600" }}>
            "안 하고 후회하는 것보다는 도전해보고 후회하는 것이 더 낫다. "{" "}
          </p>
          <footer className="blockquote-footer">Park Naeun</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
