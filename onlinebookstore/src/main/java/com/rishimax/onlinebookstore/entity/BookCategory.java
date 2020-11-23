package com.rishimax.onlinebookstore.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_category")
public class BookCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "category_name")
	private String categoryName;
	
	public BookCategory() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public BookCategory(long id, String categoryName, Set<Book> book) {
		super();
		this.id = id;
		this.categoryName = categoryName;
		this.book = book;
	}


	@OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
	private Set<Book> book;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Set<Book> getBook() {
		return book;
	}

	public void setBook(Set<Book> book) {
		this.book = book;
	}

	@Override
	public String toString() {
		return "BookCategory [id=" + id + ", categoryName=" + categoryName + ", book=" + book + "]";
	}
	
	
	
}
