import { IRequestMiddleware } from "io-functions-commons/dist/src/utils/request_middleware";
import { ResponseErrorFromValidationErrors } from "italia-ts-commons/lib/responses";

import { RecipientRequest } from "../../generated/definitions/RecipientRequest";

/**
 * A middleware that extracts a RecipientRequest payload from a request.
 */
export const RecipientRequestMiddleware: IRequestMiddleware<
  "IResponseErrorValidation",
  RecipientRequest
> = request =>
  Promise.resolve(
    RecipientRequest.decode(request.body).mapLeft(
      ResponseErrorFromValidationErrors(RecipientRequest)
    )
  );
