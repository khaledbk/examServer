import { Provider } from "../../src/api/employees/dao";
import { UserDao } from "../../src/api/users/dao";

export const login = () => {
  it("should log the user in", async () => {
    let userDao = new UserDao();
    const loggedUser = await userDao.loginWithPassword({
      username: "khaledbenk@gmail.com",
      provider: {
        provider: Provider.PASSWORD,
        data: "111111",
      },
    });
    expect(loggedUser.email).toBe("khaledbenk@gmail.com");
    expect(loggedUser.name).toBe("Khaled");
    expect(loggedUser._id).toBeTruthy();
    //to check if the logged user is always an admin for example
    expect(loggedUser.credentials.isAdmin).toBeTruthy();
  });
};
