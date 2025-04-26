package com.usersmanager.usersapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

 /*Web config class to define CORS settings
 *
 *CORS (Cross-Origin Resource Sharing) is necessary to allow the frontend
 *that is running on a different origin, make HTTP requests to the backend server
 */

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**") // Apply CORS to all backend routes
                .allowedOrigins("http://localhost:3000") // Allow specific frontend origin
                .allowedMethods("*"); // Allow all HTTP methods
    }
}
