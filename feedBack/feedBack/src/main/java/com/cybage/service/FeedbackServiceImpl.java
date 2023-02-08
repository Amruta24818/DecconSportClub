package com.cybage.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.dao.FeedbackRepository;
import com.cybage.model.Feedback;

@Service
@Transactional
public class FeedbackServiceImpl implements IFeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Override
	public List<Feedback> getAllFeedback() {
		return feedbackRepository.findAll();
	}

	@Override
	public Feedback addFeedback(Feedback feedback) {
		return feedbackRepository.save(feedback);
	}

}
