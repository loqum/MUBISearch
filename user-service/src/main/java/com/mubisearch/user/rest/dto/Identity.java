package com.mubisearch.user.rest.dto;

import lombok.Data;

@Data
public class Identity {
    private String connection;
    private String user_id;
    private String provider;
    private boolean isSocial;
}
