package com.cybage.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Batches;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Sports;
import com.cybage.model.User;

/**
*@author: Akhil Darge
*@date: 16-Nov-2021 9:43:04 pm
*@filename: EnrolledSportsRepository.java
*
*/
@Repository
public interface EnrolledSportsRepository extends JpaRepository<EnrolledSports, Integer> {

	List<EnrolledSports> findEnrolledSportsByUserId(User userId);
	
	EnrolledSports findEnrolledSportsByUserIdAndBatchId(User userId,Batches batchId);

	List<EnrolledSports> findEnrolledSportsBySportsId(Sports sportsId);
	
	List<EnrolledSports> findAllByEnrolledStatus(int status);
	
	List<EnrolledSports> findByUserIdAndEnrolledStatus(User userId,int status);

}
