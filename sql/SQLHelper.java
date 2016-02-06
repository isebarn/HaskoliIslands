import java.io.*;
import java.sql.*;
import java.util.Scanner;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class SQLHelper{
	Connection c;

	public SQLHelper(){
		c = null;
		try {
		  Class.forName("org.sqlite.JDBC");
		  c = DriverManager.getConnection("jdbc:sqlite:data.db");
		} catch ( Exception e ) {
		  System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		  System.exit(0);
		}
		System.out.println("Opened database successfully");			

	}










	public static void main(String[] args) {
		System.out.println("arf");
		SQLHelper hehe = new SQLHelper();
	}
}