package com.sugang.boardback.dto.request.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

    //NotBlank : 문자열에서 null이 아니여야하고 빈 문자열(공백)- "", "   "로 이뤄지면 안됨
    @NotBlank @Email
    private String email;

    @NotBlank @Size(min=8, max=20)
    private String password;

    @NotBlank 
    private String nickname;

    @NotBlank @Pattern(regexp = "^[0-9]{11,13}$")
    private String telNumber;

    @NotBlank 
    private String address;

    private String addressDetail;

    @NotNull @AssertTrue
    private Boolean agreedPersonal;

}
