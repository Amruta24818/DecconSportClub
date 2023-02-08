package com.cybage.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Sports {
/*
 * sportsId
 * sportsNam
 * sportsCategory
 * imagePath
 * sportsTimestamp
 * managerId
 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer sportsId;
	
	@Column
	@NonNull
	private String sportsName;
	
	@Enumerated(EnumType.STRING)
	private SportsCategory sportsCategory;
	
	@Column
	private String imagePath;
	
	@Column
	@CreationTimestamp
	private LocalDate sportsTimestamp;
	
	@OneToOne (cascade = CascadeType.PERSIST)  /// if there is exception then add this(cascade = CascadeType.MERGE)
	@JoinColumn(name="managerId",unique = true)
	private User managerId;

	@OneToMany(mappedBy = "sportsId",cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	private List<EnrolledSports> enrolledSports;
	

	public Sports(Integer sportsId, String sportsName, SportsCategory sportsCategory, String imagePath,
			LocalDate sportsTimestamp, User managerId) {
		super();
		this.sportsId = sportsId;
		this.sportsName = sportsName;
		this.sportsCategory = sportsCategory;
		this.imagePath = imagePath;
		this.sportsTimestamp = sportsTimestamp;
		this.managerId = managerId;
	}

	public Sports(String sportsName, SportsCategory sportsCategory, LocalDate sportsTimestamp, User managerId) {
		super();
		this.sportsName = sportsName;
		this.sportsCategory = sportsCategory;
		this.sportsTimestamp = sportsTimestamp;
		this.managerId = managerId;
	}
	

	public Sports() {
		super();
	}

	public List<EnrolledSports> getEnrolledSports() {
		return enrolledSports;
	}

	public void setEnrolledSports(List<EnrolledSports> enrolledSports) {
		this.enrolledSports = enrolledSports;
	}

	public Integer getSportsId() {
		return sportsId;
	}

	public void setSportsId(Integer sportsId) {
		this.sportsId = sportsId;
	}

	public String getSportsName() {
		return sportsName;
	}

	public void setSportsName(String sportsName) {
		this.sportsName = sportsName;
	}

	public SportsCategory getSportsCategory() {
		return sportsCategory;
	}

	public void setSportsCategory(SportsCategory sportsCategory) {
		this.sportsCategory = sportsCategory;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public LocalDate getSportsTimestamp() {
		return sportsTimestamp;
	}

	public void setSportsTimestamp(LocalDate sportsTimestamp) {
		this.sportsTimestamp = sportsTimestamp;
	}
	
	public User getManagerId() {
		return managerId;
	}

	public void setManagerId(User managerId) {
		this.managerId = managerId;
	}

	@Override
	public String toString() {
		return "Sports [sportsId=" + sportsId + ", sportsName=" + sportsName + ", sportsCategory=" + sportsCategory
				+ ", imagePath=" + imagePath + ", sportsTimestamp=" + sportsTimestamp + ", managerId=" + managerId
				+ "]";
	}

	
	
}
