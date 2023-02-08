package com.cybage.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.dao.BatchesRepository;
import com.cybage.dao.PricingRepository;
import com.cybage.dao.SportsRepository;
import com.cybage.model.Batches;
import com.cybage.model.Pricing;

@RestController
@CrossOrigin("*")
@RequestMapping("/common")
public class CommonController {

	@Autowired
	private PricingRepository PricingRepository;

	@Autowired
	private SportsRepository sportsRepository;
	
	@Autowired
	private BatchesRepository batchesRepository;

	private static final Logger LOGGER = Logger.getLogger(CommonController.class.getName());
	
	
	// get price by sports ID
	@GetMapping("/getpricebysport/{id}")
	public Pricing getPriceBySportsId(@PathVariable Integer id) {
		return PricingRepository.findPricingBySportsId(sportsRepository.findById(id).get());
	}
	
	// get batchs by sports ID

		@GetMapping("/getbatchbysport/{id}")
		public List<Batches> getBatchesBySportsId(@PathVariable Integer id) {
			return batchesRepository.findAllBySportsId(sportsRepository.findById(id).get());
		}
}
