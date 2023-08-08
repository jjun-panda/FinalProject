import { Link } from 'react-router-dom';
import '../css/service.css'
import '../css/contents.css'
// import Spinner from '../../assets/images/Spinner.gif'
import Banner01 from '../../assets/images/Banner_01.png'
import Banner02 from '../../assets/images/Banner_02.png'
import React from 'react';
import ContentsByDate from './ContentsByDate';
import ContentsByViews from './ContentsByViews';
import cauegory1 from '../../assets/images/category/category_1.svg'
import cauegory2 from '../../assets/images/category/category_2.svg'
import cauegory3 from '../../assets/images/category/category_3.svg'
import cauegory4 from '../../assets/images/category/category_4.svg'
import cauegory5 from '../../assets/images/category/category_5.svg'
import cauegory6 from '../../assets/images/category/category_6.svg'

export default function Service() {

    return (
        <>
            <div id='body'>
                {/* 맨 상단 */}
                <div className="containerBody">
                    <div className="containerContext">
                        <p className="bodyB56x"><span className="title56x titleBG">&nbsp;당신의 관심&nbsp;</span>은 무엇인가요?</p>
                        <div className="contextWrapper">
                            <p className='body20x'>다양한 분야에서의 자랑스러운 재능을 타인과 공유함으로써 후원과 재능기부를 유도하는 기능을 강화하고, 이와 연계해서 굿즈 판매 및 실시간으로 목표 금액의 달성 상황을 시각화하여 사용자에게 제공하고 있습니다.</p>
                        </div>
                    </div>
                    <div className="containerCategory">
                        <div className="sebCategories">
                            <Link className="sebCategory" tabIndex={0} role="link" to="/">
                                <div className="imageBox">
                                    <img src={cauegory1} style={{ width: '100%' }} />
                                </div>
                                <p className="bodyB16x">슬기로운 라이프</p>
                            </Link>
                            <Link className="sebCategory" tabIndex={0} role="link" to="/">
                                <div className="imageBox">
                                    <img src={cauegory2} style={{ width: '100%' }} />
                                </div>
                                <p className="bodyB16x">아름다운 음악</p>
                            </Link>
                            <Link className="sebCategory" tabIndex={0} role="link" to="/">
                                <div className="imageBox">
                                    <img src={cauegory3} style={{ width: '100%' }} />
                                </div>
                                <p className="bodyB16x">맛의 승부! 요리</p>
                            </Link>
                            <Link className="sebCategory" tabIndex={0} role="link" to="/">
                                <div className="imageBox">
                                    <img src={cauegory4} style={{ width: '100%' }} />
                                </div>
                                <p className="bodyB16x">디자인 & 개발</p>
                            </Link>
                            <Link className="sebCategory" tabIndex={0} role="link" to="/">
                                <div className="imageBox">
                                    <img src={cauegory5} style={{ width: '100%' }} />
                                </div>
                                <p className="bodyB16x">미술의 감성</p>
                            </Link>
                            <Link className="sebCategory" tabIndex={0} role="link" to="/">
                                <div className="imageBox">
                                    <img src={cauegory6} style={{ width: '100%' }} />
                                </div>
                                <p className="bodyB16x">멋의 패션</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 배너_1 */}
            <div className='mainBanner mainColor'>
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

            <div className='' style={{backgroundColor:'var(--background-tertiary)'}}>
                {/* 최신 썸네일 */}
                <div id='contentsMainTum'>
                    <p className='title24x contentsTitle'>최신 콘텐츠</p>
                    <div className='contentsText'>
                        <p className='body16x contentsSebTitle'>새로 업데이트된 자랑글을 확인해보세요!</p> 
                        <Link to={`/board/list`} className='updateToggle body14x'>더 볼래요!</Link>
                    </div>
                    <div id='contentsCards'>
                        <div className="contentsGroup">
                            <div className="contentsSebgroup">  
                                <ContentsByDate />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 주요 썸네일 */}
                <div id='contentsMainTum'>
                    <p className='title24x contentsTitle'>인기 콘텐츠</p>   
                    <div className='contentsText'>
                        <p className='body16x contentsSebTitle'>인기 콘텐츠 자랑글을 확인해보세요!</p>   
                        <Link to={`/board/list`} className='updateToggle body14x'>더 볼래요!</Link>
                    </div>
                    <div id='contentsCards'>
                        <div className="contentsGroup">
                            <div className="contentsSebgroup">
                                <ContentsByViews />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Styled Components
const black = "#212529";