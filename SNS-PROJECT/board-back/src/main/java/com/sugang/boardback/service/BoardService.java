package com.sugang.boardback.service;

import org.springframework.http.ResponseEntity;

import com.sugang.boardback.dto.request.board.PostBoardRequestDto;
import com.sugang.boardback.dto.response.board.GetBoardResponseDto;
import com.sugang.boardback.dto.response.board.PostBoardResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    
}
