package siit.isamrs2020.backend.Security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import siit.isamrs2020.backend.Classes.User;

/**
 * CustomUserDetails
 */
public class CustomUserDetails implements UserDetails{

  private User user;
  private List<GrantedAuthority> authorities;

  public CustomUserDetails(User user, List<GrantedAuthority> authorities) {
    this.user = user;
    this.authorities = authorities;
	}
	

	public User getUser() {
		return this.user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
    // TODO Auto-generated method stub
    return authorities;

	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

  
}