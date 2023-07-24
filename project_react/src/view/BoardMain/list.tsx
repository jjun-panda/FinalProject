import React from 'react';

interface Board {
  id: number;
  boardTitle: string;
  boardWriter: string;
  writeDate: string;
  boardClickCount: number;
}

interface BoardListProps {
  boardList: Board[];
}

const BoardList: React.FC<BoardListProps> = ({ boardList }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>날짜</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board) => (
            <tr key={board.id}>
              <td>{board.id}</td>
              <td>
                <a href={`/board/${board.id}`}>{board.boardTitle}</a>
              </td>
              <td>{board.boardWriter}</td>
              <td>{board.writeDate}</td>
              <td>{board.boardClickCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BoardList;
