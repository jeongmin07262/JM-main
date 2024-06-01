import React, { useEffect, useState } from 'react'
import './style.css';
import { BoardListItem, CommentListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from 'assets/image/default-profile-image.png'
import { BOARD_DETAIL_PATH, BOARD_PATH } from 'constant';
import { commentListMock } from 'mocks';
import CommentListItemMain from 'components/CommentListItemMain';
import { GetCommentListResponseDto, GetLatestCommentListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { getCommentListRequest } from 'apis';

interface Props {
    boardListItem: BoardListItem;
}

//    component: Board list  컴포넌트    //
export default function BoardItem({ boardListItem }: Props) {
    const { boardNumber, title, content, boardTitleImage } = boardListItem;
    const { favoriteCount, commentCount, viewCount } = boardListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = boardListItem;

    //   state: 최근 댓글 리스트 상태    //
    const [latestCommentList, setLatestCommentList] = useState<CommentListItem[]>([]);

    //    function: get latest comment list response 처리 함수    //
    const GetLatestCommentListResponse = (responseBody: GetCommentListResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const {code} =responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;
  
        const {commentList} = responseBody as GetCommentListResponseDto;
        setLatestCommentList(commentList);
      };

    //    effect: 첫 마운트 시 실행될 함수    //
    useEffect(() => {
        if (!boardNumber) return;
        getCommentListRequest(boardNumber).then(GetLatestCommentListResponse)
    }, [boardNumber]);


    //    state: navigate    //
    const navigate = useNavigate();

    //    event handler: 클릭 핸들러    //
    const onClickHandler = () => {
        navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
    };

    //    render: Board list 컴포넌트 렌더링    //
    return (
        <div className="board-list-item" style={boardTitleImage ? {} : {height: 'auto' }}>
            <div className="board-list-item-main-box">
                <div className="board-list-item-top">
                    <div className="board-list-item-profile-box">
                        <div className="board-list-item-profile-image" style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})` }}>
                        </div>
                    </div>
                    <div className="board-list-item-write-box">
                        <div className="board-list-item-nickname">{writerNickname}</div>
                        <div className="board-list-item-write-date">{writeDatetime}</div>
                    </div>
                </div>
                <div className="board-list-item-middle" onClick={onClickHandler}>
                    <div className="board-list-item-title">{title}</div>
                    <div className="board-list-item-content">{content}</div>
                    {boardTitleImage !== null && (
                        <div className="board-list-item-image-box">
                            <div className="board-list-item-image" style={{ backgroundImage: `url(${boardTitleImage})` }}></div>
                        </div>
                    )}
                </div>
                <div className="board-list-item-bottom">
                    <div className="board-list-item-counts">{`댓글 ${commentCount} • 좋아요 ${favoriteCount} • 조회수 ${viewCount}`}</div>
                </div>
            </div>
            <div className="board-list-comment-box" onClick={onClickHandler}  style={boardTitleImage ? {} : {height: 'auto' }}>
            {latestCommentList.length === 0 ? (
                <div className="no-comment-message" >가장 먼저 댓글을 달아보세요 !</div>
                ) : ( <div className="board-list-comment-list"> {latestCommentList.map(latestCommentList => <CommentListItemMain commentListMainItem={latestCommentList} />)}
                </div> )}
            </div>
        </div>
    );
}