package com.cybage.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Batches;
import com.cybage.model.Sports;
/**
*@author: Sarang Raool
*@date: 18 Nov, 2021 12:18:57 PM
*@filename: BatchRepository.java
*
*/
@Repository
public interface BatchesRepository extends JpaRepository<Batches, Integer>{

	List<Batches> findAllBySportsId(Sports sport);

}
