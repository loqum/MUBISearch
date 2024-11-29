package com.mubisearch.notification.services;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    @Value("${spring.mail.mock.from}")
    private String from;
    @Value("${spring.mail.mock.to}")
    private String to;
    @Value("${spring.mail.mock.url.mubisearch.detail}")
    private String urlToDetail;

    private final JavaMailSender mailSender;

    public void sendEmail(String subject, String text, Long idContent) {
//        MimeMailMessage message = new MimeMailMessage(mailSender.createMimeMessage());
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);

            String url = UriComponentsBuilder.fromUriString(urlToDetail)
                    .buildAndExpand(idContent)
                    .toUriString();

            String htmlContent = "<p>" + text + "</p>" +
                    "<p><a href='" + url + "'>Haz click aquí para ver más detalles</a></p>";
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
            log.info("Email with subject {} and text {} sent successfully to {}", subject, text, to);

        } catch (Exception e) {
            log.error("Error sending email with subject {} and text {} to {}", subject, text, to, e);
        }



    }
}
