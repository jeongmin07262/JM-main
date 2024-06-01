package com.sugang.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import com.sugang.boardback.dto.request.user.PatchNicknameRequestDto;
import com.sugang.boardback.dto.request.user.PatchProfileImageRequestDto;
import com.sugang.boardback.dto.response.ResponseDto;
import com.sugang.boardback.dto.response.board.DeleteBoardResponseDto;
import com.sugang.boardback.dto.response.user.DeleteUserResponseDto;
import com.sugang.boardback.dto.response.user.GetSignInUserResponseDto;
import com.sugang.boardback.dto.response.user.GetUserResponseDto;
import com.sugang.boardback.dto.response.user.PatchNicknameResponseDto;
import com.sugang.boardback.dto.response.user.PatchProfileImageResponseDto;
import com.sugang.boardback.entity.BoardEntity;
import com.sugang.boardback.entity.UserEntity;
import com.sugang.boardback.repository.BoardRepository;
import com.sugang.boardback.repository.CommentRepository;
import com.sugang.boardback.repository.FavoriteRepository;
import com.sugang.boardback.repository.ImageRepository;
import com.sugang.boardback.repository.UserRepository;
import com.sugang.boardback.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {
    
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final FavoriteRepository favoriteRepository;
    private final CommentRepository commentRepository;
    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String email) {

        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return GetUserResponseDto.noExistUser();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetUserResponseDto.success(userEntity);
    }


    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {

        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return GetSignInUserResponseDto.notExistUser();
            

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInUserResponseDto.success(userEntity);
    }


    @Override
    public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) PatchNicknameResponseDto.noExistUser();

            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if(existedNickname) return PatchNicknameResponseDto.duplicateNickname();

            userEntity.setNickname(nickname);
            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchNicknameResponseDto.success();
        
    }


    @Override
    public ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return PatchProfileImageResponseDto.noExistUser();

            String profileImage = dto.getProfileImage();
            userEntity.setProfileImage(profileImage);
            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchProfileImageResponseDto.success();


    }


    @Override
    public ResponseEntity<? super DeleteUserResponseDto> deleteUser(String email) {
        try {
            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return DeleteBoardResponseDto.noExistUser();

            List<BoardEntity> userBoard = boardRepository.findByWriterEmail(email);

            for (BoardEntity board : userBoard) {
                imageRepository.deleteByBoardNumber(board.getBoardNumber());
                commentRepository.deleteByBoardNumber(board.getBoardNumber());
                favoriteRepository.deleteByBoardNumber(board.getBoardNumber());
                boardRepository.delete(board);
            }

            userRepository.deleteByEmail(email);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return DeleteUserResponseDto.success();
    }

}
