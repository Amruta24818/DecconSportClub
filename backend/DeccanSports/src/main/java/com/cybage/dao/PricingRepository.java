package com.cybage.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Pricing;
import com.cybage.model.Sports;

/**
*@author: Sarang Raool
*@date: 21 Nov, 2021 12:56:02 PM
*@filename: PricingRepository.java
*
*/
@Repository
public interface PricingRepository extends JpaRepository<Pricing, Integer> {
	
	Pricing findPricingBySportsId(Sports sportsId);

}
