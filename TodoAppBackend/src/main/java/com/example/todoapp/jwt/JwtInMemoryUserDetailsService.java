package com.example.todoapp.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

    static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

    static {
        inMemoryUserList.add(new JwtUserDetails(1L, "Burak",
                "$2a$10$lMVzGFdFHt9iS5Pn8P1GAeeNLL1yLOT2NBwIlTHdk8oyEmtJl4Yuq", "ROLE_USER_2"));
    }


       // "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCdXJhayIsImV4cCI6LTM5NDI1NTI3ODYzMzI1NDYsImlhdCI6MTY0NjA4MjY1Nn0.BezUZyFIlLppJy1srbKmTYe1nQ3Cv_ay2IrijRpofyS4mz4pW7TEgxraNCy7wdtEg7FlTK_iTP9KUcgHEo7p8A"


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
                .filter(user -> user.getUsername().equals(username)).findFirst();

        if (!findFirst.isPresent()) {
            throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
        }

        return findFirst.get();
    }

}

