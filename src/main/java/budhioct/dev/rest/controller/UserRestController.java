package budhioct.dev.rest.controller;

import budhioct.dev.rest.config.RestResponse;
import budhioct.dev.security.module.UserDTO;
import budhioct.dev.security.module.UserService;
import budhioct.dev.utilities.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class UserRestController {

    private final UserService userService;

    @PostMapping(
            path = "/register",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<RestResponse.object<UserDTO.RegisterResponse>> register(@RequestBody UserDTO.RegisterRequest request) {
        UserDTO.RegisterResponse userResponse = userService.register(request);
        RestResponse.object<UserDTO.RegisterResponse> res = RestResponse.object.<UserDTO.RegisterResponse>builder()
                .data(userResponse)
                .status_code(Constants.CREATED)
                .message(Constants.REGISTER_MESSAGE)
                .build();
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

}
