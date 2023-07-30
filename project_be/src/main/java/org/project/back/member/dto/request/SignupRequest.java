package org.project.back.member.dto.request;

import javax.validation.constraints.NotBlank;

public class SignupRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String pwd;

    @NotBlank
    private String checkPwd;

    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getCheckPwd() {
        return checkPwd;
    }

    public void setCheckPwd(String checkPwd) {
        this.checkPwd = checkPwd;
    }

    public String getEmail() {
        return name;
    }

    public void setEmail(String name) {
        this.name = name;
    }
    
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
