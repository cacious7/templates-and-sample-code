package com.zedjobs;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.zedjobs.services.DBHelper;
import com.zedjobs.services.ServletHelper;

/**
 * Servlet implementation class NewJob
 */
@WebServlet("/NewJob")
public class NewJob extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public NewJob() {
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
		System.out.println("NEW_JOB reached!!!");
		
		Integer rowsAffected = null;
		ServletHelper servletHelper = new ServletHelper();
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId");
		
		//Authenticate user
		if(userId == null) {
			//illegalAccess
			servletHelper.sendJson("{ \"status\" : \"illegalAccess\" }", response);
		}else {
			//DATABASE
			DBHelper db = new DBHelper();
			
			String title = request.getParameter("title");
			String intro = request.getParameter("intro");
			String description = request.getParameter("description");
			String address1 = request.getParameter("address1");
			String address2 = request.getParameter("address2");
			String city = request.getParameter("city");
			String province = request.getParameter("province");
			String country = request.getParameter("country");
			String addressSameAsOrg = "true";
			String organization_id = "1";
			String user_id = userId + "";
			String query = "insert into job (title, intro, description, address1, address2, city, province"
						+ ", country, addressSameAsOrg, organization_id, user_id)"
						+ "values('" +title+"', '"+intro+"', '"+description+"', '"+address1+"', '"+address2+"', '"+city+"', '"+province
						+ "', '"+country+"', '"+addressSameAsOrg+"', '"+organization_id+"', '"+user_id+"')";
			
			System.out.println(query);
			
			
			Statement stmt;
			try {
				stmt = db.getStatement();
				//create the new job record in the database
				rowsAffected = stmt.executeUpdate(query);
				
				//if more than 0 rows were affected, the insertion/update was successful
				if(rowsAffected != 0) {
					
					//send data back to the user in usual json format
					String jsonData = "[{ \"status\" : \"true\" }]";
					servletHelper.sendJson(jsonData, response);
				}else {
					//FAILURE
					System.out.println("Failure on creating new job");
				}
						
			} catch (ClassNotFoundException | SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		
		}

	}

}
