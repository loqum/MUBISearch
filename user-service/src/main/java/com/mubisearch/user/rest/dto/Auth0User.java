package com.mubisearch.user.rest.dto;

import lombok.Data;

import java.util.List;

@Data
public class Auth0User {
    private String user_id;
    private String email;
    private String name;
    private String nickname;
    private String picture;
    private String username;
    private boolean email_verified;
    private String created_at;
    private String updated_at;
    private String last_login;
    private String last_ip;
    private int logins_count;
    private List<Identity> identities;
    private List<Role> roles;
}