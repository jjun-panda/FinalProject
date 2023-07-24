package org.dev.board.config;

import org.dev.board.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	@Autowired
	JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
	protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
//				cors 정책
				.cors().and()
//				csrf 대책
				.csrf().disable()
//				Basic 인증
				.httpBasic().disable()
//				세션 기반 인증
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//				'/' '/api/auth' 모듈에 대해서는 모두 허용( 인증 하지 않고 사용 가능하게 함 )
				.authorizeRequests().antMatchers("/", "/api/auth/**").permitAll()
//				나머지 Request에 대해서는 모두 인증된 사용자만 사용허용
				.anyRequest().authenticated();
		httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return httpSecurity.build();
	}
}
