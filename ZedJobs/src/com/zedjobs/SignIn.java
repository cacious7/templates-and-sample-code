package com.zedjobs;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.zedjobs.services.DBHelper;
import com.zedjobs.services.ServletHelper;

/**
 * Servlet implementation class SignIn
 */
@WebServlet("/SignIn")
public class SignIn extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignIn() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		try {
			handleSignIn(request, response);
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void handleSignIn(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException, ClassNotFoundException, SQLException {
		HttpSession session = req.getSession();
		
		DBHelper db = new DBHelper();
		Connection con = db.getConnection();
		String userName = req.getParameter("userName");
		String password = req.getParameter("password");
		String query = "select id, userName, password from user where userName='" +  userName
						+ "' and password='" + password +"'";
		//returns an empty string if results are empty 
		//and returns json string if results are populated
		List<Map<String, Object>> results = db.executeMapQuery(con, query);
		
		//AUTHENTICATE AND SIGN IN
		if(results != null && !results.isEmpty()) {
			Integer userId = (Integer) results.get(0).get("id");
			
			//print out the userId
			System.out.println("userId = " + userId);
			
			//if user exists in the database, then log the user in by signing in his information in the session
			//userIdQuery = "select id from user where userName = '" + userName;
			session.setAttribute("userName", userName);
			session.setAttribute("userId", userId);
			System.out.println("Signed In Successfully, Result =>" + results + " --- id = " + userId);
			
			//ServletHelper class that helps with responses
			ServletHelper servletHelper = new ServletHelper();
			
			//sends data back to the browser as a response setup in json format by default
			//convert List<Map<String, Object>> to a json string
			String jsonResults = new Gson().toJson(results);
			servletHelper.sendJson(jsonResults, res);
			
			System.out.println("Results have been sent in json");
			
		}else {
			System.out.println("UserName, password or both are wrong! Sign in Failure + " + results);
			
		}
		
		
	}

}
