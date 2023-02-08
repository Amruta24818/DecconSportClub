package com.cybage.deccanSports;

import java.util.Base64;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication(scanBasePackages="com.cybage")
@EnableJpaRepositories(basePackages="com.cybage.dao")
@EntityScan(basePackages="com.cybage.model")

public class DeccanSportsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeccanSportsApplication.class, args);
		
		
	
		
		//String decodedString = new String(Base64.getDecoder().decode("QEJyYXZvMTIz"));
		// System.out.println(decodedString);
//		
//		 System.out.println(Base64.getEncoder().encodeToString("admin123".getBytes()));
//		 System.out.println(Base64.getEncoder().encodeToString("alpha123".getBytes()));
//		 System.out.println(Base64.getEncoder().encodeToString("bravo123".getBytes()));
//		 System.out.println(Base64.getEncoder().encodeToString("delta123".getBytes()));
//		 System.out.println(Base64.getEncoder().encodeToString("echo123".getBytes()));
	}

}
