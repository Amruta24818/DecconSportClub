package com.cybage.model;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;

/**
 * @author: Akhil Darge
 * @date: 16-Nov-2021 12:38:55 am
 * @filename: Comments.java
 *
 */
@Entity
public class Comments {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer commentId;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "batchId")
	private Batches batchesId;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "userId")
	private User userId;

	private String comments;

	@Column
	@CreationTimestamp
//	private LocalDateTime commentTimestamp = ;
	private Timestamp commentTimestamp = new Timestamp(new Date().getTime());

	public Comments(Batches batchesId, User userId, String comments) {
		super();
		this.batchesId = batchesId;
		this.userId = userId;
		this.comments = comments;
	}

	public Comments() {
		super();
	}

	public Batches getBatchesId() {
		return batchesId;
	}

	public void setBatchesId(Batches batchesId) {
		this.batchesId = batchesId;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getCommentTimestamp() {
		return commentTimestamp.toString();
	}

	public void setCommentTimestamp(Timestamp commentTimestamp) {
		this.commentTimestamp = new Timestamp(new Date().getTime());
	}

	@Override
	public String toString() {
		return "Comments [batchesId=" + batchesId + ", userId=" + userId + ", comments=" + comments + "]";
	}

}
