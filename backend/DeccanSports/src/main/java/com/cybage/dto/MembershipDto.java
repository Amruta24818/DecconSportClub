package com.cybage.dto;
/**
*@author: Akhil Darge
*@date: 20-Nov-2021 7:19:44 pm
*@filename: MembershipDto.java
*
*/
public class MembershipDto {
	
	private int userId;
	private String membershipType;
	private double membershipCost;
	public MembershipDto(int userId, String membershipType, double membershipCost) {
		super();
		this.userId = userId;
		this.membershipType = membershipType;
		this.membershipCost = membershipCost;
	}
	public MembershipDto() {
		super();
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getMembershipType() {
		return membershipType;
	}
	public void setMembershipType(String membershipType) {
		this.membershipType = membershipType;
	}
	public double getMembershipCost() {
		return membershipCost;
	}
	public void setMembershipCost(double membershipCost) {
		this.membershipCost = membershipCost;
	}
	@Override
	public String toString() {
		return "MembershipDto [userId=" + userId + ", membershipType=" + membershipType + ", membershipCost="
				+ membershipCost + "]";
	}
	
}
