package com.cybage.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cybage.model.Batches;
import com.cybage.model.Like;
import com.cybage.model.User;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {
	List<Like> findByUserId(User user);

	void deleteByBatchIdAndUserId(Batches batchId, User userId);

}
