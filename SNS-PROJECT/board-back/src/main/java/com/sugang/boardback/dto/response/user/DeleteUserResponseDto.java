package com.sugang.boardback.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sugang.boardback.common.ResponseCode;
import com.sugang.boardback.common.ResponseMessage;
import com.sugang.boardback.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class DeleteUserResponseDto extends ResponseDto{
    private DeleteUserResponseDto () {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }
    public static ResponseEntity<DeleteUserResponseDto> success(){
        DeleteUserResponseDto result = new DeleteUserResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistUser() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // public static ResponseEntity<ResponseDto> noPermission() {
    //     ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
    //     return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
    // }
    
}
