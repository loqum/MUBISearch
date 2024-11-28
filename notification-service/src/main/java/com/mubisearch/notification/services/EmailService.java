package com.mubisearch.notification.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    @Value("${spring.mail.mock.from}")
    private String from;
    @Value("${spring.mail.mock.to}")
    private String to;

    private final JavaMailSender mailSender;

    public void sendEmail(String subject, String text) {
        MimeMailMessage message = new MimeMailMessage(mailSender.createMimeMessage());
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message.getMimeMessage());

        log.info("Email with subject {} and text {} sent successfully to {}", subject, text, to);
    }
}
