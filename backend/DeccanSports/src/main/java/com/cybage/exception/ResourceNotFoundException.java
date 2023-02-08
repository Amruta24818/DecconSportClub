package com.cybage.exception;
/**
*@author: Sarang Raool
*@date: 18 Nov, 2021 12:37:53 PM
*@filename: exception.java
*
*/



import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundException(String message) {
		super(message);
	}
}

