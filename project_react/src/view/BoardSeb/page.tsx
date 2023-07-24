import React from 'react'
import './css/page.css'
import Button from '../../components/Button'
import userIcon from'../../assets/images/icon/ico_user.svg'
import businessIcon from'../../assets/images/icon/ico_building.svg'
import { Link } from 'react-router-dom'
import Donation from './donation'
import ContentsTrend from './contentsTrend'

export default function Page() {
    return (
        <div id='body'>
            <article id="content" data-id={614270777}>
                {/* <h1 className="hide">${id.가져오기}</h1> */}
                <section id="articleImg">
                    <img src="https://news.kbs.co.kr/data/news/2017/12/11/3581473_ADK.jpg" alt="" />
                </section>
                <section id="articleProfile">
                    <div className="spaceBetween">
                        <div id='articleProfileLeft'>
                            <div id="articleProfileImg">
                                <img alt="업로드자" src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMDdfMTYw/MDAxNTgxMDg1NzUxMTUy.eV1iEw2gk2wt_YqPWe5F7SroOCkXJy2KFwmTDNzM0GQg.Z3Kd5MrDh07j86Vlb2OhAtcw0oVmGCMXtTDjoHyem9og.JPEG.7wayjeju/%EB%B0%B0%EC%9A%B0%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_IMG7117.jpg?type=w800"/>
                            </div>
                            <div id="articleProfiName">
                                <div className='bodyB16x nickName'>&#123; 이름: 코딩이 &#125;</div>
                                <div className='caption mail'>&#123; 이메일주소: jn2023@innoco.com &#125;</div>
                            </div>
                        </div>
                        <div id="articleProfileRight">
                            <Donation />
                        </div>
                        </div>
                </section>
                <section id="articleDescription">
                    <p id="articleTitle" className='title32x'>
                        &#123; 제목 입력: 내 꿈은 한국서 차별 없어지는 것 &#125;
                    </p>
                    <p id="articleCategory" className='body14x'>
                        &#123; 카테고리 &#125; ∙ <time>&#123; 업로드일: 5일 전 &#125;</time> ∙ &#123; 조회수: <span>00</span> &#125;
                    </p>

                    <div className='body16x' id="articleDetail">
                        <p>
                            모델이자 고등학생인 한현민 군(17). 타임지에서 선정한 '전세계에서 영향력이 강한 10대 30인'에 유일한 한국인으로 이름을 올렸다.
                            <br />
                            <br />
                            1m 89cm의 키, 까만 피부와 타고난 곱슬머리, 이국적인 외모를 지닌 한현민은 아빠는 나이지리아인, 엄마는 한국인인 국내 1호 혼혈 모델이다. 이태원에서 17년을 산 한현민은 어린 시절 남과 다른 외모 때문에 차별을 당했지만, 지금은 그 다름이 그를 대체 불가능한 모델로 만들었다. 사람들의 차별을 환호로 바꿔놓은 그의 이야기는 일간지와 뉴스, BBC와 CNN을 장식하며 많은 사람의 마음을 움직였다.
                            <br />
                            <br />
                            홍대의 한 카페에서 한현민 군을 만났다. 한국인인 엄마의 눈과 나이지라아인인 아빠의 체격을 물려받은 그는 거리에 가만히 서있어도 단번에 사람의 시선을 끌만큼 눈에 띄었다. 외모는 이국적이지만, 여느 고등학생처럼 한국말을 아주 잘했다.
                        </p>
                    </div>
                </section>
            </article>

            {/* 기부안내 */}
            <div id="donation">
                <p className='title24x donationTitle'>기부안내</p>
                <p className='body16x'>사회복지・문화・예술・교육・종교・자선・학술 등 공익성을 고려하여 대통령령으로 정하는 기부금입니다.(법인세법)</p>
                <div className='donationType'>
                    <div className='donationBox'>
                        <img src={userIcon} alt="" />
                        <div className='donationText'>
                            <p className='bodyB16x'>개인 기부자</p>
                            <ul className='body14x'>                    
                                <li>목적을 지정한 기부금 및 물품 기부</li>
                                <li>현금, 작품, 지재권, 부동산 등</li>
                            </ul>
                        </div>
                    </div>
                    <div className='donationBox'>
                        <img src={businessIcon} alt="" />
                        <div className='donationText'>
                            <p className='bodyB16x'>기업/단체 파트너</p>
                            <ul className='body14x'>                    
                                <li>목적을 지정한 기부금 및 물품 기부</li>
                                <li>사회 공헌 사업 협업</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='donationInfo'>
                    <p className='body14x box'>
                        <p className='bodyB16x'>법인세 계산 시 기부금 손금 처리</p>
                        법률에 따른 지정기부금단체 및 법정기부금단체에 지출하거나 제5항에 따라 이월된 기부금은 법인세 계산 시 손금으로 처리하여 세액 감면의 혜택을 받을 수 있습니다 (「법인세법」 제24조제2항)
                    </p>
                    <p className='body14x box'>
                        <p className='bodyB16x'>소득세 계산 시 기부금의 필요경비 산입 및 세액공제</p>
                        법률에 따른 지정기부금단체 및 법정기부금단체에 지출한 기부금은 소득세 계산 시 필요경비로 산입하거나 특별세액공제를 통해 세액감면 혜택을 받을 수 있습니다 (「소득세법」 제34조 및 제59조의4)
                    </p>
                    <p className='body14x box'>
                        <p className='bodyB16x'>지정기부금의 필요경비 산입 한도액</p>
                        사업자가 해당 과세기간에 지출하거나 법인세법 제24조 제5항에 따라 이월된 기부금 중 법정기부금과 지정기부금은 다음의 어느 하나에 따라 산출한 필요경비 산입한도액 내에서 해당 과세기간의 사업소득금액을 계산할 때 순차적으로 필요경비에 산입합니다 (「소득세법」 제34조제2항)
                    </p>
                </div>
            </div>

            {/* 댓글 */}
            <div id="comments">
                <p className='title24x commentTitle'>댓글</p>

                {/* 댓글 작성 */}
                <div id='commenterTextbox'>
                    <div id="commenterProfile">
                        <div className="spaceBetween">
                            <div id='commenterProfileLeft'>
                                <div id="commenterProfileImg">
                                    <img alt="댓글자" src="https://mblogthumb-phinf.pstatic.net/MjAyMDAzMjNfMTQx/MDAxNTg0OTc0NTE2MzAy.py87WhV9btjuH8T8OxRqKOpqly2tZpqe2zMqjWkd9Ewg.aED2QwbOTVk2B4AxDfLXgkowNYwlNeTn-VdvJnrMTA0g.JPEG.7wayjeju/%ED%94%84%EB%A1%9C%ED%95%84%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4_IMG_1615.jpg?type=w800"/>
                                </div>
                                <div id="commenterProfiName">
                                    <div className='bodyB14x nickName'>&#123; 이름: 재능이 &#125;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='textBox'>
                        <textarea
                            className='body14x'
                            title="댓글"
                            id="commentTextarea"
                            rows={2}
                            cols={30}
                            maxLength={300}
                            defaultValue={""}
                            placeholder='댓글은 최대 300자까지 작성 가능합니다. 다양한 의견이 서로 존중될 수 있도록 다른 사람에게 불쾌감을 주는 욕설, 혐오,
                            비하의 표현이나 타인의 권리를 침해하는 내용은 주의해주세요.'
                        />
                        <Button size='Small'>등록</Button>
                    </div>
                </div>

                {/* 댓글 리스트 */}
                <div id='commenterList'>
                    <div id="commenterProfile">
                        <div className="spaceBetween">
                            <div id='commenterProfileLeft'>
                                <div id="commenterProfileImg">
                                    <img alt="댓글자" src="https://mblogthumb-phinf.pstatic.net/MjAyMDAzMjNfMTQx/MDAxNTg0OTc0NTE2MzAy.py87WhV9btjuH8T8OxRqKOpqly2tZpqe2zMqjWkd9Ewg.aED2QwbOTVk2B4AxDfLXgkowNYwlNeTn-VdvJnrMTA0g.JPEG.7wayjeju/%ED%94%84%EB%A1%9C%ED%95%84%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4_IMG_1615.jpg?type=w800"/>
                                </div>
                                <div id="commenterProfiName">
                                    <div className='bodyB14x nickName'>&#123; 이름: 재능이 &#125;</div>
                                    <div className='caption mail'>&#123; 댓글올린 시간: 2023.08.11. 12:00 &#125;</div>
                                </div>
                            </div>
                            <div id='commenterBtn'>
                                <img src="" alt="" width={24} />
                            </div>
                        </div>
                    </div>
                    <div id="commenterDescription">
                        <div className='body14x' id="commenterDetail">
                            <p>
                                대단한데? 한국이 좋나봐ㅋㅋㅋㅋㅋ
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 다른 콘텐츠 보기 */}
            <div id='contentsTum'>
                <p className='title24x contentsTitle'>인기 콘텐츠</p>
                <ContentsTrend />
            </div>
        </div>
    )
}
