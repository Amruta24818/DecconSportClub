package com.cybage.service;

/**
*@author: Akhil Darge
*@date: 16-Nov-2021 9:07:05 pm
*@filename: IAdminService.java
*
*/

import java.util.List;

import com.cybage.model.Comments;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Like;
import com.cybage.model.Membership;
import com.cybage.model.Sports;
import com.cybage.model.User;

public interface IAdminService {

	List<User> getAllManagers();

	List<EnrolledSports> getAllEnrolledSports();

	List<Membership> getAllMembershipDetails();

	List<Sports> getAllSports();

	List<User> getAllLockedUsers();

	Sports addSports(Sports sports);

	Sports editSports(Sports sports);

	void deleteSportsById(int sportsId);

	User addManager(User user);

	User editManager(User user);

	void deleteManagerById(int userId);
	
	Sports getSportsById(int sportsId);
	
	List<User> getAllAvailableManagers();

	List<Like> getLikes();

	List<Comments> getComments();
	
	User getManagerById(int userId);
}
