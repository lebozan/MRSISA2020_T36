package siit.isamrs2020.backend.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import siit.isamrs2020.backend.Security.CustomUserDetailService;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  CustomUserDetailService userDetailsService;

  @Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:3000", "https://mrsisa2020-frontend.herokuapp.com").allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS").allowCredentials(true);
			}
		};
  }
  
  @Bean("authenticationManager")
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Autowired
  public void configAuthBuilder(AuthenticationManagerBuilder builder) throws Exception {
    builder.userDetailsService(userDetailsService); 
  }


  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http.authorizeRequests()
      .antMatchers("/api/**").hasAnyRole("DOCTOR", "CLINIC_ADMIN", "PATIENT")
      .and()
      .formLogin().loginPage("http://localhost:3000/login").loginProcessingUrl("/public/login")
      .and()
      .csrf().disable()
      .cors();
      
  }
  
  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring().antMatchers("/public/login");
  }
  
  @Bean
  public PasswordEncoder passwordEncoder() {
    return NoOpPasswordEncoder.getInstance();
  }
}