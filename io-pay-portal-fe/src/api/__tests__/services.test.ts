import { left } from "fp-ts/lib/Either";
import { withApiRequestWrapper } from "../services";

describe("withApiRequestWrapper", () => {
  it("should return a ", async () => {
    const apiCall = () => Promise.resolve(left(Error));

    const result = await withApiRequestWrapper((): any => apiCall(), 200).run();
    expect(result.isLeft()).toBe(true);
  });
});
