import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from '../context/AuthProvider';
import HttpHeadersProvider from '../context/HttpHeadersProvider';

import WebLayout from './WebLayOut';
import Home from '../components/app/Home';
import BoardList from '../views/board/BoardList';
import BoardWrite from '../views/board/BoardWrite';
import BoardDetail from '../views/board/BoardDetail';
import BoardUpdate from '../views/board/BoardUpdate';
import Login from '../views/member/Login';
import SignUp from '../views/member/SignUp';
import Logout from '../views/member/Logout';
import NotFoundPage from '../components/app/NotFoundPage';
import ScrollToTop from '../utils/ScrollToTop';
import MyPageDetail from '../views/mypage/MyPageDetail';

export default function RouterLayOut() {

	return (
		<BrowserRouter>
			<ScrollToTop/>
			<AuthProvider>
				<HttpHeadersProvider>
					<Routes>
						{/* 중첩 라우터 */}
						<Route path="/" element={<WebLayout />}>
							<Route path="/" element={<Home />} />
							<Route path="/board/list" element={<BoardList />} />
							<Route path="/board/write" element={<BoardWrite />} />
							<Route path="/board/detail/:seq" element={<BoardDetail />} />
							<Route path="/board/update" element={<BoardUpdate />} />
							{/* <Route path="/board/answer/:parentSeq" element={<BoardAnswer />} /> */}
						</Route>

						{/* 독립 라우터 */}
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/logout" element={<Logout />} />
						<Route path='/MyPageDetail' element={<MyPageDetail />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</HttpHeadersProvider>
			</AuthProvider>
		</BrowserRouter>
		
	);
}