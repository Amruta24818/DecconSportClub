package com.cybage.controller;

import com.cybage.dto.EnrolledUserDto;
import com.cybage.model.Batches;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Pricing;
import com.cybage.model.Sports;
import com.cybage.model.User;
import com.cybage.service.IBatchService;
import com.cybage.service.ISportsService;
import com.cybage.service.IUserService;
import com.sun.xml.bind.v2.TODO;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * @author: Hrishikesh Dalimbkar
 * @date: 17-11-2021 10:52 AM
 * @filename: SportsController.java
 */

@RestController
@CrossOrigin("*")
@RequestMapping("/sport")
public class SportsController {

	Logger logger = LogManager.getLogger(getClass().getName());

	@Autowired
	ISportsService sportsService;

	@Autowired
	private IUserService userService;

	@Autowired
	private IBatchService batchService;
	
	//private static final Logger LOGGER = Logger.getLogger(SportsController.class.getName());

	@GetMapping("/getAllSports")
	public ResponseEntity<List<Sports>> getAllSports() {
		System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
		logger.info("In List All Sports");
		return new ResponseEntity<>(sportsService.getAllSports(), HttpStatus.OK);
	}

	@GetMapping("/getAllIndoorSports")
	public ResponseEntity<List<Sports>> getAllIndoorSports() {
		System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
		logger.info("In List All Sports");
		return new ResponseEntity<>(sportsService.getAllIndoorSports(), HttpStatus.OK);
	}

	@GetMapping("/getAllOutdoorSports")
	public ResponseEntity<List<Sports>> getAllOutdoorSports() {
		System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
		logger.info("In List All Sports");
		return new ResponseEntity<>(sportsService.getAllOutdoorSports(), HttpStatus.OK);
	}

	@PostMapping("/addSport")
	public ResponseEntity<Sports> addSport(@RequestBody Sports sport) {
		logger.info("In Add Sport : " + sport);
		return new ResponseEntity<>(sportsService.addSport(sport), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Sports> getSportById(@PathVariable Integer id) {
		logger.info("In List Get Sport By Id : " + id);
		return new ResponseEntity<>(sportsService.getSportById(id), HttpStatus.OK);
	}

	@PostMapping("/updateSport")
	public ResponseEntity<String> updateSport(@RequestBody Sports sport) {
		logger.info("In Update Sport : " + sport);
		return new ResponseEntity<>("Sport Updated Successfully : " + sportsService.updateSport(sport), HttpStatus.OK);
	}

	@PostMapping("/deleteSport/{id}")
	public ResponseEntity<String> deleteSport(@PathVariable Integer id) {
		logger.info("In delete Sport : " + id);
		sportsService.deleteSport(id);
		return new ResponseEntity<>("Sport Deleted Successfully : " + id, HttpStatus.OK);
	}

	@GetMapping("/pricing/{sportsId}")
	public ResponseEntity<Pricing> getPricing(@PathVariable int sportsId) {
		return new ResponseEntity<Pricing>(sportsService.getPricingBySportsId(sportsId), HttpStatus.OK);
	}

	@GetMapping("/isEnrolled/{userId}/{batchId}")
	public ResponseEntity<EnrolledSports> isEnrolled(@PathVariable int userId, @PathVariable int batchId) {
		EnrolledSports enrolledSports = sportsService.getEnrolledSportsByUserIdAndBatchId(userId, batchId);
		if (enrolledSports != null) {
			return new ResponseEntity<EnrolledSports>(enrolledSports, HttpStatus.OK);
		} else {
			return new ResponseEntity<EnrolledSports>(HttpStatus.NOT_FOUND);
		}

	}

	@PostMapping("/enrollUser")
	public ResponseEntity<EnrolledSports> enrollUser(@RequestBody EnrolledUserDto enrollUser) {
		EnrolledSports enrolledSports = new EnrolledSports(userService.getUserById(enrollUser.getUserId()),
				sportsService.getSportById(enrollUser.getSportsId()),
				batchService.getBatchById(enrollUser.getBatchId()), enrollUser.getFees(), LocalDate.now(), 0, 0);
		EnrolledSports enrolledSports2 = sportsService.enrollUser(enrolledSports);
		if (enrolledSports2 != null) {
			return new ResponseEntity<EnrolledSports>(enrolledSports2, HttpStatus.OK);
		} else {
			return new ResponseEntity<EnrolledSports>(HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@GetMapping("/payFees/{enrollId}")
	public ResponseEntity<EnrolledSports> payFees(@PathVariable int enrollId) {
		System.out.println(enrollId);
		EnrolledSports enrolledSports = sportsService.addPayment(enrollId);
		if (enrolledSports != null) {
			return new ResponseEntity<EnrolledSports>(enrolledSports, HttpStatus.OK);
		} else {
			return new ResponseEntity<EnrolledSports>(HttpStatus.NOT_ACCEPTABLE);
		}
	}

}
