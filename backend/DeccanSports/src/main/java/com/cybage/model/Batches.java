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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
public class Batches {
	/*
	 * batchId, batchname, timing, days,coachname.batchTimestamp,
	 * sportsId,offervalues,intake
	 */
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer batchId;
	
	@Enumerated(EnumType.STRING)
	private BatchName batchName;
	
	@Column
	private String timings;
	
	@Column
	private String days;
	
	@Column 
	private String coachName;
	
	@Column
	@CreationTimestamp
	private LocalDate batchTimestamp;
	
	@Column
	private Integer intake;
	
	@Column
	private Double offerValues;
	
	@ManyToOne
	@JoinColumn(name="sportsId")
	private Sports sportsId;
	
	@OneToMany(mappedBy = "batchId", cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	private List<Like> likes;
	
	@OneToMany(mappedBy = "batchesId", cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	private List<Comments> comments;
	
	@OneToMany(mappedBy = "batchId",cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	private List<EnrolledSports> enrolledSports;

	public Batches(Integer batchId, BatchName batchName, String timings, String days, String coachName,
			LocalDate batchTimestamp, Integer intake, Double offerValues, Sports sportsId) {
		super();
		this.batchId = batchId;
		this.batchName = batchName;
		this.timings = timings;
		this.days = days;
		this.coachName = coachName;
		this.batchTimestamp = batchTimestamp;
		this.intake = intake;
		this.offerValues = offerValues;
		this.sportsId = sportsId;
	}

	

	public Batches(Integer batchId, BatchName batchName, String timings, String days, String coachName,
			LocalDate batchTimestamp, Integer intake, Double offerValues, Sports sportsId, List<Like> likes,
			List<Comments> comments, List<EnrolledSports> enrolledSports) {
		super();
		this.batchId = batchId;
		this.batchName = batchName;
		this.timings = timings;
		this.days = days;
		this.coachName = coachName;
		this.batchTimestamp = batchTimestamp;
		this.intake = intake;
		this.offerValues = offerValues;
		this.sportsId = sportsId;
		this.likes = likes;
		this.comments = comments;
		this.enrolledSports = enrolledSports;
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

	public Batches() {
		super();
	}

	public Integer getBatchId() {
		return batchId;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	public BatchName getBatchName() {
		return batchName;
	}

	public void setBatchName(BatchName batchName) {
		this.batchName = batchName;
	}

	public String getTimings() {
		return timings;
	}

	public void setTimings(String timings) {
		this.timings = timings;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public String getCoachName() {
		return coachName;
	}

	public void setCoachName(String coachName) {
		this.coachName = coachName;
	}

	public LocalDate getBatchTimestamp() {
		return batchTimestamp;
	}

	public void setBatchTimestamp(LocalDate batchTimestamp) {
		this.batchTimestamp = batchTimestamp;
	}

	public Integer getIntake() {
		return intake;
	}

	public void setIntake(Integer intake) {
		this.intake = intake;
	}

	public Double getOfferValues() {
		return offerValues;
	}

	public void setOfferValues(Double offerValues) {
		this.offerValues = offerValues;
	}

	public Sports getSportsId() {
		return sportsId;
	}

	public void setSportsId(Sports sportsId) {
		this.sportsId = sportsId;
	}

	@Override
	public String toString() {
		return "Batches [batchId=" + batchId + ", batchName=" + batchName + ", timings=" + timings + ", days=" + days
				+ ", coachName=" + coachName + ", batchTimestamp=" + batchTimestamp + ", intake=" + intake
				+ ", offerValues=" + offerValues + ", sportsId=" + sportsId + "]";
	}
	

}
