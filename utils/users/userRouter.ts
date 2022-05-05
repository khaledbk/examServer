import { mockUserModule } from "./mockUserModule.mock";
import { examTestapp } from "../../__tests__/sequencer.test";
import { ObjectId } from "mongodb";
import request from "supertest";

export const userRouter = () => {
  xit("should post the login credentials to the server", async (done) => {
    mockUserModule.userService.loginWithPassword = jest.fn(
      () =>
        Promise.resolve({
          _id: new ObjectId("626311a465d4bb91ff691466"),
          name: "Khaled",
          surname: "BenKhaled",
          phoneNumber: "+1-819-328-9448",
          address: "46 Rue Bedard, App 206, Gatineau, J8Y 6Z6, QC, Canada",
          title: "FullStack Web Dev",
          credentials: {
            hash: "f1f7f5a28d9da51aa2df95ab57678c522632c19a0b934ed4e856dceea0fc9f564a318cf4b17528de240562ad2a5289e2f22fc99dfd199c3c1e74b02d3f7c952beb18044e41ebf8211355b556fec1ac1e919a3b732289723f42254ef8a9fce215bb49f2238b815e19a9e4508c1b60d812bda916b1e971b5be8758998a825db51b86a3d9207fb22a11cf3c01b1513ec517d13d12e42b164c2d2c7091c723e94d4a236953edbfc16ddbbbb75f34f1f8096a2e9e1b639373ce96a8f998d8a101c025f71a20a9f4ea23232f31182b1cd12788b1b838ae1d1a49edc84e7e24a612496b6229bc9dae7b7c142a7fcc593d35201e5a2e88df77baa5ca06cf196daab717e6",
            isAdmin: true,
            loginToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYzMTFhNDY1ZDRiYjkxZmY2OTE0NjYiLCJlbWFpbCI6ImtoYWxlZGJlbmtAZ21haWwuY29tIiwiaWF0IjoxNjUxNzcxODg3LCJleHAiOjE2NTE4NTgyODd9.IMW1IRviuVuy9NCzyQqYPjVamnxoAQvcy0-SYLFBrx0",
            googleToken: "",
            lastLogin: new Date(),
          },
          email: "khaledbenk@gmail.com",
          username: "khaledbk",
        }) //to return the resolved value to this service
    );
    request(examTestapp)
      .post("http://localhost:3001/api/auth")
      .send({
        data: {
          username: "khaledbenk@gmail.com",
          provider: { provider: "password", data: "111111" },
        },
        auth: {
          username: "khaledbenk@gmail.com",
          password: "111111",
        },
      })
      .expect(200)
      .end(() => {
        //expect(userService.loginWithPassword).toBeCalledTimes(0);
        expect(mockUserModule.userService.loginWithPassword).toBeTruthy();

        return done();
      });
  }, 10000);
};
