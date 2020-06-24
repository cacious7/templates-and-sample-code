package com.zedjobs.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;

import com.google.gson.Gson;

public class DBHelper {
	
	private String hostName, port, dbName, DB_URL;
	private Connection con;
	private Statement stmt;
	
	public DBHelper() {
		// TODO Auto-generated constructor stub
		this.DB_URL = "jdbc:mysql://localhost:3306/zedjobs";
	}
	
	public DBHelper(String hostName, String port, String dbName) {
		super();
		
		this.hostName = hostName;
		this.port = port;
		this.dbName = dbName;
		this.DB_URL = "jdbc:mysql://localhost:3306/zedjobs";
	}
	
	public String executeQuery(Connection connection, String query) {
        List<Map<String, Object>> listOfMaps = null;
        try {
            QueryRunner queryRunner = new QueryRunner();
            listOfMaps = queryRunner.query(connection, query, new MapListHandler());
        } catch (SQLException se) {
            throw new RuntimeException("Couldn't query the database.", se);
        } finally {
            DbUtils.closeQuietly(connection);
        }
        return listOfMaps.isEmpty() ? "" : new Gson().toJson(listOfMaps);
    }
	
	public List<Map<String, Object>> executeMapQuery(Connection connection, String query) {
        List<Map<String, Object>> listOfMaps = null;
        try {
            QueryRunner queryRunner = new QueryRunner();
            listOfMaps = queryRunner.query(connection, query, new MapListHandler());
            System.out.println("List of maps = " + listOfMaps + " query = " + query);
        } catch (SQLException se) {
            throw new RuntimeException("Couldn't query the database.", se);
        } finally {
            DbUtils.closeQuietly(connection);
        }
        return listOfMaps.isEmpty() ? null : listOfMaps;
    }

	//get connection
	public Connection getCon() throws SQLException, ClassNotFoundException {
		
		/*PREVENT THIS ERROR:
		 * java.sql.SQLException: No suitable driver found for jdbc:mysql://localhost:3306/zedjobs
		 * */
		Class.forName("com.mysql.jdbc.Driver");
		
		Connection con = DriverManager.getConnection(DB_URL, "cacious", "cacnga153");
		return con;
	}
	
	
	public Connection getConnection() throws SQLException, ClassNotFoundException {
		Connection con = getCon();
		return con;
	}
	
	public Statement getStatement() throws ClassNotFoundException {
		
		try {
			//get connection
			con = getCon();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		//create statement object
		try {
			stmt = con.createStatement();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return stmt;
	}

	public String getHostName() {
		return hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getDB_URL() {
		return DB_URL;
	}

	public void setDB_URL(String dB_URL) {
		DB_URL = dB_URL;
	}
	
	

}
