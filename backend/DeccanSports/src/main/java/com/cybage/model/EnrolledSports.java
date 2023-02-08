package com.cybage.model;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

/**
*@author: Akhil Darge
*@date: 16-Nov-2021 12:41:37 am
*@filename: EnrolledSports.java
*
*/
@Entity
public class EnrolledSports {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer enrolledSportsId;
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "userId")
	private User userId;
	
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "sportsId")
	private Sports sportsId;
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "batchId")
	private Batches batchId;
	
	
	private Double fees;
	
	@CreationTimestamp
	private LocalDate enrolledTimestamp;
	
	private Integer enrolledStatus;
	
	private Integer paymentStatus;

	public EnrolledSports(User userId, Sports sportsId, Batches batchId, Double fees, LocalDate enrolledTimestamp,
			Integer enrolledStatus, Integer paymentStatus) {
		super();
		this.userId = userId;
		this.sportsId = sportsId;
		this.batchId = batchId;
		this.fees = fees;
		this.enrolledTimestamp = enrolledTimestamp;
		this.enrolledStatus = enrolledStatus;
		this.paymentStatus = paymentStatus;
	}

	public EnrolledSports(Integer enrolledSportsId, User userId, Sports sportsId, Batches batchId, Double fees,
			LocalDate enrolledTimestamp, Integer enrolledStatus, Integer paymentStatus) {
		super();
		this.enrolledSportsId = enrolledSportsId;
		this.userId = userId;
		this.sportsId = sportsId;
		this.batchId = batchId;
		this.fees = fees;
		this.enrolledTimestamp = enrolledTimestamp;
		this.enrolledStatus = enrolledStatus;
		this.paymentStatus = paymentStatus;
	}

	public EnrolledSports() {
		super();
	}

	public Integer getEnrolledSportsId() {
		return enrolledSportsId;
	}

	public void setEnrolledSportsId(Integer enrolledSportsId) {
		this.enrolledSportsId = enrolledSportsId;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Sports getSportsId() {
		return sportsId;
	}

	public void setSportsId(Sports sportsId) {
		this.sportsId = sportsId;
	}

	public Batches getBatchId() {
		return batchId;
	}

	public void setBatchId(Batches batchId) {
		this.batchId = batchId;
	}

	public Double getFees() {
		return fees;
	}

	public void setFees(Double fees) {
		this.fees = fees;
	}

	public LocalDate getEnrolledTimestamp() {
		return enrolledTimestamp;
	}

	public void setEnrolledTimestamp(LocalDate enrolledTimestamp) {
		this.enrolledTimestamp = enrolledTimestamp;
	}

	public Integer getEnrolledStatus() {
		return enrolledStatus;
	}

	public void setEnrolledStatus(Integer enrolledStatus) {
		this.enrolledStatus = enrolledStatus;
	}

	public Integer getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(Integer paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	@Override
	public String toString() {
		return "EnrolledSports [enrolledSportsId=" + enrolledSportsId + ", userId=" + userId + ", sportsId=" + sportsId
				+ ", batchId=" + batchId + ", fees=" + fees + ", enrolledTimestamp=" + enrolledTimestamp
				+ ", enrolledStatus=" + enrolledStatus + ", paymentStatus=" + paymentStatus + "]";
	}
	
	
	
}
