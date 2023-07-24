export {};
// import React from 'react';

// export default function BoardPaging() {
//     const saveReq = () => {
//         window.location.href = "/board/save";
//     }
    
//     return (
//         <>
//             <meta charSet="UTF-8" />
//             <title>Title</title>
//             <button onClick={ () => saveReq()}>글작성</button>
//             <table>
//             <tbody>
//                 <tr>
//                 <th>번호</th>
//                 <th>제목</th>
//                 <th>작성자</th>
//                 <th>날짜</th>
//                 <th>조회수</th>
//                 </tr>
//                 <tr th:each="board: ${boardList}">
//                 <td th:text="${board.id}" />
//                 <td>
//                     <a
//                     th:href="@{|/board/${board.id}|(page=${boardList.number + 1})}"
//                     th:text="${board.boardTitle}"
//                     />
//                 </td>
//                 <td th:text="${board.boardWriter}" />
//                 <td th:text="*{#temporals.format(board.writeDate, 'yyyy년MM월dd일 HH:mm:ss')}" />
//                 <td th:text="${board.boardClickCount}" />
//                 </tr>
//             </tbody>
//             </table>
//             {/* 첫번째 페이지로 이동 */}
//             {/* /board/paging?page=1 */}
//             <a th:href="@{/board/paging(page=1)}">First</a>
//             {/* 이전 링크 활성화 비활성화 */}
//             {/* boardList.getNumber() 사용자:2페이지 getNumber()=1 */}
//             <a th:href="${boardList.first} ? '#' : @{/board/paging(page=${boardList.number})}">
//             prev
//             </a>
//             {/* 페이지 번호 링크(현재 페이지는 숫자만)*/}
//             {/* for(int page=startPage; page<=endPage; page++)*/}
//             <span th:each="page: ${#numbers.sequence(startPage, endPage)}">
//             {/* 현재페이지는 링크 없이 숫자만 */}
//             <span th:if="${page == boardList.number + 1}" th:text="${page}" />
//             {/* 현재페이지 번호가 아닌 다른 페이지번호에는 링크를 보여줌 */}
//             <span th:unless="${page == boardList.number + 1}">
//                 <a th:href="@{/board/paging(page=${page})}" th:text="${page}" />
//             </span>
//             </span>
//             {/* 다음 링크 활성화 비활성화*/}
//             {/* 사용자: 2페이지, getNumber: 1, 3페이지*/}
//             <a th:href="${boardList.last} ? '#' : @{/board/paging(page=${boardList.number + 2})}">
//             next
//             </a>
//             {/* 마지막 페이지로 이동 */}
//             <a th:href="@{/board/paging(page=${boardList.totalPages})}">Last</a>
//         </>
//     );
// }