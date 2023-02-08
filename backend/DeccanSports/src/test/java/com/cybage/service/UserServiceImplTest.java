package com.cybage.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;
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

import com.cybage.dao.MembershipRepository;
import com.cybage.dao.UserRepository;
import com.cybage.deccanSports.DeccanSportsApplication;
import com.cybage.model.Gender;
import com.cybage.model.Membership;
import com.cybage.model.MembershipType;
import com.cybage.model.User;
import com.cybage.model.UserRole;

@RunWith(SpringRunner.class)
@ContextConfiguration
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes =DeccanSportsApplication.class)
public class UserServiceImplTest {
	IUserService userService ;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MembershipRepository membershipRepository;
	
	public UserServiceImplTest() {
		this.userService = new UserServiceImpl();
	}

//	@Test
//	public void testGetUserById() {
//
//		assertEquals(27, userRepository.findById(3).get().getAge());
//		
//	}
//	
//	@Test
//	public void testGetUserByName() {		
//		assertEquals(3 , userRepository.findUserByUserName("amruta").getUserId());
//	}
	
//	@Test
//	public void testChangePwd() {
//		User user = userRepository.findById(9).get();
//		user.setPassword("ravina");
//		userRepository.save(user);
//		assertThat(user.getUserId()).isGreaterThan(0);
//	}
	
//	@Test
//	public void addUser() {
//		User user = new User(10, "Tejas", "Tejas123", "Tejas Patil", "tejas@gmail.com", "98966556479",
//				UserRole.USER, "Ichalkaraji", "A+", 21, Gender.MALE, LocalDate.now(),
//				"Boxing", 0);
//		userRepository.save(user);
//		assertThat(user.getUserId()).isGreaterThan(0);
//	}
	
//	@Test
//	public void editUser() {
//		User user = userRepository.findById(12).get();
//		user.setSportsName("Badmintan");
//		userRepository.save(user);
//		assertThat(user.getUserId()).isGreaterThan(0);
//	}
	
//	@Test
//	public void deleteUserById() {
//		userRepository.deleteById(12);
//		Assert.assertNull(userRepository.findById(12).get());
//	}
	
//	@Test
//	public void TestAuthenticateUser() {
//		
////		User user = userRepository.findUserByUserNameAndPassword("Ravina", "ravina");
//		assertEquals(9,userRepository.findUserByUserNameAndPassword("Ravina", "ravina").getUserId());
//	}
	
//	@Test
//	public void TestFindByEmail() {
//		
//		assertEquals(5, userRepository.findByEmail("delta@gmail.com").getUserId());
//	}
	
//	@Test
//	public void TestAddMembership() {
//		User user = userRepository.findById(9).get();
//		Membership membership = new Membership(2, MembershipType.MONTHLY, LocalDate.now(),  LocalDate.now(),8000.00, user);
//		membershipRepository.save(membership);
//	}
	
}
