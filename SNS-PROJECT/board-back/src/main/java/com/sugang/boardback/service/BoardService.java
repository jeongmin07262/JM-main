package com.sugang.boardback.service;

import org.springframework.http.ResponseEntity;

import com.sugang.boardback.dto.request.board.PostBoardRequestDto;
import com.sugang.boardback.dto.request.board.PostCommentRequestDto;
import com.sugang.boardback.dto.response.board.GetBoardResponseDto;
import com.sugang.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.sugang.boardback.dto.response.board.PostBoardResponseDto;
import com.sugang.boardback.dto.response.board.PostCommentResponseDto;
import com.sugang.boardback.dto.response.board.PutFavoriteResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email);
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
}
