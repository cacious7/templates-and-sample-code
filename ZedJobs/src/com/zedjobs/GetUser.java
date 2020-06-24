package com.zedjobs;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.zedjobs.services.DBHelper;
import com.zedjobs.services.ServletHelper;

/**
 * Servlet implementation class GetUser
 */
@WebServlet("/GetUser")
public class GetUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUser() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
		
		DBHelper db = new DBHelper();
		HttpSession session = request.getSession();
		String userName = (String) session.getAttribute("userName");
		Integer userId = (Integer) session.getAttribute("userId");
		
		//contains usefull most used java functions
		ServletHelper servletHelper = new ServletHelper();
		
		//check if the user owns this session, if not, then back to sign in
		if(userId != null) {
			System.out.println("UserID in session = " + userId );   
			String query = "select * from user where userName='" + userName + "' and id='" + userId + "'";
			System.out.println(query);
			
			String jsonResults = "";
			try {
				
				jsonResults = db.executeQuery(db.getCon(), query);
				System.out.println("GET_USER:: jsonResult/user data = " + jsonResults);
				
			} catch (ClassNotFoundException | SQLException e) {
				e.printStackTrace();
			}
			
			if(jsonResults != "") {
				System.out.println("GET_USER::User Data has been sent as jsonResults = " + jsonResults);
				servletHelper.sendJson(jsonResults, response);
			}else {
				System.out.println("userName doesnt exist");
			}
		}
	}

}
