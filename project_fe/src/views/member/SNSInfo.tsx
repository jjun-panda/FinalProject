export default function SNSInfo() {
    return (
        <>
            {/* 약관 */}
            <div className="wrapTerm">
                <div className="termTxt body12x">
                    SNS 로그인 시 &nbsp;
                    <span>
                        <a className='bodyB12x' href="/view/serviceTerms-join" target="_blank">회원가입 이용약관,</a>&nbsp;
                        <a className='bodyB12x' target="_blank" href="/view/serviceTerms">서비스 이용약관,</a>&nbsp;
                        <br />
                        <a className='bodyB12x' href="/view/privacy" target="_blank">개인정보처리방침,</a>&nbsp;
                        <a className='bodyB12x' href="/view/marketingTerms" target="_blank">마케팅 이용약관</a>
                    </span>
                    에 동의하는 것으로 간주합니다.
                </div>
            </div>
        </>
    )
}
