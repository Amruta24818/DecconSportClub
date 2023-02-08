package com.cybage.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;

import org.junit.Assert;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import com.cybage.dao.SportsRepository;
import com.cybage.dao.UserRepository;
import com.cybage.deccanSports.DeccanSportsApplication;
import com.cybage.model.Gender;
import com.cybage.model.Sports;
import com.cybage.model.SportsCategory;
import com.cybage.model.User;
import com.cybage.model.UserRole;

@RunWith(SpringRunner.class)
@ContextConfiguration
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes =DeccanSportsApplication.class)
class AdminServiceImplTest {
	
	
//	@Configuration
//	static class AdminServiceTestContextConfiguration {
//		@Bean
//		public IAdminService adminService() {
//			return new AdminServiceImpl();
//		}
//		
//		@Bean
//		public SportsRepository sportRepository() {
//			return Mockito.mock(SportsRepository.class);
//		}
//	}
	
	@Autowired
	private IAdminService adminService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SportsRepository sportRepository;
	
//	@Test
//	void testAddSports() {
//		User user = userRepository.findById(9).get();
//		Sports sport = new Sports(3,"Cricket", SportsCategory.INDOOR, " ", LocalDate.now(), user );
//		sportRepository.save(sport);
//		assertThat(sport.getSportsId()).isGreaterThan(0);
//	}

//	@Test
//	void testEditSports() {
//		Sports sport = sportRepository.findById(4).get();
//		sport.setSportsCategory(SportsCategory.OUTDOOR);
////		Sports sport = new Sports(4,"Cricket", SportsCategory.OUTDOOR, " ", LocalDate.now(), user );
//		sportRepository.save(sport);
//		assertThat(sport.getSportsId()).isGreaterThan(0);
//	}

//	@Test
//	void testDeleteSportsById() {
//		Sports sport = sportRepository.findById(3).get();
//		sportRepository.deleteById(sport.getSportsId());
//		Assert.assertNull(sportRepository.findById(3));
//	}

//	@Test
//	void testAddManager() {
//		IAdminService adminService = new AdminServiceImpl();
//		User user = new User(8, "Ravina", "ravina123", "Ravina Patil", "ravina@gmail.com", "9896652341",
//				UserRole.MANAGER, "pune", "O+", 26, Gender.FEMALE, LocalDate.now(),
//				"Boxing", 0);
////		assertEquals(26,adminService.addManager(user).getAge())
////		adminService.addManager(user);
//		userRepository.save(user);
//	assertThat(user.getUserId()).isGreaterThan(0);
//		System.out.println("Before all test cases");
//	}

//	@Test
//	void testEditManager() {
//		User user = userRepository.findById(9).get();
//		user.setAddress("Australia");
//		userRepository.save(user);
//		assertThat(user.getUserId()).isGreaterThan(0);
//	}

//	@Test
//	void testDeleteManagerById() {
//	   IAdminService adminService = new AdminServiceImpl();
//	   User user = userRepository.findById(6).get();
//	   userRepository.deleteById(user.getUserId());
//	  Assert.assertNull(userRepository.findById(6));
//	}

//	@Test
//	void testGetSportsById() {
////		IAdminService adminService = new AdminServiceImpl();
//		assertEquals("boxing",  sportRepository.findById(1).get().getSportsName());
//	}
//	
	
//	@Test
//	public void testGetSportsById() {
////		User user = new User(8, "Ravina", "ravina123", "Ravina Patil", "ravina@gmail.com", "9896652341",
////				UserRole.MANAGER, "pune", "O+", 26, Gender.FEMALE, LocalDate.now(),
////				"Boxing", 0);
////		Sports sport = new Sports
////				(1,"Boxing", SportsCategory.INDOOR, " ", LocalDate.now(), user );
////			assertEquals(sport, adminService.getSportsById(sport.getSportsId()));
//		Sports sport1 =  sportRepository.findById(1).get();
////			if(sport1!=null)
//					assertEquals("Boxing", sport1.getSportsName());
////			 Assertions.assertTrue(returnSport.isPresent(), "sport id was not found");
////		        Assertions.assertSame(returnSport.get(), sport.getSportsId(), "The sport Id returned was not the same as the mock");
//			}
	

//	@Test
//	void testGetManagerById() {
//		System.out.println(adminService);
//		User user = userRepository.findById(2).get();
//		if(user!=null)
//			assertEquals(30, user.getAge());
//	}

}


