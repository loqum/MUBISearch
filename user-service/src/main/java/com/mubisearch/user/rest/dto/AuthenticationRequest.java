package com.mubisearch.user.rest.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String name;
    private String password;
}
