package com.cybage.service;

import java.time.LocalDate;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.cybage.dao.BatchesRepository;
import com.cybage.dao.CommentRepository;
import com.cybage.dao.LikeRepository;
import com.cybage.dao.SportsRepository;
import com.cybage.dao.UserRepository;
import com.cybage.model.Batches;
import com.cybage.model.Comments;
import com.cybage.model.Like;

@Service
@Transactional
public class BatchServiceImpl implements IBatchService {

	@Autowired
	BatchesRepository batchesRepository;

	@Autowired
	SportsRepository sportsRepository;

	@Autowired
	LikeRepository likesRepository;

	@Autowired
	CommentRepository commentsRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public List<Batches> getAllBatches(int sportId) {
		return batchesRepository.findAllBySportsId(sportsRepository.findById(sportId).get());
	}

	@Override
	public Batches getBatchById(int batchId) {
		return batchesRepository.findById(batchId).get();
	}

	@Override

	public Batches addBatch(Batches batches) {
//		sport.setManagerId(userRepository.findById(sport.getManagerId().getUserId()).get());
		batches.setBatchTimestamp(LocalDate.now());
		return batchesRepository.save(batches);
	}

	public List<Like> getAllLikes() {
		return likesRepository.findAll();
	}

	@Override
	public List<Comments> getCommentsOfBatch(int batchId) {
		return commentsRepository.findAllByBatchesId(getBatchById(batchId));
	}

	@Override
	public Comments addComment(Comments comment) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		comment.setUserId(userRepository.findUserByUserName(username));
		comment.setBatchesId(getBatchById(comment.getBatchesId().getBatchId()));
		return commentsRepository.save(comment);
	}

	@Override
	public Like like(Like like) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		like.setUserId(userRepository.findUserByUserName(username));
		like.setBatchId(getBatchById(like.getBatchId().getBatchId()));
		return likesRepository.save(like);
	}

	@Override
	public Like unlike(Like like) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		like.setUserId(userRepository.findUserByUserName(username));
		like.setBatchId(getBatchById(like.getBatchId().getBatchId()));
		likesRepository.deleteByBatchIdAndUserId(like.getBatchId(), like.getUserId());
		return like;

	}

}
