package com.victorMarchiDev.mvp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MvpApplication {

	public static void main(String[] args) {
		SpringApplication.run(MvpApplication.class, args);
	}

}
