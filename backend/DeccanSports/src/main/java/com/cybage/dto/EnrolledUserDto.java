package com.cybage.dto;
/**
*@author: Akhil Darge
*@date: 21-Nov-2021 6:52:52 pm
*@filename: EnrolledUserDto.java
*
*/
public class EnrolledUserDto {
		
	private int userId;
	private int sportsId;
	private int batchId;
	private double fees;
	public EnrolledUserDto(int userId, int sportsId, int batchId, double fees) {
		super();
		this.userId = userId;
		this.sportsId = sportsId;
		this.batchId = batchId;
		this.fees = fees;
	}
	public EnrolledUserDto() {
		super();
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getSportsId() {
		return sportsId;
	}
	public void setSportsId(int sportsId) {
		this.sportsId = sportsId;
	}
	public int getBatchId() {
		return batchId;
	}
	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}
	public double getFees() {
		return fees;
	}
	public void setFees(double fees) {
		this.fees = fees;
	}
	@Override
	public String toString() {
		return "EnrolledUserDto [userId=" + userId + ", sportsId=" + sportsId + ", batchId=" + batchId + ", fees="
				+ fees + "]";
	}
	
	
	
}
