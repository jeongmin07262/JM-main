package com.sugang.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sugang.boardback.dto.request.board.PostBoardRequestDto;
import com.sugang.boardback.dto.response.ResponseDto;
import com.sugang.boardback.dto.response.board.GetBoardResponseDto;
import com.sugang.boardback.dto.response.board.PostBoardResponseDto;
import com.sugang.boardback.entity.BoardEntity;
import com.sugang.boardback.entity.ImageEntity;
import com.sugang.boardback.repository.BoardRepository;
import com.sugang.boardback.repository.ImageRepository;
import com.sugang.boardback.repository.UserRepository;
import com.sugang.boardback.repository.resultSet.GetBoardResultSet;
import com.sugang.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<> ();

        try {
           resultSet = boardRepository.getBoard(boardNumber);
           if(resultSet == null) return GetBoardResponseDto.noExistBoard();
           
           imageEntities = imageRepository.findByBoardNumber(boardNumber);

           BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
           boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetBoardResponseDto.success(resultSet, imageEntities);
    }


    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
        try {
            boolean existedEmail = userRepository.existsByEmail(email);
            if(!existedEmail) return PostBoardResponseDto.notExistUser();

            BoardEntity BoardEntity = new BoardEntity(dto, email);
            boardRepository.save(BoardEntity);

            int boardNumber = BoardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for(String image: boardImageList){
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }
            imageRepository.saveAll(imageEntities);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }        
        return PostBoardResponseDto.success();
    }

    
}
