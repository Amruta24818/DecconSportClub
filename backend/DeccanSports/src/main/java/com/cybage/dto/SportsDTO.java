package com.cybage.dto;
/**
*@author: Akhil Darge
*@date: 18-Nov-2021 12:00:00 pm
*@filename: SportsDTO.java
*
*/
public class SportsDTO {
	
	private int sportsId;
	private String sportsName;
	private String sportsCategory;
	private int managerId;
	public SportsDTO(int sportsId, String sportsName, String sportsCategory, int managerId) {
		super();
		this.sportsId = sportsId;
		this.sportsName = sportsName;
		this.sportsCategory = sportsCategory;
		this.managerId = managerId;
	}
	
	
	public int getSportsId() {
		return sportsId;
	}


	public void setSportsId(int sportsId) {
		this.sportsId = sportsId;
	}


	public SportsDTO() {
		super();
	}
	public String getSportsName() {
		return sportsName;
	}
	public void setSportsName(String sportsName) {
		this.sportsName = sportsName;
	}
	public String getSportsCategory() {
		return sportsCategory;
	}
	public void setSportsCategory(String sportsCategory) {
		this.sportsCategory = sportsCategory;
	}
	public int getManagerId() {
		return managerId;
	}
	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}


	@Override
	public String toString() {
		return "SportsDTO [sportsId=" + sportsId + ", sportsName=" + sportsName + ", sportsCategory=" + sportsCategory
				+ ", managerId=" + managerId + "]";
	}
	
	
	
}
