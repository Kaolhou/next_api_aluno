import { ErroBase, StatusCodes } from "@/exception/ErrorBase";
import Jwt, { UserData } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

export type HandlerWithUser = (
  req: NextApiRequest & { user?: UserData },
  res: NextApiResponse
) => unknown;

export async function isValid(token: string) {
  try {
    const payload = Jwt.verify<UserData>(token);

    await prisma.administrador.findFirstOrThrow({
      where: {
        id: payload.id,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}

export const validateToken = (handler: HandlerWithUser) =>
  async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const token = req.cookies["auth_jwt"];
      if (!token)
        throw new ErroBase(StatusCodes.BadRequest, "No jwt found in cookies");

      const payload = Jwt.verify<UserData>(token);

      await prisma.administrador.findFirstOrThrow({
        where: {
          id: payload.id,
        },
      });

      handler(Object.assign(req, payload), res);
    } catch (error) {
      if (error instanceof ErroBase) {
        res.status(error.statusCode).send(error);
      } else if (error instanceof JsonWebTokenError) {
        res.status(StatusCodes.Unauthorized).send(error);
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(StatusCodes.BadRequest).send(error);
      } else {
        res.status(StatusCodes.BadRequest).send("something went wrong");
      }
    }
  };
