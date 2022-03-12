package com.example.todoapp.helloWorld;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HelloWorldController {

    @RequestMapping(method = RequestMethod.GET, path = "/hello-world")
    public String helloWorld() {
        return "Hello Burak";
    }

    @GetMapping(path = "/test")
    public String test() {
        return "Test";
    }

    @GetMapping(path = "/test-bean")
    public TestBean testBean() {
        return new TestBean("Damn");
    }

    @GetMapping(path = "/test/path-variable/{name}")
    public TestBean testBean(@PathVariable String name) throws Exception {
        //throw new Exception("Something went wrong");
        return new TestBean(String.format("Hello %s", name));
    }
}
