export default function NotFoundContents() {
    return (
        <>
        <div className="noContentshBox">
            <p className="bodyB24x">해당 게시물이 존재하지 않습니다.</p>
            <ul className='body14x'>
                <li>모든 단어의 철자가 정확한지 확인해 보세요.</li>
                <li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>
                <li>더 일반적인 검색어를 사용해 보세요.</li>
                <li>검색 옵션을 변경해서 다시 검색해 보세요.</li>
            </ul>
        </div>
        </>
    )
}
