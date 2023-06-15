import Jwt from "@/lib/jwt";
import { Prisma, prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/loginSchema";
import { NextApiHandler } from "next";
import cookie from "cookie";
import { ErroBase, StatusCodes } from "@/exception/ErrorBase";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

const login: NextApiHandler = async function (req, res) {
  try {
    if (req.method !== "POST")
      throw new ErroBase(StatusCodes.Not_Implemented, "Not Implemented");
    const userData = loginSchema.parse(req.body);

    const user = await prisma.administrador.findFirstOrThrow({
      where: {
        username: userData.username,
        password: userData.password,
      },
    });
    const { password, ...data } = user;
    const response = Jwt.sign(data);

    const cookies = cookie.serialize("auth_jwt", response, {
      maxAge: 3600,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookies);
    res.status(StatusCodes.Created).send(response);
  } catch (error) {
    if (error instanceof ErroBase) {
      res.status(error.statusCode).send(error);
    } else if (error instanceof JsonWebTokenError) {
      res.status(StatusCodes.Unauthorized).send(error.message);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(StatusCodes.BadRequest).send(error);
    } else if (error instanceof ZodError) {
      res.status(StatusCodes.BadRequest).send(error);
    } else {
      res.status(StatusCodes.BadRequest).send("something went wrong");
    }
  }
};
export default login;
