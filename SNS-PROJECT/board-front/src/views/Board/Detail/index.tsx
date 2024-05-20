import React from 'react'
import './style.css';

//  component: 게시물 상세 화면 컴포넌트        //
export default function BoardDetail() {

  //  component: 게시물 상세 상단 컴포넌트        //
  const BoardDetailTop = () => {
    
    //  render: 게시물 상세 상단 컴포넌트 렌더링 //
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{'경성대학교 종합설계프로젝트 SNS 만들기 프로젝트 테스트 중입니다.'}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image'></div>
              <div className='board-detail-writer-nickname'>{'안녕나는이정민'}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{'2024. 05. 20.'}</div>
            </div>
            <div className='icon-button'>
             <div className='icon more-icon'></div>
            </div>
            <div className='board-detail-more-box'>
             <div className='board-detail-update-button'>{'수정'}</div>
             <div className='divider'></div>
             <div className='board-detail-delete-button'>{'삭제'}</div>
            </div>
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          <div className='board-detail-main-text'>{'오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 오늘 점심을 뭐먹을 지 너무 고민이 되는 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 ...'}</div>
          <div className='board-detail-main-image'></div>
        </div>
      </div>
    );
  };

  //  component: 게시물 상세 하단 컴포넌트        //
  const BoardDetailBottom = () => {

    //  render: 게시물 상세 하단 컴포넌트 렌더링 //
    return (<></>)
  }


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