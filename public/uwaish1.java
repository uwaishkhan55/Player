package function01;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class hackersblocks001 {
   
	public static void main(String args[]) {
		  String str = "abcbc";
          HashMap<String,Boolean> map=new HashMap<>();
          ArrayList<Character> list = new ArrayList<>();
          rec(str,map,1,list);
   }
   static void rec( String str, HashMap<String,Boolean> map,int k,ArrayList<Character> list){
	   System.out.println(map);
       if(str.length()==0||k>str.length()) return;
          for(int i=0;i<str.length();i++){
              String len=str.substring(0,str.length()-i);
              if(map.containsKey(len)){
                  System.out.println(len.length());
               }
              map.put(len,true);
          }
          rec(str.substring(k),map,k=k+1,list);
   }
}   