package com.phuctam03.bookinghotel.service;

import com.phuctam03.bookinghotel.exception.UserAlreadyExistsException;
import com.phuctam03.bookinghotel.model.Role;
import com.phuctam03.bookinghotel.model.User;
import com.phuctam03.bookinghotel.repository.RoleRepository;
import com.phuctam03.bookinghotel.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;
import java.util.List;



@Service
public class UserService implements IUserService {

    @Autowired
    private  UserRepository userRepository;
    // ma hoa code
    // cau hinh chua khi dung
    @Autowired
    private   PasswordEncoder passwordEncoder;


    @Autowired
    private RoleRepository roleRepository;

    public UserService() {
    }

    @Override
    public User registerUser(User user) {
        if(userRepository.existsByEmail(user.getEmail())){
            throw  new UserAlreadyExistsException(user.getEmail() +"already exist");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        System.out.println(userRole);
        System.out.println(user.getPassword());
        // singleton dùng để trả về các role duy nhất
        user.setRoles(Collections.singleton(userRole));
        System.out.println(user);
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if(theUser != null) {
            userRepository.deleteByEmail(email);
        }
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user not found"));
    }
}
