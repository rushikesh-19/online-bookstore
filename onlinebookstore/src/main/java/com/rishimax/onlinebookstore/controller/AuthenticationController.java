package com.rishimax.onlinebookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rishimax.onlinebookstore.config.JwtTokenUtil;
import com.rishimax.onlinebookstore.entity.JwtResponse;
import com.rishimax.onlinebookstore.entity.User;
import com.rishimax.onlinebookstore.service.JwtUserDetailsService;


@RestController
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;	
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> login(@RequestBody User user) throws Exception {
			
		authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));	
	
		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(user.getEmail());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}
		
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody User user) throws Exception {
		if(user.getEmail() != null && !user.getEmail().equals("")) {
			User userObj = userDetailsService.fetchUserByEmail(user.getEmail());
				if(userObj != null) {
					throw new Exception("User with "+ user.getEmail() + " already exist.");
				}
			}
		
		return ResponseEntity.ok(userDetailsService.save(user));
	}

}