package com.phuctam03.bookinghotel.controller;


import com.phuctam03.bookinghotel.model.User;
import com.phuctam03.bookinghotel.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;



    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getUsers();
        if(!users.isEmpty()){
            return  new ResponseEntity<>(users,HttpStatus.FOUND);
        }else {
            return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }



    @GetMapping("/{email}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public  ResponseEntity<?> getUserByEmail(@PathVariable("email") String email){
        try {
            User theUser = userService.getUser(email);
            return  ResponseEntity.ok(theUser);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching users");
        }
    }


    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or (hasRole('ROLE_USER') and #email == principal.username)")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String email){
        try{
            userService.deleteUser(email);
            return  ResponseEntity.ok("User delete successfully");
        }catch (UsernameNotFoundException e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting data :"+e.getMessage());
        }
    }
    @GetMapping("/search/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getUsersByEmail(@PathVariable("email") String email){
        try{
            List<User> users = userService.getUsersByEmail(email);
            return  new ResponseEntity<>(users,HttpStatus.OK);
        }catch (Exception e){
             return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
