package com.cybage.dao;

import java.util.List;

import javax.xml.stream.events.Comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Batches;
import com.cybage.model.Comments;
import com.cybage.model.User;
@Repository
public interface CommentRepository extends JpaRepository<Comments, Integer> {
	List<Comments> findByUserId(User user);

	List<Comments> findAllByBatchesId(Batches batches);
}
