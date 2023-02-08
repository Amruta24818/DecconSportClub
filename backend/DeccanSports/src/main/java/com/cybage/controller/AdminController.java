package com.cybage.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.time.LocalDate;

import java.util.Base64;
import java.util.ArrayList;
import java.util.Arrays;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.transport.CredentialsProvider;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.cybage.dto.SportsDTO;
import com.cybage.model.Comments;
import com.cybage.model.EnrolledSports;
import com.cybage.model.Like;
import com.cybage.model.Membership;
import com.cybage.model.Sports;
import com.cybage.model.SportsCategory;
import com.cybage.model.User;
import com.cybage.model.UserRole;
import com.cybage.service.IAdminService;
import com.cybage.service.ISportsService;
import com.cybage.service.IUserService;
import com.cybage.service.SportsServiceImpl;

/**
 * @author: Akhil Darge
 * @date: 16-Nov-2021 8:41:57 pm
 * @filename: AdminController.java
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private IAdminService adminService;

	@Autowired
	private IUserService userService;
	
	@Autowired 
	private ISportsService sportsService;

	@Autowired
	private JavaMailSender emailSender;
	
	@Value("${spring.mail.username}")
	private String host;

	@Value("${gitUserName}")
	private String userName;
	@Value("${gitPassword}")
	private String password;
	@Value("${gitUrl}")
	private String gitUrl;
	@Value("${uploadDir}")
	private String uploadFolder;
	
	private static final Logger LOGGER = Logger.getLogger(AdminController.class.getName());

	@GetMapping("/managerDetails")
	public ResponseEntity<List<User>> getManagerDetails() {
		return new ResponseEntity<>(adminService.getAllManagers(), HttpStatus.OK);
	}

	@GetMapping("/userEnrolled")
	public ResponseEntity<List<EnrolledSports>> getEnrolledUsers() {
		return new ResponseEntity<List<EnrolledSports>>(adminService.getAllEnrolledSports(), HttpStatus.OK);
	}

	@GetMapping("/membershipDetails")
	public ResponseEntity<List<Membership>> getMembershipDetails() {
		return new ResponseEntity<List<Membership>>(adminService.getAllMembershipDetails(), HttpStatus.OK);
	}

	@GetMapping("/sportsDetails")
	public ResponseEntity<List<Sports>> getAllSportsDetails() {
		return new ResponseEntity<List<Sports>>(adminService.getAllSports(), HttpStatus.OK);
	}

	@GetMapping("/userDetails")
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> userList = userService.getAllUsers();
		if (!userList.isEmpty()) {
			return new ResponseEntity<>(userList, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new ArrayList<User>(),HttpStatus.OK);
		}
	}

	@PostMapping("/addManager")
	public ResponseEntity<User> addManager(@Valid @RequestBody User user) {
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setFrom(host);
		mesg.setTo(user.getEmail());
		mesg.setSubject("Welcome to Deccan Sports Club");
		mesg.setText("Hello " + user.getName()
				+ ",\n\nYour login credentials are given below: \n\nlogin Id is your email\nusername: "
				+ user.getUserName() + "\npassword: " + user.getPassword()
				+ "\n\nPlease try to login with your email and password.\nYou can check your personal details by going through your profile page in dashboard.\n\nIf there are any incorrect details, please let us know.\n\n\nThanks and Regards,\nAdmin\nDeccan Sports Club");
		emailSender.send(mesg);
		user.setPassword(Base64.getEncoder().encodeToString(user.getPassword().getBytes()));
		return new ResponseEntity<User>(adminService.addManager(user), HttpStatus.ACCEPTED);
	}

	@PutMapping("/editManager")
	public ResponseEntity<User> editManager(@Valid @RequestBody User user) {
		user.setUserRole(UserRole.MANAGER);
		
		if(user.getSportsName()!=null || user.getSportsName().equals("")) {
			Sports sports = sportsService.getSportsBySportsName(user.getSportsName());
			if(sports!=null) {
				sports.setManagerId(user);
				sportsService.addSport(sports);
			}
		}
		
		System.out.println(user);
		return new ResponseEntity<User>(adminService.editManager(user), HttpStatus.ACCEPTED);
	}

	@PutMapping("/editSport")
	public ResponseEntity<Sports> editSport(@Valid @RequestBody SportsDTO sportsDto) {
		System.out.println(sportsDto);
		Sports sports = adminService.getSportsById(sportsDto.getSportsId());
		sports.setSportsName(sportsDto.getSportsName());
		sports.setSportsCategory(SportsCategory.valueOf(sportsDto.getSportsCategory()));
		User user = userService.getUserById(sportsDto.getManagerId());
		user.setSportsName(sportsDto.getSportsName());
		sports.setManagerId(userService.editUser(user));
		return new ResponseEntity<Sports>(adminService.editSports(sports), HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/deleteManager/{userId}")
	public ResponseEntity<String> deleteManager(@PathVariable int userId) {
		adminService.deleteManagerById(userId);
		return new ResponseEntity<String>("Manager Deleted successfully", HttpStatus.OK);
	}

	@DeleteMapping("/deleteSport/{sportsId}")
	public ResponseEntity<String> deleteSport(@PathVariable int sportsId) {
		adminService.deleteSportsById(sportsId);
		return new ResponseEntity<String>("Sports Deleted successfully", HttpStatus.OK);
	}

	@GetMapping("/lockUnlock/{userId}")
	public ResponseEntity<String> lockUnlock(@PathVariable int userId) {
		User user = userService.getUserById(userId);
		int loginAttempt = user.getLoginAttempt();
		if (loginAttempt > 3) {
			user.setLoginAttempt(0);
			userService.editUser(user);
			return new ResponseEntity<String>("Account Unlocked", HttpStatus.OK);
		} else {
			user.setLoginAttempt(4);
			userService.editUser(user);
			return new ResponseEntity<String>("Account Locked", HttpStatus.OK);
		}

	}

//Uploading image on cloud with JGIT technology
	@PostMapping("/upload/{sportsId}")
	public ResponseEntity<String> uploadFile(final @RequestParam("file") MultipartFile file, HttpServletRequest request,
			@PathVariable int sportsId) {
		// STAGE:0 Initializing stage
		String uploadDirectory = request.getServletContext().getRealPath(uploadFolder);
		String message = "";
		try {
			// getting sports to attach image to it
			Sports sports = adminService.getSportsById(sportsId);
			// storing image in this directory
			System.out.println("uploadDirectory: " + uploadDirectory);
			// STAGE:1 Connecting stage
			// cloning git repository in specified directory
			try (Git git = Git.cloneRepository().setURI(gitUrl).setDirectory(new File(uploadDirectory)).call()) {
				// storing sports image file name
				String fileName = file.getOriginalFilename();
				String filePath = Paths.get(uploadDirectory, fileName).toString();
				sports.setImagePath("https://raw.githubusercontent.com/akhildarge/ImageStore/master/" + fileName);
				// checking if file is valid
				if (fileName == null || fileName.contains("..")) {
					message = "Sorry! Filename contains invalid path sequence \\\" + fileName "
							+ file.getOriginalFilename() + "!";
					return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
				}
				// STAGE:2 Executing stage
				try {
					// creating directory from provided path
					File dir = new File(uploadDirectory);
					if (!dir.exists()) {
						System.out.println("Folder Created");
						dir.mkdirs();
					}
					// Store the image file in created directory
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
					stream.write(file.getBytes());
					stream.close();
					// adding filename to respective sports
					adminService.editSports(sports);
				} catch (Exception e) {
					System.out.println("in catch");
					e.printStackTrace();
				}
				// staging all changes of local repository
				git.add().addFilepattern(fileName).call();
				// commiting all changes
				git.commit().setMessage("Exec commit").call();
				// Providing credentials for git repository
				CredentialsProvider cp = new UsernamePasswordCredentialsProvider(userName, password);
				// pushing all changes on master to remote repository
				git.push().setCredentialsProvider(cp).setRemote("origin").add("master").call();

			} catch (Exception e) {
				System.out.println("in catch");
				e.printStackTrace();
			}
			// STAGE:3 Wipe out stage (No trace to be found)

			// Creating the File object
			File file1 = new File(uploadDirectory);
			// removing trace of folder on local machine
			deleteFolder(file1);
			System.out.println("Files deleted........");
			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

//Burning evidence method
	static void deleteFolder(File file) {
		// deleting all files before deleting directory
		for (File subFile : file.listFiles()) {
			if (subFile.isDirectory()) {
				// complete wipe out
				deleteFolder(subFile);
			} else {
				subFile.delete();
			}
		}
		file.delete();
	}

	@PostMapping("/addSports")
	public ResponseEntity<Sports> addSports(@RequestBody SportsDTO sportsDto) {

		System.out.println(sportsDto);
		User manager = null;
		if (sportsDto.getManagerId() > 0) {
			manager = userService.getUserById(sportsDto.getManagerId());
			manager.setSportsName(sportsDto.getSportsName());
			manager = userService.editUser(manager);
		}
		Sports sports = new Sports(sportsDto.getSportsName(), SportsCategory.valueOf(sportsDto.getSportsCategory()),
				LocalDate.now(), manager);
		Sports sports2 = adminService.addSports(sports);
		if (sports2 != null)
			return new ResponseEntity<Sports>(sports2, HttpStatus.OK);
		else
			return new ResponseEntity<Sports>(HttpStatus.NOT_IMPLEMENTED);

	}

	@GetMapping("/getLikes")
	public ResponseEntity<List<Like>> getLikes() {
		System.out.println(adminService.getLikes());
		return new ResponseEntity<List<Like>>(adminService.getLikes(), HttpStatus.OK);
	}

	@GetMapping("/getComments")
	public ResponseEntity<List<Comments>> getComments() {
		System.out.println(adminService.getComments());
		return new ResponseEntity<List<Comments>>(adminService.getComments(), HttpStatus.OK);
	}

	@GetMapping("/availableManagers")
	public ResponseEntity<List<User>> getAvailableManagers() {
		List<User> managerList = adminService.getAllAvailableManagers();
		if (managerList.isEmpty()) {
			return new ResponseEntity<List<User>>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<List<User>>(managerList, HttpStatus.OK);
		}
	}

	@GetMapping("/getManagerById/{id}")
	public ResponseEntity<User> getManagerById(@PathVariable int id) {
		User manager = adminService.getManagerById(id);
		if (manager != null) {
			return new ResponseEntity<User>(manager, HttpStatus.OK);
		} else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getAllFeedbacks")
	public ResponseEntity<List<Object>> getFeedbacks(){
		String uri = "http://localhost:7070/feedback/getAllFeedback";
		RestTemplate restTemplate = new RestTemplate();
		Object[] feedback = restTemplate.getForObject(uri, Object[].class);
		List<Object> list = Arrays.asList(feedback);
		return new ResponseEntity<>(list,HttpStatus.OK);
	}

	// Uploading image on cloud with JGIT technology
	@PostMapping("/uploadProfileImg/{userId}")
	public ResponseEntity<String> uploadProfileImage(final @RequestParam("file") MultipartFile file, HttpServletRequest request,
			@PathVariable int userId) {
		// STAGE:0 Initializing stage
		String uploadDirectory = request.getServletContext().getRealPath(uploadFolder);
		String message = "";
		try {
			// getting user to attach image to it
			User user = userService.getUserById(userId);
			// storing image in this directory
			System.out.println("uploadDirectory: " + uploadDirectory);
			// STAGE:1 Connecting stage
			// cloning git repository in specified directory
			try (Git git = Git.cloneRepository().setURI(gitUrl).setDirectory(new File(uploadDirectory)).call()) {
				// storing profile image file name
				String fileName = file.getOriginalFilename();
				String filePath = Paths.get(uploadDirectory, fileName).toString();
				user.setImagePath("https://raw.githubusercontent.com/akhildarge/ImageStore/master/" + fileName);
				// checking if file is valid
				if (fileName == null || fileName.contains("..")) {
					message = "Sorry! Filename contains invalid path sequence \\\" + fileName "
							+ file.getOriginalFilename() + "!";
					return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
				}
				// STAGE:2 Executing stage
				try {
					// creating directory from provided path
					File dir = new File(uploadDirectory);
					if (!dir.exists()) {
						System.out.println("Folder Created");
						dir.mkdirs();
					}
					// Store the image file in created directory
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
					stream.write(file.getBytes());
					stream.close();
					// adding filename to respective user
					userService.editUser(user);
				} catch (Exception e) {
					System.out.println("in catch");
					e.printStackTrace();
				}
				// staging all changes of local repository
				git.add().addFilepattern(fileName).call();
				// commiting all changes
				git.commit().setMessage("Exec commit").call();
				// Providing credentials for git repository
				CredentialsProvider cp = new UsernamePasswordCredentialsProvider(userName, password);
				// pushing all changes on master to remote repository
				git.push().setCredentialsProvider(cp).setRemote("origin").add("master").call();

			} catch (Exception e) {
				System.out.println("in catch");
				e.printStackTrace();
			}
			// STAGE:3 Wipe out stage (No trace to be found)

			// Creating the File object
			File file1 = new File(uploadDirectory);
			// removing trace of folder on local machine
			deleteFolder(file1);
			System.out.println("Files deleted........");
			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

}
