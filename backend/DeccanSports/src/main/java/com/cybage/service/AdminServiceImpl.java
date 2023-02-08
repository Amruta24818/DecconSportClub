package com.cybage.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.dao.CommentRepository;
import com.cybage.dao.BatchesRepository;

import com.cybage.dao.EnrolledSportsRepository;
import com.cybage.dao.LikeRepository;
import com.cybage.dao.MembershipRepository;
import com.cybage.dao.PricingRepository;
import com.cybage.dao.SportsRepository;
import com.cybage.dao.UserRepository;

import com.cybage.model.Comments;

import com.cybage.model.Batches;

import com.cybage.model.EnrolledSports;
import com.cybage.model.Like;
import com.cybage.model.Membership;
import com.cybage.model.Pricing;
import com.cybage.model.Sports;
import com.cybage.model.User;
import com.cybage.model.UserRole;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EnrolledSportsRepository enrolledSportsRepo;

	@Autowired
	private MembershipRepository membershipRepo;

	@Autowired
	private SportsRepository sportsRepository;

	@Autowired

	private LikeRepository likeRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private PricingRepository pricingRepository;

	@Autowired
	private BatchesRepository batchesRespository;

	@Override
	public List<User> getAllManagers() {
		// List<User> userList = userService.getAllUsers();
		// return userList.stream().filter(u ->
		// u.getUserRole().name().equals("MANAGER")).collect(Collectors.toList());
		return userRepository.findByUserRole(UserRole.MANAGER);
	}

	@Override
	public List<EnrolledSports> getAllEnrolledSports() {
		return enrolledSportsRepo.findAll();
	}

	@Override
	public List<Membership> getAllMembershipDetails() {

		return membershipRepo.findAll();
	}

	@Override
	public List<Sports> getAllSports() {

		return sportsRepository.findAll();
	}

	@Override
	public List<User> getAllLockedUsers() {

		// List<User> userList = userService.getAllUsers();
		// return userList.stream().filter(u ->
		// u.getUserRole().name().equals("USER")).collect(Collectors.toList());
		return userRepository.findByUserRole(UserRole.USER).stream().filter(u -> {
			return u.getLoginAttempt() > 3;
		}).collect(Collectors.toList());

	}

	@Override
	public Sports addSports(Sports sports) {

		return sportsRepository.save(sports);
	}

	@Override
	public Sports editSports(Sports sports) {

		return sportsRepository.save(sports);
	}

	@Override
	public void deleteSportsById(int sportsId) {
		Sports sports = sportsRepository.findById(sportsId).get();
		Pricing pricing = pricingRepository.findPricingBySportsId(sports);
		if (pricing != null) {
			pricingRepository.delete(pricing);
		}

		User manager = userRepository.findUserBySportsName(sports.getSportsName());
		if (manager != null) {
			manager.setSportsName(null);
			userRepository.save(manager);
		}
		List<Batches> batchList = batchesRespository.findAllBySportsId(sports);
		batchList.forEach(b -> {
			batchesRespository.delete(b);
		});
		sportsRepository.deleteById(sportsId);

	}

	@Override
	public User addManager(User user) {
		user.setUserRole(UserRole.MANAGER);
		// user.setUserTimestamp(LocalDate.now()); used @CreationTimestamp
		user.setLoginAttempt(0);
		return userRepository.save(user);
	}

	@Override
	public User editManager(User user) {
		if (user.getSportsName().equals("")) {
			Sports sports = sportsRepository.findSportsByManagerId(user);
			if (sports != null) {
				System.out.println("Removing manager from sports");
				sports.setManagerId(null);
		 		sportsRepository.save(sports);
			}
		}
		return userRepository.save(user);
	}

	@Override
	public void deleteManagerById(int userId) {
		User user = userRepository.findById(userId).get(); // getting manager
		Sports sports = sportsRepository.findSportsByManagerId(user); // getting sport which is assigned to particular
																		// manager
		if (sports != null) {
			sports.setManagerId(null);
			sportsRepository.save(sports);
		}
		userRepository.deleteById(userId);
	}

	@Override
	public Sports getSportsById(int sportsId) {

		return sportsRepository.findById(sportsId).get();
	}

	@Override
	public List<Like> getLikes() {
		return likeRepository.findAll();
	}

	@Override
	public List<Comments> getComments() {
		return commentRepository.findAll();
	}

	@Override
	public List<User> getAllAvailableManagers() {

		return userRepository.findUserByUserRoleAndSportsNameOrSportsName(UserRole.MANAGER, null, "");

	}

	@Override
	public User getManagerById(int userId) {

		return userRepository.findById(userId).get();
	}

}
