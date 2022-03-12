package basicAuth;

public class AuthenticationBean {
    String message;

    public AuthenticationBean() {
    }

    public AuthenticationBean(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return String.format("test [message=%s]", message);
    }
}
