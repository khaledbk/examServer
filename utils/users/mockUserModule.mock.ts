import { UserServiceInterface } from "@/api/users/services";
import { UserDaoInterface } from "@/api/users/dao";
import { UserModuleInterface } from "@/api/users";

export const mockUserService: UserServiceInterface = {
  loginWithPassword: jest.fn(),
  loginWithToken: jest.fn(),
  loginWithGoogle: jest.fn(),
  me: jest.fn(),
};

export const mockDao: UserDaoInterface = {
  loginWithPassword: jest.fn(),
  loginWithToken: jest.fn(),
  loginWithGoogle: jest.fn(),
  me: jest.fn(),
};

export const mockUserModule: UserModuleInterface = {
  userService: mockUserService,
};

export const userModules = () => {
  it("should mock the user services and data access objects", () => {
    expect(mockUserService).toBeDefined;
    expect(mockDao).toBeDefined;
    expect(mockUserModule).toBeDefined;
  });
};
