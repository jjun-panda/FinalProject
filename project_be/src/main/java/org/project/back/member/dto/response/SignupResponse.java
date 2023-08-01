package org.project.back.member.dto.response;

public class SignupResponse {

    private String email;

    public SignupResponse(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
