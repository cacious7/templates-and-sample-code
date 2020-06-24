package com.zedjobs;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HandleJobs
 */
@WebServlet("/HandleJobs")
public class HandleSubmit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HandleSubmit() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		
		String name = request.getParameter("name");
		String hobby = request.getParameter("hobby");
		
		response.sendRedirect("hobby.jsp?name="+name+"&hobby="+hobby);
		//out.println(name + " like to " + hobby + "alot, despite everything, he is a very cheerfull person when he is doing what he loves.");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		
		PrintWriter out = response.getWriter();
		
		String name = request.getParameter("name");
		String hobby = request.getParameter("hobby");
		
		//response.sendRedirect("hobby.jsp?name="+name+"&hobby="+hobby);
		out.println(name + " like to " + hobby + "alot, despite everything, he is a very cheerfull person when he is doing what he loves.");
	}

}
