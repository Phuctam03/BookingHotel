package com.phuctam03.bookinghotel.controller;


import com.phuctam03.bookinghotel.exception.RoleAlreadyExistException;
import com.phuctam03.bookinghotel.model.Role;
import com.phuctam03.bookinghotel.model.User;
import com.phuctam03.bookinghotel.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    @Autowired
    private IRoleService roleService;



    @GetMapping("/all-role")
    public ResponseEntity<List<Role>> getAllRoles(){
        List<Role> roles = roleService.getRoles();
        if(roles.isEmpty()){
            return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(roles, HttpStatus.FOUND);
    }



    @PostMapping("/create-new-role")
    public  ResponseEntity<String> createRole(@RequestBody Role theRole){
        try{
            roleService.createRole(theRole);
            return  ResponseEntity.ok("New role created successfully!");
        }catch (RoleAlreadyExistException ex){
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        }
    }


    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") Long id){
        roleService.deleteRole(id);
    }


    @PostMapping("/remove-all-users-from-role/{roleId}")
    public  Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId){
        return roleService.removeAllUsersFromRole(roleId);
    }



    // xoa userId va roleId trong bang user_roles
    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(
          @RequestParam("userId")  Long userId,
          @RequestParam("roleId")  Long roleId){
        return  roleService.removeUserFromRole(userId,roleId);
    }

    @PostMapping("/assign-user-to-role")
    public  User assignRoleToUser(@RequestParam("userId") Long userId,
                                  @RequestParam("roleId") Long roleId) {
        return  roleService.assignRoleToUser(userId,roleId);
    }
}
