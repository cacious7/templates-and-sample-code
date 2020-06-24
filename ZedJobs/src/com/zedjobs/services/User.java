package com.zedjobs.services;

import java.io.IOException;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

public class User {
	private String userName, firstName, lastName, middleName, email, password, address1, address2, city, province, country, zipCode;
	private  String dateOfBirth;
	
	
	public User(String userName, String firstName, String lastName, String middleName, String dateOfBirth, String email,
			String password, String address1, String address2, String city, String province, String country, String zipCode) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, IOException, InterruptedException {
		
		super();
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.middleName = middleName;
		this.email = email;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.password = password;//remove after learning to authenticate encrypted passwords
		this.province = province;
		this.country = country;
		this.zipCode = zipCode;
		
//		String temp_datOdBirth = new String(0,0,0);
//		//date should be changed to yyyy-mm-dd to be accepted by SQL
//		String temp_dateOfBirth = String.parse(dateOfBirth);
		this.dateOfBirth = dateOfBirth != "" ? dateOfBirth : "";
		System.out.println("Date cannot be null");
		System.out.println("Date = " + dateOfBirth);
		
		//check values are set
		System.out.println( "User values = " + userName + " + " + firstName + " + " + lastName + " + "
					+ middleName + " + " + dateOfBirth + " + " + email + " +" + password + " + " + address1 + " + " 
					+ address2 + " + " + city + " + " + province + " + " + country + " + " + zipCode);
		
		// Encyrpt the password before storing it anywhere
		//this.password = encrypt(password);
		
		
	}

	public User() {
		// initiate the variables to an empty string
		this.userName = this.firstName = this.lastName = this.middleName 
				= this.email = this.password = this.address1
				= this.address2 = this.city = this.province = this.zipCode
				= ""; //empty string
	}
	
	public String encrypt(String targetData) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, IOException, InterruptedException {
		
		CaxhCipher cipher = new CaxhCipher();
		String cipheredString = cipher.action("ENCRYPT", targetData);
		
		return cipheredString;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, IOException, InterruptedException {
		this.password = encrypt(password);
		this.password = password;
	}
	
	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}


	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	
	
	
	

}
