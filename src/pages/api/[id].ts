import {
  HandlerWithUser,
  isValid,
  validateToken,
} from "@/middlewares/validateToken";
import { ErroBase, StatusCodes } from "@/exception/ErrorBase";
import { Prisma, prisma } from "@/lib/prisma";
import { ZodError } from "zod";
import { updateSchema } from "@/schemas/updateSchema";
const Id: HandlerWithUser = async function (req, res) {
  try {
    switch (req.method) {
      case "DELETE":
        await prisma.aluno.delete({
          where: {
            id: Number(req.query.id),
          },
        });

        res.status(StatusCodes.OK).send("deleted");

        break;
      case "PATCH":
        const data = updateSchema.parse(req.body);
        await prisma.aluno.update({
          where: {
            id: Number(req.query.id),
          },
          data: {
            idade: data.idade,
            nome: data.nome,
          },
        });
        res.status(StatusCodes.OK).send("Updated");
        break;

      default:
        throw new ErroBase(StatusCodes.Not_Implemented, "Not Implemented");
    }
  } catch (error) {
    if (error instanceof ErroBase) {
      res.status(error.statusCode).send(error);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(StatusCodes.BadRequest).send(error);
    } else if (error instanceof ZodError) {
      res.status(StatusCodes.BadRequest).send(error);
    } else {
      res.status(StatusCodes.BadRequest).send("something went wrong");
    }
  }
};

export default validateToken(Id);
