/**
 * 
 */
package com.cybage.controller;

import java.time.LocalDate;

/**
*@author: Sarang Raool
*@date: 17 Nov, 2021 4:20:28 PM
*@filename: ManagerController.java
*
*/

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
/**
 * @author SARANG
 *
 */
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.dao.BatchesRepository;
import com.cybage.dao.EnrolledSportsRepository;
import com.cybage.dao.PricingRepository;
import com.cybage.dao.SportsRepository;
import com.cybage.dao.UserRepository;
import com.cybage.exception.ResourceNotFoundException;
import com.cybage.model.Batches;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Pricing;
import com.cybage.model.Sports;
import com.cybage.model.User;

@RestController
@CrossOrigin("*")
@RequestMapping("/manager")
public class ManagerController {

	@Autowired
	private SportsRepository sportsRepository;
	@Autowired
	private BatchesRepository batchesRepository;
	@Autowired
	private PricingRepository PricingRepository;
	@Autowired
	private EnrolledSportsRepository EnrolledSportsRepository;
	@Autowired
	private UserRepository userRepository;
	
	private static final Logger LOGGER = Logger.getLogger(ManagerController.class.getName());

//-------------------------------- API'S FOR BATCHES----------------------------------------//

	// get all batches

	@GetMapping("/listbatches")
	public List<Batches> getAllbatches() {
		return batchesRepository.findAll();
	}

	// get batchs by sports ID

	@GetMapping("/getbatchbysport/{id}")
	public List<Batches> getBatchesBySportsId(@PathVariable Integer id) {
		return batchesRepository.findAllBySportsId(sportsRepository.findById(id).get());
	}

	// get batch by id

	@GetMapping("/batch/{id}")
	public ResponseEntity<Batches> getBatchesById(@PathVariable Integer id) {
		Batches batches = batchesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Batch not exist with id :" + id));
		return ResponseEntity.ok(batches);
	}

	// update batch by id

	@PutMapping("/updateBatch/{id}")
	public ResponseEntity<Batches> updateBatchesById(@PathVariable Integer id, @RequestBody Batches batchDetails) {
		Batches batches = batchesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Batch not exist with id :" + id));

		batches.setBatchName(batchDetails.getBatchName());
		batches.setCoachName(batchDetails.getCoachName());
		batches.setDays(batchDetails.getDays());
		batches.setIntake(batchDetails.getIntake());
		batches.setOfferValues(batchDetails.getOfferValues());

		Batches updatedbatches = batchesRepository.save(batches);
		return ResponseEntity.ok(updatedbatches);
	}

	// delete batch by id

	@DeleteMapping("/deletebatch/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteBatchesById(@PathVariable Integer id) {
		Batches batches = batchesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("batch not exist with id :" + id));

		batchesRepository.delete(batches);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

//-------------------------------- END batch apis----------------------------------------//

//-------------------------------- API FOR PRICING---------------------------------------//

	// get priceList

	@GetMapping("/getpricing")
	public List<Pricing> getAllprice() {
		return PricingRepository.findAll();
	}

	@GetMapping("/getpricebyId/{priceId}")
	public ResponseEntity getOfferById(@PathVariable int priceId) {
		Pricing pricing = PricingRepository.findById(priceId)
				.orElseThrow(() -> new ResourceNotFoundException("Offer not exist with id :" + priceId));
		return ResponseEntity.ok(pricing);
	}

	// get price by sports ID

	@GetMapping("/getpricebysport/{id}")
	public Pricing getPriceBySportsId(@PathVariable Integer id) {
		return PricingRepository.findPricingBySportsId(sportsRepository.findById(id).get());
	}

	@PostMapping("/addOffer")
	public Pricing addPricing(@RequestBody Pricing pricing) {

		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findUserByUserName(username);
		Sports sports = sportsRepository.findSportsByManagerId(user);
		pricing.setSportsId(sports);
		// pricing.setPricingTimeStamp(LocalDate.now()); using CreationTimeStamp
		return PricingRepository.save(pricing);
	}

	// update price by id

	@PutMapping("/updateprice/{id}")
	public ResponseEntity<Pricing> updatePriceById(@PathVariable Integer id, @RequestBody Pricing PriceDetails) {
		Pricing pricing = PricingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Pricing not exist with id :" + id));

		pricing.setMembersCharges(PriceDetails.getMembersCharges());
		pricing.setNonMemberCharges(PriceDetails.getNonMemberCharges());
		pricing.setPricingTimeStamp(PriceDetails.getPricingTimeStamp());

		Pricing updatedPrice = PricingRepository.save(pricing);
		return ResponseEntity.ok(updatedPrice);
	}

