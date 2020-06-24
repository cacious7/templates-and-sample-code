package com.zedjobs.services;

import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;

public class CaxhCipher {
	
	public String action(String action, String targetData) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, IOException, InterruptedException {
		
		//GET a key
		SecretKey myDesKey = getKey();
		System.out.println("Bf_key = " + myDesKey);
		
		
		//Covert the object to be ciphered to a byte array for ciphering purposes
		System.out.println("BYTES = " + targetData);
		System.out.println("ERROR: password is empty, please provide target data to be ciphered!");
			
		byte[] targetObjectBytes = targetData.getBytes();
		
		if(action == "encrypt" || action == "Encrypt" || action == "ENCRYPT" || action == "e" || action == "E") {
		
			//Encrypt and reset targetObjectBytes to the encrypted bytes[]
			//which are the target of decrypt function
			targetObjectBytes = encrypt(myDesKey, targetObjectBytes, "/encrypted.txt" );
		
		}else if(action == "decrypt" || action == "Decrypt" || action == "DECRYPT" || action == "d" || action == "D") {
			
			//Decrypt
			targetObjectBytes = decrypt(myDesKey, targetObjectBytes, "/decrypted.txt" );
		
		}
		
		//covert the bytes to their text representations
		//so as to convert the to the correct bytes for decoding
		/*String cipheredText = new String(targetObjectBytes);
		System.out.println(cipheredText);*/
		String cipheredText = targetObjectBytes.toString();
		System.out.println(cipheredText);
		
		return cipheredText;
		
	}
	
	public SecretKey getKey() throws NoSuchAlgorithmException {
		
		//To let Java generate a random secure key, do as follows
		//create an instance of keyGenerator with your chosen encryption Algorithm
		KeyGenerator myGenerator = KeyGenerator.getInstance("DES");
		
		//Generate key of type Secret Key
		SecretKey myKey = myGenerator.generateKey();
		
		//return key of appropriate type
		return myKey;
	}
	
	public byte[] encrypt(SecretKey key,byte[] targetBytes, String outputFile) throws InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, IOException {
		Cipher myCipher = Cipher.getInstance("DES");
		myCipher.init(Cipher.ENCRYPT_MODE, key);
		
		return finalCipher(myCipher, targetBytes, outputFile);
	}
	
	public byte[] decrypt(SecretKey key,byte[] targetBytes, String outputFile) throws InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, IOException {
		Cipher myCipher = Cipher.getInstance("DES");
		myCipher.init(Cipher.DECRYPT_MODE, key);
		
		return finalCipher(myCipher, targetBytes, outputFile);
	}
	
	public byte[] finalCipher(Cipher myCipher,byte[] targetBytes, String outputFile ) throws IOException, IllegalBlockSizeException, BadPaddingException {
		
		//Encrypt the targeted object byte stream (targetObjectBytes)
		byte[] myCipheredBytes = myCipher.doFinal(targetBytes);
		
		//write the encrypted bytes to a file
		FileOutputStream fos = new FileOutputStream(outputFile);
		
		//write the bites to a file
		fos.write(myCipheredBytes);

		//always close stream to avoid having any errors or data leaks
		fos.close();
		
		return myCipheredBytes;
	}

}
