package com.phuctam03.bookinghotel.controller;


import com.phuctam03.bookinghotel.exception.UserAlreadyExistsException;
import com.phuctam03.bookinghotel.model.User;
import com.phuctam03.bookinghotel.request.LoginRequest;
import com.phuctam03.bookinghotel.response.JwtResponse;
import com.phuctam03.bookinghotel.security.jwt.jwtUtils;
import com.phuctam03.bookinghotel.security.user.HotelUserDetails;
import com.phuctam03.bookinghotel.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private IUserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private jwtUtils jwtUtils;


    @PostMapping("/register-user")
    public ResponseEntity<?>  registerUser(@RequestBody User user){
        try {
            userService.registerUser(user);
            return  ResponseEntity.ok("Registration successfully");

        }catch (UserAlreadyExistsException e){
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public  ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
        HotelUserDetails userDetails = (HotelUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().
                stream().
                map(GrantedAuthority::getAuthority).toList();
        return  ResponseEntity.ok(new JwtResponse(
                userDetails.getId(),
                userDetails.getEmail(),
                jwt,
                roles));
    }


}
