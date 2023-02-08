package com.cybage.service;

import java.util.List;

import com.cybage.model.Batches;

import com.cybage.model.Sports;

import com.cybage.model.Comments;
import com.cybage.model.Like;


public interface IBatchService {

	List<Batches> getAllBatches(int sportId);

	Batches getBatchById(int batchId);
	
	public Batches addBatch(Batches batches);

	List<Like> getAllLikes();

	List<Comments> getCommentsOfBatch(int batchId);

	Comments addComment(Comments comment);

	Like like(Like like);

	Like unlike(Like like);

}
