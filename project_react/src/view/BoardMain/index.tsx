import React from 'react'
import BoardList from './list';

export default function BoardMain() {
  const saveReq = () => {
    window.location.href = "/board/save";
  }
  const listReq = () => {
    window.location.href = "/board/";
  }
  const pagingReq = () => {
    window.location.href = "/board/paging";
  }
  return (
    <>
      <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button onClick={() => saveReq()}>글작성</button>
          <button onClick={() => listReq()}>글목록</button>
          <button onClick={() => pagingReq()}>페이징목록</button>
      </div>
      <BoardList boardList={[]} />
    </>
  )
}
