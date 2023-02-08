package com.cybage.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Pricing {
/*
 * priceId
 * sportsId
 * membersCharges
 * nonMemberCharges
 * pricingTimeStamp
 */
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer priceId;
	
	@Column
	private Double membersCharges;
	
	@Column
	private Double nonMemberCharges;
	
	@Column
	//@DateTimeFormat(pattern = "yyyy-MM-dd")
	@CreationTimestamp
	private LocalDate pricingTimeStamp;
	
	@OneToOne
	@JoinColumn(name="sportsId")
	private Sports sportsId;

	public Pricing() {
		super();
	}

	public Pricing(Integer priceId, Double membersCharges, Double nonMemberCharges, LocalDate pricingTimeStamp,
			Sports sportsId) {
		super();
		this.priceId = priceId;
		this.membersCharges = membersCharges;
		this.nonMemberCharges = nonMemberCharges;
		this.pricingTimeStamp = pricingTimeStamp;
		this.sportsId = sportsId;
	}

	public Integer getPriceId() {
		return priceId;
	}

	public void setPriceId(Integer priceId) {
		this.priceId = priceId;
	}

	public Double getMembersCharges() {
		return membersCharges;
	}

	public void setMembersCharges(Double membersCharges) {
		this.membersCharges = membersCharges;
	}

	public Double getNonMemberCharges() {
		return nonMemberCharges;
	}

	public void setNonMemberCharges(Double nonMemberCharges) {
		this.nonMemberCharges = nonMemberCharges;
	}

	public LocalDate getPricingTimeStamp() {
		return pricingTimeStamp;
	}

	public void setPricingTimeStamp(LocalDate pricingTimeStamp) {
		this.pricingTimeStamp = pricingTimeStamp;
	}

	public Sports getSportsId() {
		return sportsId;
	}

	public void setSportsId(Sports sportsId) {
		this.sportsId = sportsId;
	}

	@Override
	public String toString() {
		return "Pricing [priceId=" + priceId + ", membersCharges=" + membersCharges + ", nonMemberCharges="
				+ nonMemberCharges + ", pricingTimeStamp=" + pricingTimeStamp + ", sportsId=" + sportsId + "]";
	}

	
	
	
}
