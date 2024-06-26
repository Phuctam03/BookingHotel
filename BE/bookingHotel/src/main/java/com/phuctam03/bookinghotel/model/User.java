package com.phuctam03.bookinghotel.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.yaml.snakeyaml.events.Event;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String firstName;
    private  String lastName;
    private String email;
    private  String password;



    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}
    )
    //@Bang trung gian many-to-many
    @JoinTable(name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id",referencedColumnName = "id")
    )
    private Collection<Role> roles = new HashSet<>();


}
