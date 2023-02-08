package com.cybage.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

/**
*@author: Akhil Darge
*@date: 15-Nov-2021 5:57:19 pm
*@filename: User.java
*
*/

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	
	@Column(unique = true)
	@NonNull
	private String userName;
	
	@Column
	@NotNull
	private String password;
	
	@Column
	@NotBlank
	private String name;
	
	@Column(unique = true)
	@NotNull
	private String email;
	
	@Column
	private String mobile;
	
	@Enumerated(EnumType.STRING)
	private UserRole userRole;
	
	@Column
	private String address;
	
	@Column
	private String bloodGrp;
	
	@Column
	private Integer age;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Column
	@CreationTimestamp
	private LocalDate userTimestamp;
	
	@Column
	private String sportsName;
	
	@Column
	private Integer loginAttempt;
	
	@Column
	private String imagePath;
	
	
	
	@OneToMany(mappedBy = "userId",cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	private List<Like> likes =  new ArrayList<>();
	
	@OneToMany(mappedBy = "userId",cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	private List<Comments> comments =  new ArrayList<>();

	
	@OneToMany(mappedBy = "userId",cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	private List<EnrolledSports> enrolledSports = new ArrayList<>();

	

	public User(Integer userId, String userName, String password, @NotBlank String name, String email, String mobile,
			UserRole userRole, String address, String bloodGrp, Integer age, Gender gender, LocalDate userTimestamp,
			String sportsName, Integer loginAttempt) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.userRole = userRole;
		this.address = address;
		this.bloodGrp = bloodGrp;
		this.age = age;
		this.gender = gender;
		this.userTimestamp = userTimestamp;
		this.sportsName = sportsName;
		this.loginAttempt = loginAttempt;
	}

	
	public String getImagePath() {
		return imagePath;
	}


	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}


	public List<EnrolledSports> getEnrolledSports() {
		return enrolledSports;
	}


	public void setEnrolledSports(List<EnrolledSports> enrolledSports) {
		this.enrolledSports = enrolledSports;
	}


	public List<Comments> getComments() {
		return comments;
	}


	public void setComments(List<Comments> comments) {
		this.comments = comments;
	}


	public List<Like> getLikes() {
		return likes;
	}

	public void setLikes(List<Like> likes) {
		this.likes = likes;
	}

	public String getBloodGrp() {
		return bloodGrp;
	}

	public void setBloodGrp(String bloodGrp) {
		this.bloodGrp = bloodGrp;
	}

	public LocalDate getUserTimestamp() {
		return userTimestamp;
	}

	public void setUserTimestamp(LocalDate userTimestamp) {
		this.userTimestamp = userTimestamp;
	}

	public User() {
		super();
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	
	public String getSportsName() {
		return sportsName;
	}

	public void setSportsName(String sportsName) {
		this.sportsName = sportsName;
	}

	public Integer getLoginAttempt() {
		return loginAttempt;
	}

	public void setLoginAttempt(Integer loginAttempt) {
		this.loginAttempt = loginAttempt;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName + ", password=" + password + ", name=" + name
				+ ", email=" + email + ", mobile=" + mobile + ", userRole=" + userRole + ", address=" + address
				+ ", bloodGrp=" + bloodGrp + ", age=" + age + ", gender=" + gender + ", userTimestamp=" + userTimestamp
				+ ", sportsName=" + sportsName + ", loginAttempt=" + loginAttempt + "]";
	}

	
	
	
	
	
	
}
