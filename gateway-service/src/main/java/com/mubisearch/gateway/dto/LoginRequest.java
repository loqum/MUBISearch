package com.mubisearch.gateway.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {

    private String name;
    private String password;
}
