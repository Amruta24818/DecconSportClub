package com.cybage.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
*@author: Akhil Darge
*@date: 16-Nov-2021 12:27:08 am
*@filename: Membership.java
*
*/



@Entity
public class Membership  {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer membershipId;
	
	@Enumerated(EnumType.STRING)
	private MembershipType membershipType;
	
	private LocalDate startDate;
	
	private LocalDate endDate;
	
	private Double costPaid;
	
	@OneToOne
	@JoinColumn(name = "userId")
	private User userId;
	
	public Membership(Integer membershipId, MembershipType membershipType, LocalDate startDate, LocalDate endDate,
			Double costPaid, User userId) {
		super();
		this.membershipId = membershipId;
		this.membershipType = membershipType;
		this.startDate = startDate;
		this.endDate = endDate;
		this.costPaid = costPaid;
		this.userId = userId;
	}

	public Membership(MembershipType membershipType, LocalDate startDate, LocalDate endDate, Double costPaid,
			User userId) {
		super();
		this.membershipType = membershipType;
		this.startDate = startDate;
		this.endDate = endDate;
		this.costPaid = costPaid;
		this.userId = userId;
	}

	public Membership() {
		super();
	}


	public Integer getMembershipId() {
		return membershipId;
	}

	public void setMembershipId(Integer membershipId) {
		this.membershipId = membershipId;
	}

	public MembershipType getMembershipType() {
		return membershipType;
	}

	public void setMembershipType(MembershipType membershipType) {
		this.membershipType = membershipType;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public Double getCostPaid() {
		return costPaid;
	}

	public void setCostPaid(Double costPaid) {
		this.costPaid = costPaid;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Membership [membershipId=" + membershipId + ", membershipType=" + membershipType + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", costPaid=" + costPaid + ", userId=" + userId + "]";
	}
	
	
	
	
	
}
