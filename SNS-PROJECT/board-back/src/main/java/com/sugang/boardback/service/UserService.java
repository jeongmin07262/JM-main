package com.sugang.boardback.service;

import org.springframework.http.ResponseEntity;

import com.sugang.boardback.dto.response.user.GetSignInUserResponseDto;

public interface UserService {

    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
    
}
