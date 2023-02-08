package com.cybage.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.dao.SportsRepository;
import com.cybage.dao.UserRepository;
import com.cybage.model.Batches;

import com.cybage.model.Sports;
import com.cybage.model.User;
import com.cybage.model.Comments;
import com.cybage.model.Like;

import com.cybage.service.IBatchService;

@RestController
@CrossOrigin("*")
@RequestMapping("/batches")
public class BatchesController {
	@Autowired
	private IBatchService batchService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SportsRepository sportsRepository;
	
	private static final Logger LOGGER = Logger.getLogger(BatchesController.class.getName());

	@GetMapping("/batchDetails/{id}")
	public ResponseEntity<List<Batches>> getManagerDetails(@PathVariable int id) {
		System.out.println(" sport id : " + id);
		return new ResponseEntity<>(batchService.getAllBatches(id), HttpStatus.OK);
	}

	@GetMapping("/batchById/{batchId}")
	public ResponseEntity<Batches> getBatch(@PathVariable int batchId) {
		return new ResponseEntity<Batches>(batchService.getBatchById(batchId), HttpStatus.OK);
	}

	
	@PostMapping("/addBatch")
	public ResponseEntity<Batches> addBatch(@RequestBody Batches batches) {
//		logger.info("In Add Sport : " + sport);
		
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findUserByUserName(username);
		Sports sports = sportsRepository.findSportsByManagerId(user);
		batches.setSportsId(sports);
		return new ResponseEntity<>(batchService.addBatch(batches), HttpStatus.OK);
	}


	@GetMapping("/likes")
	public ResponseEntity<List<Like>> getAllLikes() {
		System.out.println(" get all likes : ");
		return new ResponseEntity<>(batchService.getAllLikes(), HttpStatus.OK);
	}

	@GetMapping("/comments/{batchId}")
	public ResponseEntity<List<Comments>> getCommentsOfBatch(@PathVariable int batchId) {
		System.out.println(" fetch Comment ");
		return new ResponseEntity<>(batchService.getCommentsOfBatch(batchId), HttpStatus.OK);
	}

	@PostMapping("/comment")
	public ResponseEntity<Comments> addComment(@RequestBody Comments comment) {
		System.out.println(" addComment ");
		return new ResponseEntity<Comments>(batchService.addComment(comment), HttpStatus.OK);
	}

	@PostMapping("/like")
	public ResponseEntity<Like> like(@RequestBody Like like) {
		System.out.println(" like ");
		return new ResponseEntity<Like>(batchService.like(like), HttpStatus.OK);
	}

	@PostMapping("/unlike")
	public ResponseEntity<Like> unlike(@RequestBody Like like) {
		System.out.println(" unlike ");
		return new ResponseEntity<Like>(batchService.unlike(like), HttpStatus.OK);

	}
	
}
