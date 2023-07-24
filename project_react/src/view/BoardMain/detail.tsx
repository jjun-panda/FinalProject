export {};
// import React from 'react';

// export default function BoardDetail({ board, commentList, page }) {
//   const commentWrite = () => {
//     const writer = document.getElementById('commentWriter').value;
//     const contents = document.getElementById('commentContents').value;
//     console.log('작성자: ', writer);
//     console.log('내용: ', contents);
//     const id = board.id;
//     // Ajax 요청 대신 여기서 작성자, 내용, 게시글 번호를 서버로 보내는 코드 추가
//     // 성공적인 응답이 오면 처리할 로직도 추가
//   };

//   const listReq = () => {
//     console.log('목록 요청');
//     const page = page;
//     window.location.href = `/board/paging?page=${page}`;
//   };

//   const updateReq = () => {
//     console.log('수정 요청');
//     const id = board.id;
//     window.location.href = `/board/update/${id}`;
//   };

//   const deleteReq = () => {
//     console.log('삭제 요청');
//     const id = board.id;
//     window.location.href = `/board/delete/${id}`;
//   };

//   return (
//     <>
//       <table>
//         <tbody>
//           <tr>
//             <th>번호</th>
//             <td>{board.id}</td>
//           </tr>
//           <tr>
//             <th>제목</th>
//             <td>{board.boardTitle}</td>
//           </tr>
//           <tr>
//             <th>작성자</th>
//             <td>{board.boardWriter}</td>
//           </tr>
//           <tr>
//             <th>날짜</th>
//             <td>{board.writeDate}</td>
//           </tr>
//           <tr>
//             <th>조회수</th>
//             <td>{board.boardClickCount}</td>
//           </tr>
//           <tr>
//             <th>내용</th>
//             <td>{board.boardContents}</td>
//           </tr>
//           <tr>
//             {board.fileAttached === 1 && (
//               <>
//                 <th>이미지</th>
//                 <td>
//                   <img src={`/upload/${board.fileStoredName}`} alt="" />
//                 </td>
//               </>
//             )}
//           </tr>
//         </tbody>
//       </table>
//       <button onClick={listReq}>목록</button>
//       <button onClick={updateReq}>수정</button>
//       <button onClick={deleteReq}>삭제</button>
//       {/* 댓글 작성 부분 */}
//       <div id="comment-write">
//         <input type="text" id="commentWriter" placeholder="작성자" />
//         <input type="text" id="commentContents" placeholder="내용" />
//         <button id="comment-write-btn" onClick={commentWrite}>
//           댓글작성
//         </button>
//       </div>
//       {/* 댓글 출력 부분 */}
//       <div id="comment-list">
//         <table>
//           <tbody>
//             <tr>
//               <th>댓글번호</th>
//               <th>작성자</th>
//               <th>내용</th>
//               <th>작성시간</th>
//             </tr>
//             {commentList.map((comment) => (
//               <tr key={comment.id}>
//                 <td>{comment.id}</td>
//                 <td>{comment.commentWriter}</td>
//                 <td>{comment.commentContents}</td>
//                 <td>{comment.commentWriteDate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
