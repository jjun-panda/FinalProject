import { Link } from 'react-router-dom';
import styled from "styled-components";
import '../../../assets/css/common.css'
import './css/service.css';
import './css/contents.css'
import Spinner from '../../../assets/images/Spinner.gif'
import Banner01 from '../../../assets/images/Banner_01.png'
import Banner02 from '../../../assets/images/Banner_02.png'
import Contents from './contents';

export default function Service() {

    return (
    <>
        <div id='body'>
            {/* 맨 상단 */}
            <div className="containerBody">
                <div className="containerContext">
                    <p className="bodyB56x">&#123;<span className="title56x"> 당신의 관심 </span>&#125;은 무엇인가요?</p>
                    <div className="contextWrapper">
                        <p className='body20x'>다양한 분야에서의 자랑스러운 재능을 타인과 공유함으로써 후원과 재능기부를 유도하는 기능을 강화하고, 이와 연계해서 굿즈 판매 및 실시간으로 목표 금액의 달성 상황을 시각화하여 사용자에게 제공하고 있습니다.</p>
                    </div>
                </div>
                <div className="containerCategory">
                    <div className="sebCategories">
                        <Link className="sebCategory" tabIndex={0} role="link" to="/">
                            <div className="imageBox">
                                <img src={Spinner} style={{width:'100%'}} />
                            </div>
                            <p className="bodyB16x">개발</p>
                        </Link>
                        <Link className="sebCategory" tabIndex={0} role="link" to="/">
                            <div className="imageBox">
                                <img src={Spinner} style={{width:'100%'}} />
                            </div>
                            <p className="bodyB16x">스포츠</p>
                        </Link>
                        <Link className="sebCategory" tabIndex={0} role="link" to="/">
                            <div className="imageBox">
                                <img src={Spinner} style={{width:'100%'}} />
                            </div>
                            <p className="bodyB16x">음악</p>
                        </Link>
                        <Link className="sebCategory" tabIndex={0} role="link" to="/">
                            <div className="imageBox">
                                <img src={Spinner} style={{width:'100%'}} />
                            </div>
                            <p className="bodyB16x">사진</p>
                        </Link>
                        <Link className="sebCategory" tabIndex={0} role="link" to="/">
                            <div className="imageBox">
                                <img src={Spinner} style={{width:'100%'}} />
                            </div>
                            <p className="bodyB16x">여행</p>
                        </Link>
                        <Link className="sebCategory" tabIndex={0} role="link" to="/">
                            <div className="imageBox">
                                <img src={Spinner} style={{width:'100%'}} />
                            </div>
                            <p className="bodyB16x">자기개발</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 배너_1 */}
            <div className='mainBanner mianColor'>
                <div className='mainReversed'>
                    <div className="mainDescription">
                        <p className='title48x title'>
                            당신의
                            <br />
                            숨겨진 재능
                        </p>
                        <p className='body20x text'>
                            당신의 재능부터 재주까지, 모두과 함께 공유해요. <br />
                            가깝고 따뜻한 당신의 재능을 만들어요.
                        </p>
                    </div>
                    <div className="mainImage">
                        <img src={Banner01} />
                    </div>
                </div>
            </div>

            {/* 배너_2 */}
            <div className='mainBanner whiteColor'>
                <div className='mainReversed'>
                    <div className="mainImage">
                        <img src={Banner02} />
                    </div>
                    <div className="mainDescription">
                        <p className='title48x title'>
                            재능
                            <br />
                            공유 플랫폼
                        </p>
                        <p className='body20x text'>
                            당신의 재능부터 재주까지, 모두과 함께 공유해요.
                        </p>
                    </div>
                </div>
            </div>

            <div className='' style={{backgroundColor:'var(--light-background-tertiary)'}}>
                {/* 최신 썸네일 */}
                <div id='contentsMainTum'>
                    <p className='title24x contentsTitle'>최신 콘텐츠</p>   
                    <p className='body16x contentsSebTitle'>새로 업데이트된 자랑글을 확인해보세요!</p>   
                    <Contents />
                </div>

                {/* 주요 썸네일 */}
                <div id='contentsMainTum'>
                    <p className='title24x contentsTitle'>인기 콘텐츠</p>   
                    <p className='body16x contentsSebTitle'>인기 콘텐츠 자랑글을 확인해보세요!</p>   
                    <Contents />
                </div>
            </div>
        </div>
    </>
    );
}

// Styled Components
const black = "#212529";