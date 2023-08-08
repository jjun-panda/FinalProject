import { Link } from "react-router-dom";

export default function SNSInfo() {
    return (
        <>
            {/* 약관 */}
            <div className="wrapTerm">
                <div className="termTxt body12x">
                    SNS 로그인 시 &nbsp;
                    <span>
                        <Link className='bodyB12x' to="#">회원가입 이용약관,</Link>&nbsp;
                        <Link className='bodyB12x' to="#">서비스 이용약관,</Link>&nbsp;
                        <br />
                        <Link className='bodyB12x' to="#">개인정보처리방침,</Link>&nbsp;
                        <Link className='bodyB12x' to="#">마케팅 이용약관</Link>
                    </span>
                    에 동의하는 것으로 간주합니다.
                </div>
            </div>
        </>
    )
}
