import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import ridi from "../../Assets/Projects/ridibooks.png";
import emotion from "../../Assets/Projects/emotion.jpeg";
import joara from "../../Assets/Projects/joara.png";
import SSumUp from "../../Assets/Projects/SSumUp.png";
import mib from "../../Assets/Projects/mib.png";
import whichOTT from "../../Assets/Projects/whichOTT.jpg";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: '#000000' }}>
          Here are a few projects I've worked on alone or as a team recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={3} className="project-card">
            <ProjectCard
              imgPath={SSumUp}
              isBlog={false}
              title="SSum UP"
              description="유튜브를 더 효율적으로 이용할 수 있도록 영어로 된 영상의 자막에서 핵심만 간추린 요약문을 제공하는 서비스입니다. 요약문과 영상의 전체 영어 자막, 요약문 번역 또한 동시에 제공합니다. 부가적으로 최근 검색해본 영상 목록을 다시 살펴볼 수 있고, 추후 다시 보고싶은 영상과 자막을  재생목록을 만들어 저장할 수 있습니다.  "
              link="https://github.com/Ssum-Up-project/Ssum-Up"
            />
          </Col>

          <Col md={3} className="project-card">
            <ProjectCard
              imgPath={whichOTT}
              isBlog={false}
              title="which OTT"
              description="콘텐츠 기반 추천 알고리즘을 사용해 자신에게 알맞은 OTT 서비스를 추천하는 서비스입니다.추가적으로, 각 OTT서비스 분석을 통해 각 OTT 별 콘텐츠 통계 자료를 제공합니다."
              link="https://github.com/world970511/which-OTT"
            />
          </Col>

          <Col md={3} className="project-card">
            <ProjectCard
              imgPath={joara}
              isBlog={false}
              title="Joara 로판 소설 제목 및 소개글에 사용된 명사 빈도분석"
              description="joara에 게시된 로맨스 판타지 소설들 중 1~6월에 100위 안에 든 것들만 제목과 소개글을 크롤링해 사용된 명사를 분석했습니다. 소설 제목/ 소개글에 자주 사용되는 명사의 사용 빈도를 통해 웹소설 트랜드를 분석하는 것을 목적으로 진행했습니다. "
              link="https://github.com/world970511/joara_-Analysis"
            />
          </Col>

          <Col md={3} className="project-card">
            <ProjectCard
              imgPath={ridi}
              isBlog={false}
              title="리디북스 로맨스 웹소설 리뷰 감성분류"
              description="리디북스에 판매중인 로맨스 웹소설 5000권의 579,867개 리뷰를 크롤링하여 110,868개로 정제한 후 이를 keras,konlpy를 사용하여 긍부정을 분류하였습니다. 이를 통해 각 소설리뷰를 통해 소설에서 긍정적으로 판단되는 부분과 부정적으로 판단되는 부분을 분류하는 것을 목적으로 하였습니다. "
              link="https://github.com/world970511/RIDIBOOKS_romance_webnovel_review_Sentiment_AnalysisI"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
