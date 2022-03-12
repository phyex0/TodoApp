package com.example.todoapp.todo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoResources {

    @Autowired
    private TodoHardCodeService hardCodeService;

    @GetMapping("/users/{name}/todos")
    public List<Todo> getAllTodos(@PathVariable String name) {
        return hardCodeService.findAll();
    }

    @GetMapping("/users/{name}/todos/{id}")
    public Todo getAllTodos(@PathVariable String name, @PathVariable long id) {
        return hardCodeService.findById(id);
    }

    @PutMapping("/users/{user}/todos/{todo_id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String user, @PathVariable long todo_id, @RequestBody Todo todo) {
        Todo updated = hardCodeService.save(todo);
        return new ResponseEntity<Todo>(todo, HttpStatus.OK);
    }

    @PostMapping("/users/{user}/todos")
    public ResponseEntity<Void> updateTodo(@PathVariable String user, @RequestBody Todo todo) {
        Todo created = hardCodeService.save(todo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    //  Delete/user/{username}/todos/{id}
    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
        Todo todo = hardCodeService.deleteById(id);
        if (todo != null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
