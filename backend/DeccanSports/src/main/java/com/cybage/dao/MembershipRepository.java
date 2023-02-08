package com.cybage.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Membership;
import com.cybage.model.User;

/**
*@author: Akhil Darge
*@date: 16-Nov-2021 9:54:03 pm
*@filename: MembershipRepository.java
*
*/
@Repository
public interface MembershipRepository extends JpaRepository<Membership,Integer>{

	 Membership findMembershipByUserId(User userid);
}
