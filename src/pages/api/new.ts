import { ErroBase, StatusCodes } from "@/exception/ErrorBase";
import { Prisma, prisma } from "@/lib/prisma";
import {
  HandlerWithUser,
  isValid,
  validateToken,
} from "@/middlewares/validateToken";
import { newSchema } from "@/schemas/newSchema";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
const newAluno: HandlerWithUser = async function (req, res) {
  try {
    if (req.method !== "POST")
      throw new ErroBase(StatusCodes.Not_Implemented, "not Implemented");
    const body = newSchema.parse(req.body);

    const aluno = await prisma.aluno.create({
      data: body,
    });

    res.status(StatusCodes.Created).send(aluno);
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

export default validateToken(newAluno);
