package com.zedjobs.services;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

public class ServletHelper {
	private String _ALLOW_METHODS, _ALLOW_HEADERS, _ALLOW_ORIGIN, _CONTENT_TYPE, _ENCODING ;
	
	public ServletHelper() {
		this._ALLOW_METHODS = "GET, POST";
		this._ALLOW_ORIGIN = "*";
		this._ALLOW_HEADERS = "application/json";
		this._CONTENT_TYPE = "application/json";
		this._ENCODING ="UTF-8";
		
	}
	
	
	
	public void sendJson(String jsonData, HttpServletResponse response) throws IOException {
		//change response type to json and character encoding to UTF-8
		//then get the writer and write, not println
        response.setHeader("Access-Control-Allow-Origin", _ALLOW_ORIGIN);
        response.setHeader("Access-Control-Allow-Methods", _ALLOW_METHODS);
        response.setHeader("Access-Control-Allow-Headers", _ALLOW_HEADERS); 
		response.setContentType(_CONTENT_TYPE);
		response.setCharacterEncoding(_ENCODING);
		response.getWriter().write(jsonData);
	}

	public String get_ALLOW_METHODS() {
		return _ALLOW_METHODS;
	}

	public void set_ALLOW_METHODS(String _ALLOW_METHODS) {
		this._ALLOW_METHODS = _ALLOW_METHODS;
	}

	public String get_ALLOW_HEADERS() {
		return _ALLOW_HEADERS;
	}

	public void set_ALLOW_HEADERS(String _ALLOW_HEADERS) {
		this._ALLOW_HEADERS = _ALLOW_HEADERS;
	}

	public String get_ALLOW_ORIGIN() {
		return _ALLOW_ORIGIN;
	}

	public void set_ALLOW_ORIGIN(String _ALLOW_ORIGIN) {
		this._ALLOW_ORIGIN = _ALLOW_ORIGIN;
	}

	public String get_CONTENT_TYPE() {
		return _CONTENT_TYPE;
	}

	public void set_CONTENT_TYPE(String _CONTENT_TYPE) {
		this._CONTENT_TYPE = _CONTENT_TYPE;
	}

	public String get_ENCODING() {
		return _ENCODING;
	}

	public void set_ENCODING(String _ENCODING) {
		this._ENCODING = _ENCODING;
	}

}
