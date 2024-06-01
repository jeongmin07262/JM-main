package com.sugang.boardback.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sugang.boardback.common.ResponseCode;
import com.sugang.boardback.common.ResponseMessage;
import com.sugang.boardback.dto.object.CommentListItem;
import com.sugang.boardback.dto.response.ResponseDto;
import com.sugang.boardback.repository.resultSet.GetCommentListResultSet;

import lombok.Getter;

@Getter
public class GetLatestCommentListResponseDto extends ResponseDto{
    private List<CommentListItem> latestCommentList;

    private GetLatestCommentListResponseDto(List<GetCommentListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestCommentList = CommentListItem.copyList(resultSets);
    }

    public static ResponseEntity<GetLatestCommentListResponseDto> success(List<GetCommentListResultSet> resultSets){
        GetLatestCommentListResponseDto result = new GetLatestCommentListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
    
}
