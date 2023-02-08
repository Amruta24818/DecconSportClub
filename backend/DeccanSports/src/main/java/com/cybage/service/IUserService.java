package com.cybage.service;

/**
*@author: Amruta Patil
*@date: 16-Nov-2021 2:53:08 pm
*@filename: IAdminService.java
*
*/

import java.util.List;

import javax.xml.stream.events.Comment;

import com.cybage.model.Comments;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Like;
import com.cybage.model.Membership;
import com.cybage.model.User;

public interface IUserService {

	public User getUserById(int userId);

	public User getUserByUsername(String username);

	public User authenticateUser(String username, String password);

	List<User> getAllUsers();

	User addUser(User user);

	User editUser(User user);

	void deleteUserById(int userId);

	public User changePwd(User user);

	public List<EnrolledSports> enrolledSportsByUserId(int userId);

	public Membership getMembershipByUserId(int userId);

	User registerOrEditUser(User user);

	User findByEmail(String email);
	
	Membership addMembership(Membership membership);

	public List<Like> getLikeByUserId(int userId);
	
	public List<Comments> getCommentByUserId(int userId);
	
	List<EnrolledSports> getUserEnrolledSports();
	
	List<EnrolledSports> getUserPendingBatches();
	
	List<EnrolledSports> getUserRejectedBatches();

}
