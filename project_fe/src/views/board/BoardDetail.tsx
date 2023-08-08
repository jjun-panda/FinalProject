import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentList from "../comment/CommentList";
import { AuthContext } from "../../context/AuthProvider";
import '../css/board_detail.css'
import '../css/contents_trend.css'
import userIcon from '../../assets/images/icon/ico_user.svg'
import businessIcon from '../../assets/images/icon/ico_building.svg'
import Donation from "./Donation";
import ContentsTrend from "./ContentsTrend";
import React from "react";
import user from "../../assets/images/user.svg"
import bgImg from "../../assets/images/bg.png"
import maskDate from "../../components/maskDate";

interface Board {
	seq: number;
	title: string;
	content: string;
	email: string;
	writeDate: string;
	readCount: number;
	fileImg: string;
	category: string;
}

export default function BoardDetail() {

	const { auth, setAuth } = useContext(AuthContext);

	const [board, setBoard] = useState<Board>({} as Board);
	const { seq } = useParams(); // 파라미터 가져오기

	const navigate = useNavigate();

	const getBoardDetail = async () => {
		await axios.get(`http://localhost:8888/board/${seq}`, { params: { readerEmail: auth ? auth : "" } })
			.then((resp) => {
				console.log(resp);

				setBoard(resp.data.board);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const deleteBoard = async () => {
		await axios.delete(`http://localhost:8888/board/${seq}`)
			.then((resp) => {
				console.log(resp.data);

				if (resp.data.deletedRecordCount === 1) {
					alert("게시글을 삭제했습니다");
					navigate("/board/list");
				}

			}).catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getBoardDetail();
	}, []);

	const updateBoard = {
		seq: board.seq,
		email: board.email,
		title: board.title,
		content: board.content,
		fileImg: board.fileImg,
		category: board.category
	}

	return (
		<div id='body'>
			<article id="content">
				<section id="articleImg">
					<img src={bgImg} alt="" />
				</section>
				<section id="articleProfile">
					<div className="spaceBetween">
						<div id='articleProfileLeft'>
							<div id="articleProfileImg">
								<img alt="업로드자" src={user} />
							</div>
							<div id="articleProfiName">
								<div className='bodyB16x nickName'>{board.email}</div>
								{/* <div className='caption mail'>&#123; 이메일주소 &#125;</div> */}
							</div>
						</div>
						<div id="articleProfileRight">
							<Donation />
						</div>
					</div>
				</section>

            <section id="articleDescription">
                <p id="articleTitle" className='title32x'>
					{board.title}
                </p>
				<div className="articleRight">
					<p id="articleCategory" className='body14x'>
						<Link to={`/board/list/${board.category}`}>{board.category}</Link> ∙ <time title={board.writeDate}>{maskDate({ writeDate: board.writeDate})}</time> ∙ 조회수 <span>{board.readCount}</span>
					</p>
					{
						/* 자신이 작성한 게시글인 경우에만 수정 삭제 가능 */
						(localStorage.getItem("email") == board.email) ?
							<>
								<div className="menu caption">
									<Link  className="updateToggle caption"  to="/board/update" state={{ board: updateBoard }}>수정</Link>
									<span>|</span>
									<Link  className="deleteComment caption" to="/board/list"  onClick={deleteBoard}>삭제</Link>
								</div>
							</>
						:
						null
					}
				</div>
				<div className='body16x' id="articleDetail" dangerouslySetInnerHTML={{ __html: board.content }} />

                {/* <div className='body16x' id="articleDetail">
						{board.content}
                </div> */}
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
						<span className='bodyB16x'>법인세 계산 시 기부금 손금 처리</span><br />
						법률에 따른 지정기부금단체 및 법정기부금단체에 지출하거나 제5항에 따라 이월된 기부금은 법인세 계산 시 손금으로 처리하여 세액 감면의 혜택을 받을 수 있습니다 (「법인세법」 제24조제2항)
					</p>
					<p className='body14x box'>
						<span className='bodyB16x'>소득세 계산 시 기부금의 필요경비 산입 및 세액공제</span><br />
						법률에 따른 지정기부금단체 및 법정기부금단체에 지출한 기부금은 소득세 계산 시 필요경비로 산입하거나 특별세액공제를 통해 세액감면 혜택을 받을 수 있습니다 (「소득세법」 제34조 및 제59조의4)
					</p>
					<p className='body14x box'>
						<span className='bodyB16x'>지정기부금의 필요경비 산입 한도액</span><br />
						사업자가 해당 과세기간에 지출하거나 법인세법 제24조 제5항에 따라 이월된 기부금 중 법정기부금과 지정기부금은 다음의 어느 하나에 따라 산출한 필요경비 산입한도액 내에서 해당 과세기간의 사업소득금액을 계산할 때 순차적으로 필요경비에 산입합니다 (「소득세법」 제34조제2항)
					</p>
				</div>
			</div>

		{/* 댓글 */}
        <div id="comments">
            {/* 댓글 리스트 */}
			<CommentList seq={Number(seq)} />
        </div>

		{/* 다른 콘텐츠 보기 */}
        <div id='contentsBodyTum'>
            <p className='title24x contentsTitle'>인기 콘텐츠</p>
			<div id='contentsCards'>
				<div className="contentsGroup">
					<div className="contentsSebgroup">
						<ContentsTrend />
					</div>
				</div>
			</div>
		</div>
	</div>

	);
}