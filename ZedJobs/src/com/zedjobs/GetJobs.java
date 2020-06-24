package com.zedjobs;

import java.io.IOException;

import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zedjobs.services.DBHelper;

/**
 * Servlet implementation class GetJobs
 */
@WebServlet("/GetJobs")
public class GetJobs extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetJobs() {
        super();
        
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		DBHelper db = new DBHelper();
		try {
			//Statement stmt = db.getStatement();
			//ResultSet results = stmt.executeQuery("select * from job limit 20");
			String resultJson = db.executeQuery(db.getCon(), "select * from job limit 20");
			System.out.println("results = " + resultJson);
			//check if query returned successful
			response.getWriter().append(resultJson + "");
			
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}


}
