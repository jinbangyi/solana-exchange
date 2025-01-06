// import { HttpStatus } from "@nestjs/common";
// import { Test, TestingModule } from "@nestjs/testing";

// import { AuthController } from "./auth.controller.js";
// import { AuthService } from "./auth.service.js";

// describe("AuthController", () => {
//   let authController: AuthController;
//   let authService: AuthService;

//   const mockAuthService = {
//     login: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         {
//           provide: AuthService,
//           useValue: mockAuthService,
//         },
//       ],
//     }).compile();

//     authController = module.get<AuthController>(AuthController);
//     authService = module.get<AuthService>(AuthService);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("signIn", () => {
//     const signInDto = {
//       username: "testuser",
//       password: "testpass",
//     };

//     const mockLoginResponse = {
//       access_token: "mock-token",
//     };

//     it("should successfully login user", async () => {
//       mockAuthService.login.mockResolvedValue(mockLoginResponse);

//       const result = await authController.signIn(signInDto);

//       expect(result).toBe(mockLoginResponse);
//       expect(authService.login).toHaveBeenCalledWith(
//         signInDto.username,
//         signInDto.password,
//       );
//       expect(authService.login).toHaveBeenCalledTimes(1);
//     });

//     it("should call AuthService.login with correct parameters", async () => {
//       await authController.signIn(signInDto);

//       expect(authService.login).toHaveBeenCalledWith(
//         signInDto.username,
//         signInDto.password,
//       );
//     });

//     it("should handle login failure", async () => {
//       const errorMessage = "Invalid credentials";
//       mockAuthService.login.mockRejectedValue(new Error(errorMessage));

//       await expect(authController.signIn(signInDto)).rejects.toThrow(
//         errorMessage,
//       );
//     });

//     it("should have correct HTTP status code decorator", () => {
//       const metadata = Reflect.getMetadata(
//         "custom:http-code",
//         authController.signIn,
//       );
//       expect(metadata).toBe(HttpStatus.OK);
//     });
//   });
// });
