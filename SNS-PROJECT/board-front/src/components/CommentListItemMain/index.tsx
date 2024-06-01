import React, { useState } from 'react';
import './style.css';
import { CommentListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import dayjs from 'dayjs';

interface Props {
    commentListMainItem: CommentListItem;
}

// component: Comment List Item Main 컴포넌트 //
export default function CommentListItemMain({ commentListMainItem }: Props) {
    // state: properties //
    const { nickname, profileImage, writeDatetime, content } = commentListMainItem;
    const [isExpanded, setIsExpanded] = useState(false);

    // function: 작성일 경과시간 함수 //
    const getElapsedTime = () => {
        const now = dayjs().add(9, 'hour');
        const writeTime = dayjs(writeDatetime);

        const gap = now.diff(writeTime, 's');
        if (gap < 60) return `${gap}초 전`;
        if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
        if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
        return `${Math.floor(gap / 86400)}일 전`;
    };

    // function: "더보기" 클릭 핸들러 //
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    // render: Comment List Item 렌더링 //
    return (
        <div className='comment-list-item-main'>
            <div className='comment-list-item-main-top'>
                <div className='comment-list-item-main-profile-box'>
                    <div className='comment-list-item-main-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
                </div>
                <div className='comment-list-item-main-info'>
                    <div className='comment-list-item-main-nickname'>{nickname}</div>
                    <div className='comment-list-item-main-time'>{getElapsedTime()}</div>
                </div>
            </div>
            <div className='comment-list-item-main-main'>
                <div className={`comment-list-item-main-content`}>
                    {content}
                </div>
                <div className='comment-list-item-main-separator'></div>
            </div>
        </div>
    );
}