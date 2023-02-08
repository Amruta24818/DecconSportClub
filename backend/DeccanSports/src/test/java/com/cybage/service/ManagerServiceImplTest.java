package com.cybage.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import com.cybage.dao.BatchesRepository;
import com.cybage.dao.PricingRepository;
import com.cybage.dao.SportsRepository;
import com.cybage.deccanSports.DeccanSportsApplication;
import com.cybage.model.Batches;
import com.cybage.model.Pricing;
import com.cybage.model.Sports;

@RunWith(SpringRunner.class)
@ContextConfiguration
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes =DeccanSportsApplication.class)
class ManagerServiceImplTest {

	@Autowired
	private BatchesRepository batchRepository;
	
	@Autowired
	private PricingRepository pricingRepository;
	
	@Autowired
	private SportsRepository sportRepository;
	
//	@Test
//	void testAddBatch() {
//		Sports sport = sportsRepository.findById(2).get();
//		Batches batch = new Batches(2, BatchName.AFTERNOON, "9AM-11AM", "WED,TUE", "tejas", LocalDate.now(), 100, 10.0, sport);
//		batchRepository.save(batch);
//		assertThat(batch.getBatchId()).isGreaterThan(0);
//	}
	
//	@Test
//	void testEditBatch() {
//		Batches batch = batchRepository.findById(3).get();
//		batch.setBatchTimestamp(LocalDate.now());
//		batchRepository.save(batch);
//		assertThat(batch.getBatchId()).isGreaterThan(0);
//	}
	
//	@Test 
//	void testGetPricingById() {
//		assertEquals(2000.0, pricingRepository.findById(1).get().getMembersCharges());
//	}
	
//	@Test
//	void testAddPricing() {
//		Sports sport = sportRepository.findById(2).get();
//		Pricing pricing = new Pricing(5, 3000.0, 4000.0, LocalDate.now(), sport);
//		pricingRepository.save(pricing);
//		assertThat(pricing.getPriceId()).isGreaterThan(0);
//	}
	
//	@Test
//	void testEditPricing() {
//		Pricing pricing = pricingRepository.findById(3).get();
//		pricing.setNonMemberCharges(6000.0);
//		pricingRepository.save(pricing);
//		assertThat(pricing.getPriceId()).isGreaterThan(0);
//	}
}
