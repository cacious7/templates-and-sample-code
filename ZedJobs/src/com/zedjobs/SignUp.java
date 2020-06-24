package com.zedjobs;

import java.io.IOException;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.zedjobs.services.DBHelper;
import com.zedjobs.services.User;

/**
 * Servlet implementation class SignUp
 */
@WebServlet("/SignUp")
public class SignUp extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private User user;
	private Statement stmt;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignUp() {
        super();
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
		
		//Initialize the user with data from the sign up form
		try {
			
			user = initUser(request);
			
		} catch (InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException
				| IllegalBlockSizeException | BadPaddingException | InterruptedException e) {
			e.printStackTrace();
		}
		
		//Setup database, get connection, create a statement from the connection and get a stmt in return
		DBHelper dbHelper = new DBHelper();
		
		try {
			stmt = dbHelper.getStatement();
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
		}
		
		//execute query
		int queryUpdateStatus;
		//create a prepared statement
		String query = "insert into user (userName,firstName,lastName,middleName,dateOfBirth,email"
						+ ",password,address1,address2,city,province,zipCode)"
						+ "values('" + user.getUserName() + "','" + user.getFirstName() + "','" + user.getLastName() 
						+ "','" + user.getMiddleName() + "','" + user.getDateOfBirth() + "','" + user.getEmail()
						+ "','" + user.getPassword() + "','" + user.getAddress1() + "','" + user.getAddress2()
						+ "','" + user.getCity() + "','" + user.getProvince() + "','" + user.getZipCode() + "')";
		try {
			
			queryUpdateStatus = stmt.executeUpdate(query);
			System.out.println("Query Results = " + queryUpdateStatus);
			
			/*SUCCESS*/
			//check query success
			if(queryUpdateStatus != 0) {
				
				Map<String, Boolean> results = new LinkedHashMap<>();
				results.put("status", true);
				
				//create a json object from the key,value pair of type Map
				String jsonResult = new Gson().toJson(results);
				System.out.println("JSON = " + jsonResult);
				//change response type to json and character encoding to UTF-8
				//then get the writer and write, not println
		        response.setHeader("Access-Control-Allow-Origin", "*");
		        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
		        response.setHeader("Access-Control-Allow-Headers", "application/json"); 
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(jsonResult);
				
			    
			}else {
				
				/*FAILURE*/
				Map<String, Boolean> results = new LinkedHashMap<>();
				results.put("status", false);
				
				//create a json object from the key,value pair of type Map
				String jsonResult = new Gson().toJson(results);
				//change response type to json and character encoding to UTF-8
				//then get the writer and write, not println
//		        response.setHeader("Access-Control-Allow-Origin", "*");
//		        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
//		        response.setHeader("Access-Control-Allow-Headers", "Content-Type"); 
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(jsonResult);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
	
	
	private static User initUser(HttpServletRequest request) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, IOException, InterruptedException {
		
			User user = new User(
					request.getParameter("userName"),
					request.getParameter("firstName"),
					request.getParameter("lastName"),
					request.getParameter("middleName"),
					request.getParameter("dateOfBirth"),
					request.getParameter("email"),
					request.getParameter("password"),
					request.getParameter("address1"),
					request.getParameter("address2"),
					request.getParameter("city"),
					request.getParameter("province"),
					"",
					request.getParameter("zipCode")
					);
	
		return user;
	}

}
