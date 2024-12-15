package com.mubisearch.user.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Value("${springdoc.info.title}")
    private String title;

    @Value("${springdoc.info.description}")
    private String description;

    @Value("${springdoc.info.version}")
    private String applicationVersion;

    @Value("${springdoc.info.contact.name}")
    private String contactName;

    @Value("${springdoc.info.contact.email}")
    private String contactEmail;

    @Bean
    public OpenAPI customOpenAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8080");
        return new OpenAPI()
                .addServersItem(server)
                .info(new Info()
                        .title(title)
                        .description(description)
                        .version(applicationVersion)
                        .contact(new Contact()
                                .name(contactName)
                                .email(contactEmail)
                        )
                );
    }

}
