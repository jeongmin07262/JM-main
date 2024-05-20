import React, { useEffect, useState } from 'react'
import './style.css';
import FavoriteItem from 'components/FavoriteItem';
import { CommentListItem, FavoriteListItem } from 'types/interface';
import { commentListMock, favoriteListMock } from 'mocks';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';
import defaultProfileImage from 'assets/image/default-profile-image.png'

//  component: 게시물 상세 화면 컴포넌트        //
export default function BoardDetail() {

  //  component: 게시물 상세 상단 컴포넌트        //
  const BoardDetailTop = () => {

    //    state: more 버튼 상태    //
    const [showMore, setShowMore] = useState<boolean>(false);

    //    event handler: more 버튼 클릭 이벤트 처리    //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    }
    
    //  render: 게시물 상세 상단 컴포넌트 렌더링 //
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{'오늘 점심 뭐먹지 맛있는 거 먹고 싶은데 추천 부탁 오늘 점심 뭐먹지 맛있는 거 먹고 싶은데'}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image' style={{backgroundImage: `url(${defaultProfileImage})`}}></div>
              <div className='board-detail-writer-nickname'>{'안녕나는이정민'}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{'2024. 05. 20.'}</div>
            </div>
            <div className='icon-button' onClick={onMoreButtonClickHandler}>
             <div className='icon more-icon'></div>
            </div>
            {showMore && 
            <div className='board-detail-more-box'>
             <div className='board-detail-update-button'>{'수정'}</div>
             <div className='divider'></div>
             <div className='board-detail-delete-button'>{'삭제'}</div>
            </div>
            }
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          <div className='board-detail-main-text'>{'오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 오늘 점심을 뭐먹을 지 너무 고민이 되는 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 ...'}</div>
          <img className='board-detail-main-image' src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMTFfNTIg%2FMDAxNzA0OTc1OTU4MjM5.nVJUDBNAirpYsDLYae4_4XU_r1kvStdDbgAGM23QWgkg.PJpyQq8O-2MmeS7ardmohJ4stbS9nO4LZdPoMiTnjWkg.PNG.luvkki%2Fb04f5dd7-fa75-4a5a-b34e-6171c4da5a1b.png&type=a340' />
        </div>
      </div>
    );
  };

  //  component: 게시물 상세 하단 컴포넌트        //
  const BoardDetailBottom = () => {

    const [favoriteList, setfavoriteList] = useState<FavoriteListItem[]>([]);
    const [commentList, setcommentList] =useState<CommentListItem[]>([]);

    useEffect(() => {
      setfavoriteList(favoriteListMock);
      setcommentList(commentListMock);
    },[]);

    //  render: 게시물 상세 하단 컴포넌트 렌더링 //
    return (
    <div id='board-detail-bottom'>
      <div className='board-detail-bottom-button-box'>
        <div className='board-detail-bottom-button-group'>
          <div className='icon-button'>
            <div className='icon favorite-fill-icon'></div>
          </div>
          <div className='board-detail-bottom-button-text'>{`좋아요 ${12}`}</div>
          <div className='icon-button'>
            <div className='icon up-light-icon'></div>
          </div>
        </div>
        <div className='board-detail-bottom-button-group'>
          <div className='icon-button'>
            <div className='icon comment-icon'></div>
          </div>
          <div className='board-detail-bottom-button-text'>{`댓글 ${12}`}</div>
          <div className='icon-button'>
            <div className='icon up-light-icon'></div>
          </div>
        </div>
      </div>
      <div className='board-detail-bottom-favorite-box'>
        <div className='board-detail-bottom-favorite-container'>
          <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{12}</span></div>
          <div className='board-detail-bottom-favorite-contents'>
            {favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
          </div>
        </div>
      </div>
      <div className='board-detail-bottom-comment-box'>
        <div className='board-detail-bottom-comment-container'>
          <div className='board-detail-bottom-comment-title'>{'댓글 '}<span className='emphasis'>{12}</span></div>
          <div className='board-detail-bottom-comment-list-container'>
            {commentList.map(item => <CommentItem commentListItem={item} />)}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-bottom-comment-pagination-box'>
          <Pagination />
        </div>
        <div className='board-detail-bottom-comment-input-box'>
        <div className='board-detail-bottom-comment-input-container'>
          <textarea className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' />
          <div className='board-detail-bottom-comment-button-box'>
            <div className='disable-button'>{'댓글 달기'}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};


//  render: 게시물 상세 화면 컴포넌트 렌더링 //
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}