package com.cybage.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.sql.Timestamp;
import java.time.LocalDate;

import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import com.cybage.dao.BatchesRepository;
import com.cybage.dao.CommentRepository;
import com.cybage.dao.LikeRepository;
import com.cybage.dao.SportsRepository;
import com.cybage.dao.UserRepository;
import com.cybage.deccanSports.DeccanSportsApplication;
import com.cybage.model.BatchName;
import com.cybage.model.Batches;
import com.cybage.model.Comments;
import com.cybage.model.Like;
import com.cybage.model.Sports;
import com.cybage.model.User;

@RunWith(SpringRunner.class)
@ContextConfiguration
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes =DeccanSportsApplication.class)
class BatchServiceImplTest {
	
	@Autowired
	private SportsRepository sportsRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BatchesRepository batchRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private LikeRepository likeRepository;

//	@Test
//	void testGetBatchById() {
//		assertEquals("XYZ", batchRepository.findById(5).get().getCoachName());
//	}

//	@Test
//	void testAddBatch() {
//		Sports sport = sportsRepository.findById(2).get();
//		Batches batch = new Batches(2, BatchName.AFTERNOON, "9AM-11AM", "WED,TUE", "tejas", LocalDate.now(), 100, 10.0, sport);
//		batchRepository.save(batch);
//		assertThat(batch.getBatchId()).isGreaterThan(0);
//	}


//	@Test
//	void testAddComment() {
//		Batches batch  = batchRepository.findById(2).get();
//		User user = userRepository.findById(3).get();
//		Comments comment = new Comments(3, batch, user, "Very Nice");
//		commentRepository.save(comment);
//		assertThat(comment.getCommentId()).isGreaterThan(0);
//	}

//	@Test
//	void testLike() {
//		Batches batch  = batchRepository.findById(2).get();
//		User user = userRepository.findById(3).get();
//		Like like = new Like(5, batch, user);
//		likeRepository.save(like);
//		assertThat(like.getLikeId()).isGreaterThan(0);
//	}
//
//	@Test
//	void testUnlike() {
//		Batches batch  = batchRepository.findById(4).get();
//		User user = userRepository.findById(2).get();
//		likeRepository.deleteByBatchIdAndUserId(batch, user);
//		Assertions.assertNull(likeRepository.findById(3));
//	}

}
