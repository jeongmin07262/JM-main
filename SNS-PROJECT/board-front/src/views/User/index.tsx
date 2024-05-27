import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'; 
import defaultProfileImage from 'assets/image/default-profile-image.png'
import { useNavigate, useParams } from 'react-router-dom';
import { eventNames } from 'process';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { BOARD_PATH, BOARD_WRITE_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';

//    component: 유저 화면 컴포넌트    //
export default function User() {

  //    state: 유저 이메일 path variable 상태    //
  const {userEmail} = useParams();

  //    state: 로그인 유저 상태    //
  const {loginUser} = useLoginUserStore();

  //    state: 마이페이지 여부 상태    //
  const [isMyPage, setMyPage] = useState<boolean>(false);

  //     function: 네비게이트 함수    //
  const navigate = useNavigate();

  //    component: 유저 화면 상단 컴포넌트    //
  const UserTop = () => {

    //    state: 이미지 파일 인풋 참조 상태    //
    const imageInputRef = useRef<HTMLInputElement | null > (null);

     //    state: 닉네임 변경 여부 상태    //
     const [isNicknameChange, setNicknameChange] = useState<boolean>(false);

     //    state: 닉네임 상태    //
     const [nickname, setnickname] = useState<string>('');

     //    state: 변경 닉네임 상태    //
     const [changeNickname, setChangeNickname] = useState<string>('');

     //    state: 프로필 이미지 상태    //
     const [profileImage, setProfileImage] = useState<string | null >(null);

     // event handler: 프로필 박스 버튼 클릭 이벤트 처리    //
     const onProfileBoxClickHandler = () => {
      if(!isMyPage) return;
      if (!imageInputRef.current) return;
      imageInputRef.current.click();
     }
     
     // event handler: 낙네임 수정 버튼 클릭 이벤트 처리    //
     const onNicknameEditButtonClickHandler = () => {
      setChangeNickname(nickname);
      setNicknameChange(!isNicknameChange);
     }

     // event handler: 프로필 이미지 변경 이벤트 처리    //
     const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file',file);

     }

     // event handler: 닉네임 변경 이벤트 처리    //
     const onNicknameChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setChangeNickname(value);

     }


    //    effect: email path variable 변경 시 실행 할 함수    //
    useEffect(() => {

      if (!userEmail) return;
      setnickname('나는이정민');
      setProfileImage('data:image/jpeg;base64,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');

    }, [userEmail]);

    //    render: 유저 화면 상단 컴포넌트 렌더링   //
    return(
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ? 
           <div className='user-top-my-profile-image-box' onClick={onProfileBoxClickHandler}>
            {profileImage !== null ?
            <div className='user-top-profile-image' style={{backgroundImage:`url(${profileImage})`}}></div> :
              <div className='icon-box-large'>
              <div className='icon image-box-white-icon'></div>
            </div>
          }
            <input ref={imageInputRef} type='file' accept='image/*' style={{display:'none'}} onChange={onProfileImageChangeHandler}/>
           </div> :
           <div className='user-top-profile-image-box' style={{backgroundImage:`url(${profileImage ? profileImage : defaultProfileImage})`}} ></div>
          }
          
          <div className='user-top-info-box'>
             <div className='user-top-info-nickname-box'>
               
               {isMyPage ? 
                <> 
                {isNicknameChange ? 
                <input className='user-top-info-nickname-input' type='text' size={changeNickname.length + 2} value={changeNickname} onChange={onNicknameChangeHandler}/> : 
                <div className='user-top-info-nickname'>{nickname}</div>
                }
                
                <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
                  <div className='icon edit-icon'></div>
                </div> </> :
                <div className='user-top-info-nickname'>{nickname}</div> }
                  
                </div>
                <div className='user-top-info-email'>{'dlwjdals0726@gmail.com'}</div>
            </div>
        </div>
      </div>
    );
  };

    //    component: 유저 화면 하단 컴포넌트    //
    const UserBottom = () => {

      //    state: 게시물 개수 상태    //
      const [count, setCount] =useState<number>(2);

      //    state: 게시물 리스트 상태    //
      const [userBoardList,setuserBoardList] =useState<BoardListItem[]>([]);

      //    event handler: side card 클릭 이벤트 처리    //
      const onSideCardClickHandelr = () => {
          if(isMyPage) navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
          else if(loginUser) navigate(USER_PATH(loginUser.email));
      }

      //    effect: userEmail path variable이 변경될때마다 실행할 함수    //
      useEffect(() => {
        setuserBoardList(latestBoardListMock);
      },[userEmail]);

      //    render: 유저 화면 하단 컴포넌트 렌더링   //
      return(
        <div id='user-bottom-wrapper'>
          <div className='user-bottom-container'>
            <div className='user-bottom-title'>{isMyPage ? '내 게시물' : '게시물 '} <span className='emphasis'>{count}</span></div>
              <div className='user-bottom-contents-box'>
                {count === 0 ?
                <div className='user-bottom-contents-nothing'>{'게시물이 없습니다.'}</div> :
                <div className='user-bottom-contents'>
                  {userBoardList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
                </div>
                }
                <div className='user-bottom-side-box'>
                  <div className='user-bottom-side-card' onClick={onSideCardClickHandelr}>
                    <div className='user-bottom-side-container'>
                      {isMyPage ?
                      <>
                      <div className='icon-box'>
                        <div className='icon edit-icon'></div>
                      </div>
                      <div className='user-bottom-side-text'>{'글쓰기'}</div>
                      </> :
                      <>
                      <div className='user-bottom-side-text'>{'내 게시물로 가기'}</div>
                      <div className='icon-box'>
                        <div className='icon arrow-right-icon'></div>
                      </div>
        
                      </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            <div className='user-bottom-pagination-box'></div>
          </div>
        </div>
      );
  
    };

//    render: 유저 화면 컴포넌트 렌더링   //
  return (
    <>
    <UserTop/>
    <UserBottom/>
    </>
  );
};