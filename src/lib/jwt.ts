import jwt from "jsonwebtoken";

export interface UserData {
  id: number;
  nome: string;
  username: string;
}
export default class Jwt {
  private static SECRET = process.env.JWT_TOKEN;

  public static sign(payload: Object) {
    return jwt.sign(payload, this.SECRET);
  }

  public static verify<T>(token: string) {
    return jwt.verify(token, this.SECRET) as T;
  }
}
