<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
    <%
        String name = request.getParameter("name");
        String hobby = request.getParameter("hobby");
    %>
HOBBY STORY
<br>
<br>
<br>
<% out.println(name); %> " like to " <% out.println(name); %>  "alot, despite everything, he is a very cheerfull person when he is doing what he loves.



</body>
</html>