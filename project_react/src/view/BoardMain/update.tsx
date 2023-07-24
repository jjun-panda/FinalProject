export {};
// import React from 'react';

// export default function BoardUpdate() {
//   const boardUpdate = () => {
//     document.updateForm.submit();
//   }
//   return (
//     <>
//       <form action="/board/update" method="post" name="updateForm">
//         <input type="hidden" name="id" th:value="${boardUpdate.id}" />
//         작성자:{" "}
//         <input
//           type="text"
//           name="boardWriter"
//           th:value="${boardUpdate.boardWriter}"
//           readOnly=""
//         />{" "}
//         <br />
//         {/* 비밀번호: <input type="text" name="boardPassword" id="boardPassword"> <br> */}
//         제목:{" "}
//         <input
//           type="text"
//           name="boardTitle"
//           th:value="${boardUpdate.boardTitle}"
//         />{" "}
//         <br />
//         내용:{" "}
//         <textarea
//           name="boardContents"
//           cols={30}
//           rows={10}
//           th:text="${boardUpdate.boardContents}"
//           defaultValue={""}
//         />{" "}
//         <br />
//         {/* 파일: <input type="file" name="boardFile" th:if="${boardUpdate.fileStoredName}" th:text="${boardUpdate.fileStoredName}"> <br> */}
//         <input
//           type="hidden"
//           name="boardClickCount"
//           th:value="${boardUpdate.boardClickCount}"
//         />
//         <input type="button" defaultValue="글수정" onClick={ () => boardUpdate()} />
//       </form>
//     </>
//   );
// }
