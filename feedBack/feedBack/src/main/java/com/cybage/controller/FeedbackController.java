package com.cybage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.model.Feedback;
import com.cybage.service.IFeedbackService;

@RestController
@RequestMapping("/feedback")
@CrossOrigin
public class FeedbackController {

	@Autowired
	private IFeedbackService feedbackService;
	
	@GetMapping("/getAllFeedback")
	public ResponseEntity<List<Feedback>> getAllFeedback() {
		return new ResponseEntity<>(feedbackService.getAllFeedback(), HttpStatus.OK);
	}
	
	@PostMapping("/addFeedback")
	public ResponseEntity<Boolean> addFeedBack(@RequestBody Feedback feedback)
	{
		Feedback feedback2 = feedbackService.addFeedback(feedback);
		if(feedback2 != null)
		{
			return new ResponseEntity<>(true,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(false,HttpStatus.NOT_ACCEPTABLE);
		}
	}
}
