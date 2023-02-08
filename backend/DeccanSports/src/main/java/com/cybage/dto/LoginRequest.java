package com.cybage.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class LoginRequest {

	@Autowired
	PasswordEncoder encoder;

	private String email, password;

	public LoginRequest() {

	}

	public LoginRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		System.out.println(password);
//		this.password = encoder.encode(password);

		this.password = password;
		System.out.println(this.password);
	}

	@Override
	public String toString() {
		return "LoginRequest [email=" + email + ", password=" + password + "]";
	}

}
