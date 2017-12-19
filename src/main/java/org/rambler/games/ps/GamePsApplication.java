package org.rambler.games.ps;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.qiniu.storage.UploadManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@ServletComponentScan("org.rambler.games.ps.filter")
public class GamePsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamePsApplication.class, args);
	}


//	@Resource
//	private FacePlusPlusProperties facePlusPlusProperties;
//
//	@Resource
//	private QiNiuProperties qiNiuProperties;


//	@Bean
//	CommonOperate commonOperate(){
//		return new CommonOperate(facePlusPlusProperties.getKey(),facePlusPlusProperties.getSecret(),false);
//	}

	@Bean
	Gson gson() {
		return new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES).create();
	}

//	@Bean
//	Auth auth(){
//		return Auth.create(qiNiuProperties.getAccessKey(), qiNiuProperties.getSecretKey());
//	}

	@Bean
	UploadManager uploadManager(){
		return  new UploadManager();
	}
}