	// delete batch by id

	@DeleteMapping("/deleteprice/{id}")
	public ResponseEntity<Map<String, Boolean>> deletepriceById(@PathVariable Integer id) {
		Pricing pricing = PricingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("price not exist with id :" + id));

		PricingRepository.delete(pricing);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

//----------------------------- END ----------------------------------------------------//	

//-------------------------------- API FOR EnrollSports Approve and Rejection and list---------------------------------------//

	// API to get EnrollmentDetails
	@GetMapping("/getenrollmentlist/{sportsId}")
	public List<EnrolledSports> getEnrollment(@PathVariable int sportsId) {
		List<EnrolledSports> enrolledSport = EnrolledSportsRepository
				.findEnrolledSportsBySportsId(sportsRepository.findById(sportsId).get());
		return enrolledSport.stream().filter(e -> {
			return e.getUserId().getUserRole().name().equals("USER");
		}).collect(Collectors.toList());
	}

	// API to approve enrollment

	@GetMapping("/approve/{id}")
	public ResponseEntity<EnrolledSports> approveEnrolmentById(@PathVariable Integer id) {
		EnrolledSports enrolledSports = EnrolledSportsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("enrollment not exist with id :" + id));

		// UNCOMMENT LINE 163 IF YOU WANT TO PASS STATUS FROM FRONT END

		// enrolledSports.setEnrolledStatus(sportsDetails.getEnrolledStatus());

		// Directly pass status hardcoded from backend ;
		enrolledSports.setEnrolledStatus(1);

		EnrolledSports updatedenrollment = EnrolledSportsRepository.save(enrolledSports);
		return ResponseEntity.ok(updatedenrollment);
	}

	// API to reject enrollment
	@GetMapping("/reject/{id}")
	public ResponseEntity<EnrolledSports> rejectEnrolmentById(@PathVariable Integer id) {
		EnrolledSports enrolledSports = EnrolledSportsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("enrollment not exist with id :" + id));

		// UNCOMMENT LINE 163 IF YOU WANT TO PASS STATUS FROM FRONT END

		// enrolledSports.setEnrolledStatus(sportsDetails.getEnrolledStatus());

		// Directly pass status hardcoded from backend ;
		enrolledSports.setEnrolledStatus(2);

		EnrolledSports updatedenrollment = EnrolledSportsRepository.save(enrolledSports);
		return ResponseEntity.ok(updatedenrollment);
	}

//--------------------------------------------------------- END ----------------------------------------------------------------------//			

	// getting assigned sports for logged in manager
	@GetMapping("/assignedSport")
	public ResponseEntity<Sports> getAssignedSports() {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findUserByUserName(username);
		Sports sports = sportsRepository.findSportsByManagerId(user);
		if (sports != null) {
			return new ResponseEntity<Sports>(sports, HttpStatus.OK);
		} else {
			return new ResponseEntity<Sports>(HttpStatus.NOT_FOUND);
		}
	}

	// getALLrejected User,
	@GetMapping("/getAllRejectedUser")
	public ResponseEntity<List<EnrolledSports>> getAllRejectedUser() {
		List<EnrolledSports> enrolledSports = EnrolledSportsRepository.findAllByEnrolledStatus(2);
		if (enrolledSports.isEmpty()) {
			return new ResponseEntity<List<EnrolledSports>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<EnrolledSports>>(enrolledSports, HttpStatus.OK);
		}
	}

	// getAllPending users.
	@GetMapping("/getAllPendingUser")
	public ResponseEntity<List<EnrolledSports>> getAllPendingUser() {
		List<EnrolledSports> enrolledSports = EnrolledSportsRepository.findAllByEnrolledStatus(0);
		if (enrolledSports.isEmpty()) {
			return new ResponseEntity<List<EnrolledSports>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<EnrolledSports>>(enrolledSports, HttpStatus.OK);
		}
	}

	// getAllApproved users.
	@GetMapping("/getAllApprovedEnrUser")
	public ResponseEntity<List<EnrolledSports>> getAllApprovedUser() {

		List<EnrolledSports> enrolledSports = EnrolledSportsRepository.findAllByEnrolledStatus(1);

		if (enrolledSports.isEmpty()) {
			return new ResponseEntity<List<EnrolledSports>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<EnrolledSports>>(enrolledSports, HttpStatus.OK);
		}
	}
}
