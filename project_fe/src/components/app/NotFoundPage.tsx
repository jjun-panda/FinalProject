import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";
import noImg from "../../assets/images/404.svg"


export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Section>
      <div><ErrorImage alt="찾을 수 없는 페이지입니다." src={noImg} /></div>
      <p className="title32x">앗! 찾을 수 없는 페이지입니다.</p>

      <Button
        size='Large'
        onClick={()=>{
          navigate(-1);
        }}
      >
        뒤로가기
      </Button>
    </Section>
  );
}

const Section = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5rem;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
`;
const ErrorImage = styled.img`
  width:40rem;
`;