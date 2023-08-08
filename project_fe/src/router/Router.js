import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import HttpHeadersProvider from "../context/HttpHeadersProvider";

import WebLayOut from "./WebLayOut";
import Home from "../components/app/Home";
import Login from "../views/member/Login";
import SignUp from "../views/member/SignUp";
import Logout from "../views/member/Logout";
import ScrollToTop from "../utils/ScrollToTop";
import NotFoundPage from "../components/app/NotFoundPage";

import BoardList from "../views/board/BoardList";
import BoardWrite from "../views/board/BoardWrite";
import BoardDetail from "../views/board/BoardDetail";
import BoardUpdate from "../views/board/BoardUpdate";

import UserDetail from "../views/mypage/UserDetail";
import UserUpdate from "../views/mypage/UserUpdate";

import ListCategoryArt from "../views/board/ListCategoryArt";
import ListCategoryDesignDev from "../views/board/ListCategoryDesignDev";
import ListCategoryFashion from "../views/board/ListCategoryFashion";
import ListCategoryLife from "../views/board/ListCategoryLife";
import ListCategoryCooking from "../views/board/ListCategoryCooking";
import ListCategoryMusic from "../views/board/ListCategoryMusic";
import UserDelete from "../views/mypage/UserDelete";
import ListSearch from "../views/board/ListSearch";

export default function RouterLayOut() {
	return (
		<BrowserRouter>
			<ScrollToTop/>
			<AuthProvider>
				<HttpHeadersProvider>
					<Routes>
					{/* 중첩 라우터 */}
					<Route path="/" element={<WebLayOut />}>
						<Route path="/" element={<Home />} />
						<Route path="/board/list" element={<BoardList />} />
						<Route path="/board/list/art" element={<ListCategoryArt />} />
						<Route path="/board/list/design_dev" element={<ListCategoryDesignDev />} />
						<Route path="/board/list/fashion" element={<ListCategoryFashion />} />
						<Route path="/board/list/life" element={<ListCategoryLife />} />
						<Route path="/board/list/cooking" element={<ListCategoryCooking />} />
						<Route path="/board/list/music" element={<ListCategoryMusic />} />
						<Route path="/board/write" element={<BoardWrite />} />
						<Route path="/board/detail/:seq" element={<BoardDetail />} />
						<Route path="/board/update" element={<BoardUpdate />} />
						<Route path="/s" element={<ListSearch />} />

						<Route path="/user/detail" element={<UserDetail />} />
						<Route path="/user/update" element={<UserUpdate />} />

						
						{/* <Route path="/board/answer/:parentSeq" element={<BoardAnswer />} /> */}
					</Route>

					{/* 독립 라우터 */}
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/user/delete" element={<UserDelete />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</HttpHeadersProvider>
		</AuthProvider>
    </BrowserRouter>
	);
}
