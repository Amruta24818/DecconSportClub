package com.cybage.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.lang.NonNull;



@Entity
public class Feedback {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	
	@Column
	
	private String userName;
	
	@Column
	
	private String name;
	
	@Column
	private String address;
	
	@Enumerated(EnumType.STRING)

	private Rating rating;

	@Column
	
	private String message;
	
	public Feedback() {
	}

	public Feedback(Integer userId, String userName, @NotBlank String name,  String address, Rating rating,
			String message) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.name = name;
		this.address = address;
		this.rating = rating;
		this.message = message;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Rating getRating() {
		return rating;
	}

	public void setRating(Rating rating) {
		this.rating = rating;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "Feedback [userId=" + userId + ", userName=" + userName + ", name=" + name 
				+ ", address=" + address + ", rating=" + rating + ", message=" + message + "]";
	}
	
	
}
