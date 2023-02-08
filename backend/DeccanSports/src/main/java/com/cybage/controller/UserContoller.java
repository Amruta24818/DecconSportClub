package com.cybage.controller;

import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.cybage.dto.AuthenticateDTO;
import com.cybage.dto.ChangePassDto;
import com.cybage.dto.LoginRequest;
import com.cybage.dto.LoginResponse;
import com.cybage.dto.MembershipDto;
import com.cybage.exception.ResourceNotFoundException;
import com.cybage.model.Comments;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Like;
import com.cybage.model.Membership;
import com.cybage.model.MembershipType;
import com.cybage.model.User;
import com.cybage.service.IUserService;
import com.cybage.util.JwtUtil;

/**
 * @author: Amruta Patil
 * @date: 16-Nov-2021 3:01:56 pm
 * @filename: UserContoller.java
 *
 */
@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserContoller {

	@Autowired
	private IUserService userService;

	// Injecting dependencies by type
	@Autowired
	private JwtUtil jwtUtil; // Dependency for jwtToken

	@Autowired // injecting authentication manager - created in the filter
	private AuthenticationManager authenticationManager;

	@Autowired
	private JavaMailSender emailSender;

	@Value("${spring.mail.username}")
	private String host;
	
	@Value("${feedbackUrl}")
	private String feedbackUrl;

	private static final Logger LOGGER = Logger.getLogger(UserContoller.class.getName());

	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {

		user.setPassword(Base64.getEncoder().encodeToString(user.getPassword().getBytes()));
		System.out.println("in create new User" + user);
		// Sending a generic response which consists of status and data
		return new ResponseEntity<>(userService.registerOrEditUser(user), HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request) {
		System.out.println("in authenticate user: " + request);

		User user = userService.findByEmail(request.getEmail());
		Authentication authenticate = null;

		try {

			// creating user authentication token which will be passed to authentication
			// manager authenticate method
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					request.getEmail(), Base64.getEncoder().encodeToString(request.getPassword().getBytes()));

			// Here the user is not authenticated so here authenticated status will be
			// default false
			// authenticationToken = [..., Authenticated=false,....]
			authenticate = authenticationManager.authenticate(authenticationToken);

			// authenticate manager's -> authenticate method :
			// returns authentication instance with authenticated flag set to true.
			// otherwise, if the principal is not valid t it will throw ->
			// AuthenticationException

		} catch (Exception e) {
			if (user != null) {
				user.setLoginAttempt(user.getLoginAttempt() + 1);
				userService.editUser(user);
			}
			throw new UsernameNotFoundException("Invalid email or password");
		}

		int loginAttempt = user.getLoginAttempt();
		if (loginAttempt > 3) {

			return new ResponseEntity<>("Account has been locked", HttpStatus.LOCKED);

		} else if (loginAttempt != 0) {
			user.setLoginAttempt(0);
			userService.editUser(user);
		}

		// Now the authentication is successful so now call generateToken method while
		// sending response
		return new ResponseEntity<>(new LoginResponse("success", user, jwtUtil.generateToken(user.getUserName())),
				HttpStatus.OK);

	}

	// get token and user object
	@GetMapping("/getUserToken/{email}")
	public ResponseEntity<?> getUserToken(@PathVariable String email) {
		User user = userService.findByEmail(email);

		// Now the authentication is successful so now call generateToken method while
		// sending response
		return new ResponseEntity<>(new LoginResponse("success", user, jwtUtil.generateToken(user.getUserName())),
				HttpStatus.OK);
	}

	/// ------------------------- OTP method FOR LOGIN------------------//

	@GetMapping("/getotp/{email}")
	public ResponseEntity<String> sendOTP(@PathVariable String email) {

		return new ResponseEntity<String>(OTPEmail(email), HttpStatus.OK);
	}

	public String OTPEmail(String email) {
		System.out.println("Sending Email.....");
		String otp = "" + ((int) (Math.random() * 9000) * 100);
		System.out.println("OTP: " + otp);
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setFrom(host);
		mesg.setTo(email);
		mesg.setSubject("Welcome to Deccan Sports Club");
		mesg.setText("Hello,\nYour OTP for Login is  " + otp + "\n\n\nThanks and Regards,\nAdmin\nDeccan Sports Club");
		emailSender.send(mesg);

		System.out.println("success");
		return otp;
	}

	/// ----------------------- END------------------------------//

	// for forgetPassword
	@GetMapping("/forgetOtp/{email}")
	public ResponseEntity<String> forgetOtp(@PathVariable String email) {
		return new ResponseEntity<String>(OTPEmail(email), HttpStatus.OK);
	}

	@GetMapping("/getUser/{userId}")
	public ResponseEntity<User> getUserById(@PathVariable int userId) {
		User user = userService.getUserById(userId);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	// with token
	@GetMapping("/getUserByName/{username}")
	public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
		User user = userService.getUserByUsername(username);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	// Had to create different method to avoid dependency conflict
	// without token
	@GetMapping("/getUserByUserName/{username}")
	public ResponseEntity<User> getUserByUserName(@PathVariable String username) {
		User user = userService.getUserByUsername(username);
		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/getUserByEmail/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		User user = userService.findByEmail(email);
		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> list = userService.getAllUsers();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@PostMapping("/authenticateUser")
	public ResponseEntity<String> authenticateUser(@RequestBody AuthenticateDTO authenticateDto) {
		String username = authenticateDto.getUserName();
		String password = authenticateDto.getPassword();

		if (username != null || !username.equals("")) {
			User user = userService.getUserByUsername(username);
			if (user != null) {
				int loginAttempt = user.getLoginAttempt();
				if (loginAttempt > 3) {
					return new ResponseEntity<String>("Account has been locked", HttpStatus.LOCKED);
				} else {
					User user2 = userService.authenticateUser(username, password);
					if (user2 == null) {
						user.setLoginAttempt(user.getLoginAttempt() + 1);
						userService.editUser(user);
						return new ResponseEntity<String>("Invalid Login", HttpStatus.UNAUTHORIZED);
					} else {
						user.setLoginAttempt(0);
						userService.editUser(user);
						return new ResponseEntity<String>("Login Successful", HttpStatus.OK);
					}

				}
			} else {
				return new ResponseEntity<String>("Invalid Login", HttpStatus.UNAUTHORIZED);
			}
		} else {
			return new ResponseEntity<String>("Invalid Login", HttpStatus.UNAUTHORIZED);
		}
	}

	@PutMapping("/changePwd")
	public ResponseEntity<String> changePassword(@RequestBody ChangePassDto changePassDto) {
		User user = userService.getUserById(changePassDto.getUserId());

		user.setPassword(Base64.getEncoder().encodeToString(changePassDto.getNewPassword().getBytes()));
		user = userService.changePwd(user);
		if (user != null) {
			return new ResponseEntity<String>("Password changed succesfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("change password failed", HttpStatus.NOT_IMPLEMENTED);
		}
	}

	@PostMapping("/addUser")
	public ResponseEntity<?> addUser(@RequestBody User user) {
		System.out.println(user);
		user.setPassword(Base64.getEncoder().encodeToString(user.getPassword().getBytes()));
		User users = userService.addUser(user);
		if (users != null) {
			// needed to send activation link to user mail. Page for displaying message of
			// account activated and login.

			try {
				MimeMessage mimeMessage = emailSender.createMimeMessage();
				MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
				String htmlMsg = "Please click on ACTIVATE to activate your account.\n<a href='https://localhost:4200/temp-message/"
						+ user.getUserId() + "'> ACTIVATE</a>\n\nThanks and Regards,\nAdmin\nDeccan Sports Club";
				helper.setFrom(host);
				// mimeMessage.setContent(htmlMsg, "text/html"); /** Use this or below line **/
				helper.setText(htmlMsg, true); // Use this or above line.
				helper.setTo(user.getEmail());
				helper.setSubject("Welcome to Deccan Sports Club");
				// helper.setFrom("abc@gmail.com");
				emailSender.send(mimeMessage);
			} catch (Exception e) {
				e.printStackTrace();
			}

			// return new ResponseEntity<>(new LoginResponse("success", user,
			// jwtUtil.generateToken(user.getUserName())),
			// HttpStatus.OK);
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}

	}

	@PutMapping("/editUser")
	public ResponseEntity<User> editUser(@RequestBody User user) {
		User users = userService.editUser(user);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<String> deleteUserById(@PathVariable int userId) {
		userService.deleteUserById(userId);
		return new ResponseEntity<String>("User Deleted succesfully", HttpStatus.OK);

	}

	@GetMapping("/enrolledSports/{userId}")
	public ResponseEntity<List<EnrolledSports>> enrolledSports(@PathVariable int userId) {
		List<EnrolledSports> enrolledSports = userService.enrolledSportsByUserId(userId);
		if (enrolledSports.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(enrolledSports, HttpStatus.OK);
		}
	}

	@GetMapping("/membership/{userId}")
	public ResponseEntity<Membership> membershipDetails(@PathVariable int userId) {
		Membership membership = userService.getMembershipByUserId(userId);
		if (membership != null)
			return new ResponseEntity<>(membership, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PostMapping("/addMembership")
	public ResponseEntity<String> addMembership(@RequestBody MembershipDto membershipDto) {
		System.out.println("In method " + membershipDto.getUserId());
		User user = userService.getUserById(membershipDto.getUserId());
		Membership membership = userService.getMembershipByUserId(user.getUserId());
		if (membership != null) { // already present, Renew it

			if (membershipDto.getMembershipType().equals("YEARLY")) {
				membership.setEndDate(LocalDate.now().plusYears(1));
			} else if (membershipDto.getMembershipType().equals("MONTHLY")) {
				membership.setEndDate(LocalDate.now().plusMonths(1));
			} else if (membershipDto.getMembershipType().equals("QUATERLY")) {
				membership.setEndDate(LocalDate.now().plusMonths(3));
			}
			membership.setStartDate(LocalDate.now());
			membership.setCostPaid(membershipDto.getMembershipCost());
			membership.setMembershipType(MembershipType.valueOf(membershipDto.getMembershipType()));
			Membership renewMembership = userService.addMembership(membership);
			if (renewMembership != null) {
				return new ResponseEntity<String>("Membership Renewed", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Membership renew operation failed", HttpStatus.NOT_ACCEPTABLE);
			}

		} else { // first time, apply it

			Membership newMembership = null;
			if (membershipDto.getMembershipType().equals("YEARLY")) {
				newMembership = new Membership(MembershipType.YEARLY, LocalDate.now(), LocalDate.now().plusYears(1),
						membershipDto.getMembershipCost(), user);
			} else if (membershipDto.getMembershipType().equals("MONTHLY")) {
				newMembership = new Membership(MembershipType.MONTHLY, LocalDate.now(), LocalDate.now().plusMonths(1),
						membershipDto.getMembershipCost(), user);
			} else if (membershipDto.getMembershipType().equals("QUATERLY")) {
				newMembership = new Membership(MembershipType.QUATERLY, LocalDate.now(), LocalDate.now().plusMonths(3),
						membershipDto.getMembershipCost(), user);
			}
			Membership regMembership = userService.addMembership(newMembership);
			if (regMembership != null) {
				return new ResponseEntity<String>("Membership Added", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Membership addition failed", HttpStatus.NOT_ACCEPTABLE);
			}
		}

	}

	@GetMapping("/getLikeByUserId/{userId}")
	public ResponseEntity<List<Like>> getLikeByUserId(@PathVariable int userId) {
		System.out.println(userService.getLikeByUserId(userId));
		return new ResponseEntity<List<Like>>(userService.getLikeByUserId(userId), HttpStatus.OK);
	}

	@GetMapping("/getCommentByUserId/{userId}")
	public ResponseEntity<List<Comments>> getCommentByUserId(@PathVariable int userId) {
		System.out.println(userService.getCommentByUserId(userId));
		return new ResponseEntity<List<Comments>>(userService.getCommentByUserId(userId), HttpStatus.OK);
	}

	@GetMapping("/activateAccount/{userId}")
	public ResponseEntity<User> activateAccount(@PathVariable int userId) {
		User user = userService.getUserById(userId);
		user.setLoginAttempt(0);
		return new ResponseEntity<User>(userService.editUser(user), HttpStatus.OK);
	}

	// get enrolled sports for user
	@GetMapping("/getUserEnrolledSports")
	public ResponseEntity<List<EnrolledSports>> getUserEnrolledSports() {
		List<EnrolledSports> enrolledSports = userService.getUserEnrolledSports();
		if (enrolledSports.isEmpty()) {
			return new ResponseEntity<List<EnrolledSports>>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<List<EnrolledSports>>(enrolledSports, HttpStatus.OK);
		}
	}

	// get Pending batches for user
	@GetMapping("/getUserPendingBatches")
	public ResponseEntity<List<EnrolledSports>> getUserPendingBatches() {
		List<EnrolledSports> enrolledSports = userService.getUserPendingBatches();
		if (enrolledSports.isEmpty()) {
			return new ResponseEntity<List<EnrolledSports>>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<List<EnrolledSports>>(enrolledSports, HttpStatus.OK);
		}
	}

	// get rejected batches for user.
	@GetMapping("/getUserRejectedBatches")
	public ResponseEntity<List<EnrolledSports>> getUserRejectedBatches() {
		List<EnrolledSports> enrolledSports = userService.getUserRejectedBatches();
		if (enrolledSports.isEmpty()) {
			return new ResponseEntity<List<EnrolledSports>>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<List<EnrolledSports>>(enrolledSports, HttpStatus.OK);
		}
	}

	// ------------------------------------------- FORGET Password
	// -------------------------------------------------//

	@PutMapping("/forgotpsw/{email}") // Only send newPassword in DTO
	public ResponseEntity<User> forgotPsw(@PathVariable String email, @RequestBody ChangePassDto userPassword) {
		User user = userService.findByEmail(email);
		if (user != null) {

			user.setPassword(Base64.getEncoder().encodeToString(userPassword.getNewPassword().getBytes()));
			User updatedPassword = userService.editUser(user); // userRepository.save(user);
			return ResponseEntity.ok(updatedPassword);
		} else
			throw new ResourceNotFoundException("User not Exist with Email " + email);
	}
	// ----------------------------------------------- END
	// ------------------------------------------------------//

	@PostMapping("/addFeedback")
	public ResponseEntity<String> addFeedback(@RequestBody Object feedback) {
		String uri = "http://"+feedbackUrl+":7070/feedback/addFeedback"; 
		RestTemplate restTemplate = new RestTemplate();	
		Boolean result = restTemplate.postForObject(uri, feedback, Boolean.class);
		return new ResponseEntity<>("Feedback added successfully", HttpStatus.OK);
	}

}
