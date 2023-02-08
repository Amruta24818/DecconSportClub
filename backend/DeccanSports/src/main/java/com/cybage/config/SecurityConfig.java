package com.cybage.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cybage.filter.JwtFilter;
import com.cybage.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtFilter JwtFilter;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	public SecurityConfig() {
		System.out.println("\n------- CTOR: SECURITY CONFIG -------\n");
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		System.out.println("\n----------- SECURITY CONFIG - configure AuthenticationManagerBuilder --------------\n");
		// Tell authentication manager to look for credentials with the following
		// service
		// Use the userDetailsServiceImpl for custom user POJO
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		//
		System.out.println("\n----------- Building PasswordEncoder --------------\n");
		return NoOpPasswordEncoder.getInstance(); // -- deprecated
		// return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		// Return the authentication manager
		System.out.println("\n---------- Building AuthenticationManager bean -------------\n");
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("\n------- IN SECURITY CONFIG configure HttpSecurity -------\n");

		http.cors().and().csrf().disable().authorizeRequests()
				// this will remove the following urls from checking jwt token
				.antMatchers("/user/login", "/user/register").permitAll()
				//
				.antMatchers("/sport/**").permitAll()
				.antMatchers("/common/**").permitAll()

				.antMatchers("/batches/**").permitAll().antMatchers("/user/getotp/**", "/user/getUserToken/**")
				.permitAll().antMatchers("/user/getUserByEmail/**").permitAll().antMatchers("/user/addUser").permitAll()
				.antMatchers("/user/activateAccount/**").permitAll().antMatchers("/user/getUserByUserName/**")
				.permitAll().antMatchers("/user/forgotpsw/**", "/user/getotp/**", "/user/forgetOtp/**").permitAll()
				.antMatchers("/admin/uploadProfileImg/**").permitAll().anyRequest().authenticated().and()
				.exceptionHandling().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// adding spring security authentication before filter
		http.addFilterBefore(JwtFilter, UsernamePasswordAuthenticationFilter.class);

	}
}
