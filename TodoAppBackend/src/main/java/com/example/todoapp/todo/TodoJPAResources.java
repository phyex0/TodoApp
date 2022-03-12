package com.example.todoapp.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/jpa")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoJPAResources {
    @Autowired
    private TodoHardCodeService hardCodeService;

    @Autowired
    private TodoJPARepository todoJPARepository;

    @GetMapping("/users/{name}/todos")
    public List<Todo> getAllTodos(@PathVariable String name) {
        return todoJPARepository.findByUsername(name);
    }

    @GetMapping("/users/{name}/todos/{id}")
    public Todo getTodoById(@PathVariable String name, @PathVariable long id) {
        return todoJPARepository.findById(id).get();
    }

    @PutMapping("/users/{user}/todos/{todo_id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String user, @PathVariable long todo_id, @RequestBody Todo todo) {
        todo.setUsername(user);
        Todo updated = todoJPARepository.save(todo);
        return new ResponseEntity<Todo>(todo, HttpStatus.OK);
    }

    @PostMapping("/users/{user}/todos")
    public ResponseEntity<Void> createTodo(@PathVariable String user, @RequestBody Todo todo) {
        todo.setUsername(user);
        Todo created = todoJPARepository.save(todo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    //  Delete/user/{username}/todos/{id}
    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
        todoJPARepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
