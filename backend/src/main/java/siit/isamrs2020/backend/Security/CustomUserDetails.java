package siit.isamrs2020.backend.Security;

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
    return authorities;

	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

  
}