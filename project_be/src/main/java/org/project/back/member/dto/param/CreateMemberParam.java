package org.project.back.member.dto.param;

import org.project.back.member.dto.request.SignupRequest;

public class CreateMemberParam {
	
    private String email;
    private String pwd;
    private String name;
    private String phone;


    public CreateMemberParam(SignupRequest req, String encodedPwd) {
        this.email = req.getEmail();
        this.pwd = encodedPwd;
        this.name = req.getEmail();
        this.phone = req.getPhone();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
