package com.cybage.model;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

/**
*@author: Akhil Darge
*@date: 16-Nov-2021 12:34:40 am
*@filename: Like.java
*
*/

@Entity
@Table(name = "like_table")
public class Like {

	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Integer likeId;
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "batchId")
	private Batches batchId;
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "userId")
	private User userId;
	
	@Column
	@CreationTimestamp
	private LocalDate likeTimestamp;

	public Like(Batches batchId, User userId) {
		super();
		this.batchId = batchId;
		this.userId = userId;
	}

	public Like() {
		super();
	}

	public Batches getBatchId() {
		return batchId;
	}

	public void setBatchId(Batches batchId) {
		this.batchId = batchId;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Like [batchId=" + batchId + ", userId=" + userId + "]";
	}
	
	
}
