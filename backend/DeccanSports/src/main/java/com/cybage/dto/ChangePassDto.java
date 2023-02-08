package com.cybage.dto;
/**
*@author: Akhil Darge
*@date: 23-Nov-2021 3:40:45 pm
*@filename: ChangePassDto.java
*
*/
public class ChangePassDto {

	private int userId;
	private String newPassword;
	public ChangePassDto(int userId, String newPassword) {
		super();
		this.userId = userId;
		this.newPassword = newPassword;
	}
	public ChangePassDto() {
		super();
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	@Override
	public String toString() {
		return "ChangePassDto [userId=" + userId + ", newPassword=" + newPassword + "]";
	}
	
	
	
}
