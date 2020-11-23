package com.rishimax.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishimax.onlinebookstore.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByEmail(String email);
	
}