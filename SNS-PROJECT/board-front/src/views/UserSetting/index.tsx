import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'; 
import defaultProfileImage from 'assets/image/default-profile-image.png'
import { useNavigate, useParams } from 'react-router-dom';
import { eventNames } from 'process';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { AUTH_PATH, BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';
import { GetUserBoardListRequest, deleteUserRequest, fileUploadRequest, getUserRequest, patchNicknameRequest, patchProfileImageRequest } from 'apis';
import { GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from 'apis/request/user';
import { useCookies } from 'react-cookie';
import { request } from 'http';
import { usePagination } from 'hooks';
import { GetUserBoardListResponseDto } from 'apis/response/board';
import Pagination from 'components/Pagination';

//    component: 유저 화면 컴포넌트    //
export default function UserSetting() {

  //    state: 유저 이메일 path variable 상태    //
  const {userEmail} = useParams();

  //    state: 로그인 유저 상태    //
  const {loginUser, resetLoginUser} = useLoginUserStore();

  //    state: set cookies 상태    //
  const [cookies, setCookie] = useCookies();

  
  //    state: 마이페이지 여부 상태    //
  const [isMyPage, setMyPage] = useState<boolean>(false);

  //     function: 네비게이트 함수    //
  const navigate = useNavigate();

  //    component: 유저 설정 화면 상단 컴포넌트    //
  const UserSetting = () => {

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

     //    function: get user response 처리 함수    //
     const getUserResponse = (responseBody: GetUserResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') {
          alert('데이터베이스 오류입니다.');
          return;
      }
  
      if (code === 'SU') {
          const { email, nickname, profileImage } = responseBody as GetUserResponseDto;
          setnickname(nickname);
          setProfileImage(profileImage);
          const isMyPage = email === loginUser?.email;
          setMyPage(isMyPage);
      } else {
          // 'SU' 이외의 응답일 경우, 사용자 정보 초기화하고 메인 페이지로 이동
          resetLoginUser(); // 로그인 유저 정보 초기화
          setCookie('accessToken', '', { path: MAIN_PATH(), expires: new Date() }); // 쿠키 제거
          navigate(MAIN_PATH()); // 메인 페이지로 이동
      }
  };

     //    function: file upload response 처리 함수    //
     const fileUploadResponse = (profileImage: string | null) => {
        if(!profileImage) return;
        if(!cookies.accessToken) return;

        const requestBody: PatchProfileImageRequestDto = {profileImage};
        patchProfileImageRequest(requestBody,cookies.accessToken).then(patchProfileImageResponse);
     }

     //    function: patch profile image response 처리 함수    //
     const patchProfileImageResponse = (responseBody: PatchProfileImageResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'AF') alert('인증에 실패했습니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      if (!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
     } ;

     //    function: patch nickname response 처리 함수    //
     const patchNicknameResponse = (responseBody: PatchNicknameResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert('닉네임은 필수입니다.');
      if (code === 'AF') alert('인증에 실패했습니다.');
      if (code === 'DN') alert('중복되는 닉네임입니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      if (!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
     };

     // event handler: 프로필 박스 버튼 클릭 이벤트 처리    //
     const onProfileBoxClickHandler = () => {
      if(!isMyPage) return;
      if (!imageInputRef.current) return;
      imageInputRef.current.click();
     }
     
     // event handler: 낙네임 수정 버튼 클릭 이벤트 처리    //
     const onNicknameEditButtonClickHandler = () => {
        if(!isNicknameChange) {
          setChangeNickname(nickname);
          setNicknameChange(!isNicknameChange);
          return;
        }
        if (!cookies.accessToken) return;
        const requestBody: PatchNicknameRequestDto = {
          nickname:changeNickname
        };
        patchNicknameRequest(requestBody, cookies.accessToken).then(patchNicknameResponse);
     }

     // event handler: 프로필 이미지 변경 이벤트 처리    //
     const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file',file);

      fileUploadRequest(data).then(fileUploadResponse);
     }

     // event handler: 닉네임 변경 이벤트 처리    //
     const onNicknameChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setChangeNickname(value);

     }

     // event handler: 회원 탈퇴 이벤트 처리    //
     const onDeleteUserButtonClickHandler = async () => {
      const confirmDelete = window.confirm('정말로 회원 탈퇴를 하시겠습니까?');
      if (!confirmDelete) return;
  
      if (!loginUser || !cookies.accessToken) return;
  
      const response = await deleteUserRequest(loginUser.email, cookies.accessToken);
      if (response && response.code === 'SU') {
          alert('회원 탈퇴가 완료되었습니다.');
          // 로그아웃 처리
          resetLoginUser(); // 로그인 유저 정보 초기화
          setCookie('accessToken', '', { path: MAIN_PATH(), expires: new Date() }) // 쿠키 제거
          navigate(MAIN_PATH()); // 로그인 페이지로 이동
      } else {
          alert('회원 탈퇴 중 오류가 발생했습니다.');
      }
  };


    //    effect: useremail path variable 변경 시 실행 할 함수    //
    useEffect(() => {
      if (!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
    }, [userEmail]);

    //    render: 유저 화면 상단 컴포넌트 렌더링   //
    return(
      <div id='user-setting-wrapper'>
        <div className='user-setting-container'>
        <div className='user-setting-title'>{'프로필 편집'}</div>
        <div className='user-setting-profile-box'>

        {isMyPage ? 
           <div className='user-setting-my-profile-image-box' onClick={onProfileBoxClickHandler}>
            {profileImage !== null ?
            <div className='user-setting-profile-image' style={{backgroundImage:`url(${profileImage})`}}></div> :
              <div className='icon-box-large'>
              <div className='icon image-box-white-icon'></div>
            </div>
          }
            <input ref={imageInputRef} type='file' accept='image/*' style={{display:'none'}} onChange={onProfileImageChangeHandler}/>
           </div> :
           <div className='user-setting-profile-image-box' style={{backgroundImage:`url(${profileImage ? profileImage : defaultProfileImage})`}} ></div>
          }
          
          <div className='user-setting-info-box'>
             <div className='user-setting-info-nickname-box'>
                <div className='user-setting-info-nickname-title'>{nickname}</div> 
                </div>
                <div className='user-setting-info-email'>{'dlwjdals0726@gmail.com'}</div>
              </div>
             </div>
            
             <div className='user-setting-nickname-box'>
              <div className='user-setting-nickname-title'>{'닉네임 수정'}
              </div>
              {isMyPage ? (
    <>
      {isNicknameChange ? (
        <div className='user-setting-info-nickname-input-box'>
          <input className='user-setting-info-nickname-input' type='text' size={changeNickname.length + 2} value={changeNickname} onChange={onNicknameChangeHandler}/>
          <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
            <div className='icon edit-icon'></div>
          </div>
        </div>
      ) : (
        <div className='user-setting-info-nickname'>
          {nickname}
          <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
            <div className='icon edit-icon'></div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className='user-setting-info-nickname'>
      {nickname}
      <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
        <div className='icon edit-icon'></div>
      </div>
    </div>
  )}
</div>

            <div className='user-setting-etc-info'>
              <div className='user-setting-etc-line-info'>{'성별'}</div>
              <input className='user-setting-etc-line-info-box' placeholder='입력하세요'/>
              <div className='user-setting-etc-line-info-e'>{'이 정보는 공개 프로필에 포함되지 않습니다.'}</div>
            </div>

            <div className='user-setting-delete-box'>
              <div className='user-setting-delete-title'>{'회원 탈퇴하기'}</div>
              <div className='user-setting-delete-info'>
                  <div>
                    {'안녕하세요, Reve입니다.'}<br /><br />
                    {'회원 탈퇴를 신청하시기 전에 아래의 내용을 확인해 주시기 바랍니다.'}<br /><br />
                    {'1. 탈퇴 절차'}<br />
                    {'- 회원 탈퇴를 원하실 경우, [회원정보 페이지/설정 페이지]에서 "회원 탈퇴" 버튼을 클릭해 주시기 바랍니다.'}<br />
                    {'- 탈퇴 요청 후, 본인 확인 절차를 거쳐 탈퇴가 완료됩니다.'}<br /><br />
                    {'2. 탈퇴 시 유의사항'}<br />
                    {'- 회원 탈퇴가 완료되면, 회원님의 모든 정보가 삭제되며 복구할 수 없습니다.'}<br />
                    {'- 탈퇴 후에는 기존에 작성하신 게시글, 댓글, 리뷰 등 모든 활동 기록이 삭제됩니다.'}<br />
                    {'- 탈퇴와 동시에 모든 서비스 이용이 중지되며, 재가입 시에도 이전의 정보는 복구되지 않습니다.'}<br /><br />
                    {'3. 탈퇴 후 재가입'}<br />
                    {'- 회원 탈퇴 후 동일한 이메일 주소로 재가입이 가능합니다. 다만, 탈퇴 시 삭제된 정보는 복구되지 않습니다.'}<br /><br />
                    {'4. 문의 사항'}<br />
                    {'- 회원 탈퇴와 관련하여 궁금한 점이나 도움이 필요하신 경우, 고객센터([고객센터 연락처])로 문의해 주시기 바랍니다.'}<br /><br />
                    {'회원님의 소중한 의견을 바탕으로 더욱 나은 서비스를 제공할 수 있도록 최선을 다하겠습니다.'}<br /><br />
                    {'감사합니다.'}<br /><br />
                    {'Reve 드림'}
                  </div>
                </div>
                <div className='black-large-full-button' onClick={onDeleteUserButtonClickHandler}>{'회원 탈퇴 버튼'}</div>

            </div>
        </div>
      </div>
    );
  };

    

      
//    render: 유저 화면 컴포넌트 렌더링   //
  return (
    <>
    <UserSetting/>
    
    </>
  );
}
