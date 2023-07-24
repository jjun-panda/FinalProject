export {};
// import React from 'react';

// export default function BoardSave() {
//   return (
//     <>
//       {/* action속성: 목적지(서버주소), method속성: http request method(get, post) */}
//       <form action="/board/save" method="post" encType="multipart/form-data">
//         작성자: <input type="text" name="boardWriter" /> <br />
//         {/* 비밀번호: <input type="password" name="boardPassword"> <br> */}
//         제목: <input type="text" name="boardTitle" /> <br />
//         내용:{" "}
//         <textarea
//           name="boardContents"
//           cols={30}
//           rows={10}
//           defaultValue={""}
//         />{" "}
//         <br />
//         파일: <input type="file" name="boardFile" /> <br />
//         <input type="submit" defaultValue="글작성" />
//       </form>
//     </>
//   );
// }
