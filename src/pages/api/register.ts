import { ErroBase, StatusCodes } from "@/exception/ErrorBase";
import { Prisma, prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/registerSchema";
import { NextApiHandler } from "next";
import { ZodError } from "zod";

const register: NextApiHandler = async function (req, res) {
  try {
    if (req.method !== "POST")
      throw new ErroBase(StatusCodes.Not_Implemented, "Not Implemented");
    const data = registerSchema.parse(req.body);
    const user = await prisma.administrador.create({ data });

    res.status(StatusCodes.Created).send(user);
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
export default register;
