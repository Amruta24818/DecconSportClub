package com.cybage.dao;

import com.cybage.model.Sports;
import com.cybage.model.SportsCategory;
import com.cybage.model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author: Hrishikesh Dalimbkar
 * @date: 17-11-2021 10:52 AM
 * @filename: SportsController.java
 */
@Repository
public interface SportsRepository extends JpaRepository<Sports, Integer> {

	List<Sports> findAllBySportsCategory(SportsCategory sportCategory);
	
	Sports findSportsByManagerId(User user);
	
	Sports findSportsBySportsName(String sportsName);

}
