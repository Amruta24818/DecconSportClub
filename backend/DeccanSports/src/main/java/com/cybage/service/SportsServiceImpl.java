package com.cybage.service;

import com.cybage.dao.BatchesRepository;
import com.cybage.dao.EnrolledSportsRepository;
import com.cybage.dao.PricingRepository;
import com.cybage.dao.SportsRepository;
import com.cybage.dao.UserRepository;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Pricing;
import com.cybage.model.Sports;
import com.cybage.model.SportsCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author: Hrishikesh Dalimbkar
 * @date: 17-11-2021 11:23 AM
 * @filename: SportsServiceImpl.java
 */
@Service
@Transactional
public class SportsServiceImpl implements ISportsService {

	@Autowired
	SportsRepository sportsRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	private PricingRepository pricingRepository;

	@Autowired
	private EnrolledSportsRepository enrolledSportsRepo;

	@Autowired
	private BatchesRepository batchRepository;

	@Override
	public List<Sports> getAllSports() {
		return sportsRepository.findAll();
	}

	@Override
	public Sports addSport(Sports sport) {
		sport.setManagerId(userRepository.findById(sport.getManagerId().getUserId()).get());
		return sportsRepository.save(sport);
	}

	@Override
	public Sports getSportById(Integer sportId) {
		return sportsRepository.findById(sportId).get();
	}

	@Override
	public Sports updateSport(Sports sport) {
		return sportsRepository.save(sport);
	}

	@Override
	public void deleteSport(Integer sportId) {
		sportsRepository.deleteById(sportId);
	}

	@Override
	public List<Sports> getAllIndoorSports() {
		return sportsRepository.findAllBySportsCategory(SportsCategory.INDOOR);
	}

	@Override
	public List<Sports> getAllOutdoorSports() {
		return sportsRepository.findAllBySportsCategory(SportsCategory.OUTDOOR);
	}

	@Override
	public Pricing getPricingBySportsId(int sportsId) {

		return pricingRepository.findPricingBySportsId(sportsRepository.findById(sportsId).get());
	}

	@Override
	public EnrolledSports getEnrolledSportsByUserIdAndBatchId(int userId, int batchId) {

		return enrolledSportsRepo.findEnrolledSportsByUserIdAndBatchId(userRepository.findById(userId).get(),
				batchRepository.findById(batchId).get());
	}

	@Override
	public EnrolledSports enrollUser(EnrolledSports enrolledSports) {

		return enrolledSportsRepo.save(enrolledSports);
	}

	@Override
	public EnrolledSports addPayment(int enrollmentId) {
		System.out.println(enrollmentId);
		EnrolledSports enrolledSports = enrolledSportsRepo.findById(enrollmentId).get();
		enrolledSports.setPaymentStatus(1);
		return enrolledSportsRepo.save(enrolledSports);
	}

	@Override
	public Sports getSportsBySportsName(String sportsName) {
	
		return sportsRepository.findSportsBySportsName(sportsName);
	}
}
