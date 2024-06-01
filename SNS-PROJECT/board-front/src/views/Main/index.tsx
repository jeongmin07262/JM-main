import React, { useEffect, useState } from 'react'
import './style.css';
import Top3Item from 'components/Top3Item';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock, top3BoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';
import { getLatestBoardListRequest, getPopularListRequest, getTop3BoardListRequest } from 'apis';
import { GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import { GetPopularListResponseDto } from 'apis/response/search';
import Pagination from 'components/Pagination';

//    component: 게시물 메인 화면 컴포넌트        //
export default function Main() {

  //    function: 네비게이트 함수    //
  const navigate = useNavigate();

  //    component: 게시물 메인 화면 상단 컴포넌트        //
  const MainTop = () => {

    //    state: 주간 top3 게시물 리스트 상태    //
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    //    function: get top3 board list response 처리 함수    //
    const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const {code} =responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const {top3List} = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    }

    //    effect: 첫 마운트 시 실행될 함수    //
    useEffect(()=> {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    }, []);
    
    //    render: 게시물 메인 화면 상단 컴포넌트 렌더링 //
    return (
      <div id='main-top-wrapper'>
        <div className='main-top-container'>
        <div className='main-top-title'><strong>reve:꿈</strong>에서<br/>다양한 이야기를 나눠보세요</div>
        <div className='main-top-contents-box'>
          <div className='main-top-contents-title'>{'주간 TOP 3 게시물'}</div>
          <div className='main-top-contents'>
            {top3BoardList.map(top3ListItem => <Top3Item top3ListItem={top3ListItem}/>)}
            
          </div>
        </div>
      </div>
    </div>
    )
  }

  //    component: 게시물 메인 화면 하단 컴포넌트        //
  const MainBottom = () => {

    //    state: 인기 검색어 리스트 상태    //
    const [latestList, setlatestList] = useState<BoardListItem[]>([]);

    //    state: 인기 검색어 리스트 상태    //
    const [popularWordList, setpopularWordList] = useState<string[]>([]);

    //    function: get latest board list response 처리 함수    //
    const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const {code} =responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const {latestList} = responseBody as GetLatestBoardListResponseDto;
      setlatestList(latestList);
    }

    //    function: get popular board list response 처리 함수    //
    const getPopularListResponse = (responseBody: GetPopularListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const {code} =responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const {popularWordList} = responseBody as GetPopularListResponseDto;
      setpopularWordList(popularWordList);
    }

    //    event handler: 인기 검색어 클릭 이벤트 처리    //
    const onPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    }

    //    effect: 첫 마운트 시 실행될 함수    //
    useEffect(()=> {
      getLatestBoardListRequest().then(getLatestBoardListResponse);
      getPopularListRequest().then(getPopularListResponse);
    }, []);

    //    render: 게시물 메인 화면 하단 컴포넌트 렌더링 //
    return (
      <div id='main-bottom-wrapper'>
        <div className='main-bottom-container'>
        <div className='main-bottom-title'>{'최신 게시물'}</div>
        <div className='main-bottom-contents-box'>
          <div className='main-bottom-current-contents'>
            {latestList.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)}
          </div>
          <div className='main-bottom-popular-box'>
            <div className='main-bottom-popular-card'>
              <div className='main-bottom-popular-card-container'>
                <div className='main-bottom-popular-card-title'>{'인기 검색어'}</div>
                <div className='main-bottom-popular-card-contents'>
                  {popularWordList.map(word => <div className='word-badge' onClick={() => onPopularWordClickHandler(word)}>{word}</div> )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='main-bottom-pagination-box'>
        </div>
        </div>
      </div>
    )
  }


//    render: 게시물 메인 화면 컴포넌트 렌더링 //
  return (
    <>
      <MainTop />
      <MainBottom />
    </>
  )
}