package com.cybage.service;

import java.time.LocalDate;

/**
*@author: Amruta Patil
*@date: 16-Nov-2021 2:53:42 pm
*@filename: AdminServiceImpl.java
*
*/

import java.util.List;

import javax.transaction.Transactional;
import javax.xml.stream.events.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.cybage.dao.CommentRepository;
import com.cybage.dao.EnrolledSportsRepository;
import com.cybage.dao.LikeRepository;
import com.cybage.dao.MembershipRepository;
import com.cybage.dao.UserRepository;
import com.cybage.model.Comments;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Like;
import com.cybage.model.Membership;
import com.cybage.model.User;
import com.cybage.model.UserRole;

@Service
@Transactional // optional
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EnrolledSportsRepository enrollRepository;

	@Autowired
	private MembershipRepository membershipRepo;

	@Autowired
	private LikeRepository likeRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Override
	public User getUserById(int userId) {
		System.out.println(userId);
		return userRepository.findById(userId).get();
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepository.findUserByUserName(username);
	}

	@Override
	public User changePwd(User user) {
		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUsers() {

		return userRepository.findByUserRole(UserRole.USER);
	}

	@Override
	public User addUser(User user) {
		user.setLoginAttempt(4);
		user.setUserRole(UserRole.USER);
		user.setUserTimestamp(LocalDate.now());
		return userRepository.save(user);
	}

	@Override
	public User editUser(User user) {

		return userRepository.save(user);
	}

	@Override
	public void deleteUserById(int userId) {
		userRepository.deleteById(userId);

	}

	@Override
	public User authenticateUser(String username, String password) {
		return userRepository.findUserByUserNameAndPassword(username, password);
	}

	@Override
	public List<EnrolledSports> enrolledSportsByUserId(int userId) {
		return enrollRepository.findEnrolledSportsByUserId(getUserById(userId));

	}

	@Override
	public Membership getMembershipByUserId(int userId) {
		return membershipRepo.findMembershipByUserId(getUserById(userId));
	}

	@Override
	public User registerOrEditUser(User user) {
		// persist the transient user pojo which consists of details of user
		return userRepository.save(user);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findUserByEmail(email);
	}

	@Override
	public Membership addMembership(Membership membership) {
		return membershipRepo.save(membership);
	}

	@Override
	public List<Like> getLikeByUserId(int userId) {
		return likeRepository.findByUserId(getUserById(userId));
	}

	@Override
	public List<Comments> getCommentByUserId(int userId) {
		return commentRepository.findByUserId(getUserById(userId));
	}

	@Override
	public List<EnrolledSports> getUserEnrolledSports() {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findUserByUserName(username);
		return enrollRepository.findByUserIdAndEnrolledStatus(user, 1);
	}

	@Override
	public List<EnrolledSports> getUserPendingBatches() {

		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findUserByUserName(username);
		return enrollRepository.findByUserIdAndEnrolledStatus(user, 0);
	}

	@Override
	public List<EnrolledSports> getUserRejectedBatches() {

		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findUserByUserName(username);
		return enrollRepository.findByUserIdAndEnrolledStatus(user, 2);
	}

}
