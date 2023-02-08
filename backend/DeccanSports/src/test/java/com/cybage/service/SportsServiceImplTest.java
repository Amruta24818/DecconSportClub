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
import com.cybage.dao.EnrolledSportsRepository;
import com.cybage.dao.PricingRepository;
import com.cybage.dao.SportsRepository;
import com.cybage.dao.UserRepository;
import com.cybage.deccanSports.DeccanSportsApplication;
import com.cybage.model.Batches;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Sports;
import com.cybage.model.SportsCategory;
import com.cybage.model.User;

@RunWith(SpringRunner.class)
@ContextConfiguration
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes =DeccanSportsApplication.class)
class SportsServiceImplTest {
	
	@Autowired
	private SportsRepository sportsRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BatchesRepository batchRepository;

	@Autowired
	private PricingRepository pricingRepository;

	@Autowired
	private EnrolledSportsRepository enrolledSportRepository;

//	@Test
//	void testGetPricingBySportsId() {
//		assertEquals(1,pricingRepository.findById(1).get().getPriceId());
//	}

//	@Test
//	void testGetEnrolledSportsByUserIdAndBatchId() {
//		Batches batch = batchRepository.findById(1).get();
//		User user = userRepository.findById(3).get();
//		
//		assertEquals(1,enrolledSportRepository.findEnrolledSportsByUserIdAndBatchId(user,batch).getEnrolledSportsId());
//	}

//	@Test
//	void testEnrollUser() {
//		Sports sport = sportsRepository.findById(2).get();
//		Batches batch = batchRepository.findById(1).get();
//		User user = userRepository.findById(4).get();
//		EnrolledSports enrolledSports = new EnrolledSports(2, user, sport, batch, 3000.0, LocalDate.now(), 0, 0);
//		enrolledSportRepository.save(enrolledSports);
//		assertThat(enrolledSports.getEnrolledSportsId()).isGreaterThan(0);
//	}

//	@Test
//	void testAddPayment() {
//		EnrolledSports enrolledSports = enrolledSportRepository.findById(2).get();
//		enrolledSports.setPaymentStatus(1);
//		enrolledSportRepository.save(enrolledSports);
//		assertThat(enrolledSports.getEnrolledSportsId()).isGreaterThan(0);
//	}

}

