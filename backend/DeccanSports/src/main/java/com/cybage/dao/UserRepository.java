package com.cybage.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.User;
import com.cybage.model.UserRole;

/**
 * @author: Akhil Darge
 * @date: 16-Nov-2021 2:33:53 pm
 * @filename: AdminRepository.java
 *
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	User findUserByUserName(String userName);

	User findUserByUserNameAndPassword(String userName, String password);

	List<User> findByUserRole(UserRole userRole);

	User findUserByEmail(String userName);

	User findByEmail(String email);
	
	List<User> findUserByUserRoleAndSportsNameOrSportsName(UserRole userRole,String sportsName,String sportsN);
	
	User findUserBySportsName(String sportsName);
}
