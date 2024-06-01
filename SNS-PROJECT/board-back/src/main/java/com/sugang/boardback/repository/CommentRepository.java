package com.sugang.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sugang.boardback.entity.CommentEntity;
import com.sugang.boardback.repository.resultSet.GetCommentListResultSet;

import java.util.List;

import javax.transaction.Transactional;
@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer>{
    
    @Query(
        value = 
        "SELECT " +
        "    U.nickname AS nickname, " +
        "    U.profile_image AS profileImage, " +
        "    C.write_datetime AS writeDatetime, " +
        "    C.content AS content " +
        "FROM comment AS C " +
        "INNER JOIN user AS U " +
        "ON C.user_email = U.email " +
        "WHERE C.board_number = ?1 " +
        "ORDER BY writeDatetime DESC ",
        nativeQuery = true
    )
    List<GetCommentListResultSet> getCommentList(Integer boardNumber);

    @Query(
        value = 
        "SELECT " +
        "    U.nickname AS nickname, " +
        "    U.profile_image AS profileImage, " +
        "    C.write_datetime AS writeDatetime, " +
        "    C.content AS content " +
        "FROM comment AS C " +
        "INNER JOIN user AS U " +
        "ON C.user_email = U.email " +
        "WHERE C.board_number = ?1 " +
        "AND C.write_datetime >= DATE_SUB(NOW(), INTERVAL 7 DAY) " +
        "ORDER BY writeDatetime DESC " +
        "LIMIT 5",
        nativeQuery = true
    )
    List<GetCommentListResultSet> getLatestCommentList(Integer boardNumber);
    
    @Transactional
    void deleteByBoardNumber (Integer boardNumber);
}
