package siit.isamrs2020.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  public void sendMail(String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage(); 
    message.setTo(to); 
    message.setSubject(subject); 
    message.setText(text);
    mailSender.send(message);
  }



}