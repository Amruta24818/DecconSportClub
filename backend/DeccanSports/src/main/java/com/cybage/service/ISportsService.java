package com.cybage.service;

import com.cybage.model.EnrolledSports;
import com.cybage.model.Pricing;
import com.cybage.model.Sports;

import java.util.List;

/**
 * @author: Hrishikesh Dalimbkar
 * @date: 17-11-2021 11:23 AM
 * @filename: SportsServiceImpl.java
 */
public interface ISportsService {
    public List<Sports> getAllSports();

    public Sports addSport(Sports sport);

    public Sports getSportById(Integer sportId);

    public Sports updateSport(Sports sport);

    public void deleteSport(Integer sportId);

	public List<Sports> getAllIndoorSports();

	public List<Sports> getAllOutdoorSports();
	
	public Pricing getPricingBySportsId(int sportsId);
	
	public EnrolledSports getEnrolledSportsByUserIdAndBatchId(int userId,int batchId);
	
	public EnrolledSports enrollUser(EnrolledSports enrolledSports);
	
	public EnrolledSports addPayment(int enrollmentId);
	
	public Sports getSportsBySportsName(String sportsName);
}
