package com.cybage.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
*@author: Akhil Darge
*@date: 15-Nov-2021 6:01:32 pm
*@filename: BaseEntity.java
*
*/
@MappedSuperclass
public class BaseEntity {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	
}
