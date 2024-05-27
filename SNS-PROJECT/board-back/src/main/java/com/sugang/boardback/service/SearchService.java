package com.sugang.boardback.service;

import org.springframework.http.ResponseEntity;

import com.sugang.boardback.dto.response.search.GetPopularListResponseDto;

public interface SearchService {

    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
    
}
