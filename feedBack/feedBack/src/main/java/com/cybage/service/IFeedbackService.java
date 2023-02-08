package com.cybage.service;

import java.util.List;

import com.cybage.model.Feedback;

public interface IFeedbackService {

	public List<Feedback> getAllFeedback();
	
	public Feedback addFeedback(Feedback feedback);
}
