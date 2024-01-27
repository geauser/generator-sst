import { ApiHandler } from "sst/node/api";
import { Schema } from 'yup';
import middy from "@middy/core";
import jsonBodyParser from '@middy/http-json-body-parser';
import { sendJson } from "@<%= projectName %>/core/response";
import httpStatus from "http-status";
export * from 'yup';



export const schemaValidator = (schema: {
  body?: Schema,
  queryStringParameters?: Schema
}) => {
  const before = async (request: any) => {
    try {
      const { body, queryStringParameters } = request.event;
      if (schema.body) schema.body.validateSync(body ?? {});
      if (schema.queryStringParameters) schema.queryStringParameters.validateSync( queryStringParameters ?? {});
      return;
    } catch (e: any) {
      return sendJson({ status: 'fail', data: { errors: e.errors } }, httpStatus.BAD_REQUEST);
    }
  }
  return { before };
}


export const guard = (
  schema: { body?: Schema, queryStringParameters?: Schema },
  handler: ReturnType<typeof ApiHandler>,
) => {
  return middy(handler).use([jsonBodyParser({
    disableContentTypeError: true,
  }), schemaValidator(schema)]);
}

