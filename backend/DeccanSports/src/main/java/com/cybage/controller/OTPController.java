package com.cybage.controller;





import org.springframework.http.ResponseEntity;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



/**
*@author: Sarang Raool
*@date: 22 Nov, 2021 6:57:21 PM
*@filename: OTPgeneration.java
*
*/

@RestController
@CrossOrigin("*")
@RequestMapping("/OTP")

public class OTPController {
	
	
	private String otp= ""+((int)(Math.random()*9000)+1000);
	
	
	
	@GetMapping("/getotp")
	public String send_otp() {
		return otp;
	}
	
	
}

