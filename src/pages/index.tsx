import { Buttons } from "@/components/Buttons";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { isValid } from "@/middlewares/validateToken";

export const getServerSideProps: GetServerSideProps = async function ({
  req,
  res,
}) {
  if (await isValid(req.cookies["auth_jwt"]!)) {
    return {
      props: {},
      redirect: {
        destination: "/alunos",
        statusCode: 301,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await axios.post("/api/login", form);
    router.push("/alunos");
  }

  return (
    <div className="flex items-center h-screen shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-zinc-200 max-w-sm m-auto px-20 rounded"
      >
        <h1 className="py-7">Login</h1>
        <label htmlFor="user" className="mb-4 flex flex-col ">
          <span>Usuário: </span>
          <input
            type="text"
            id="user"
            className="default_input"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </label>
        <label htmlFor="password" className="mb-4 flex flex-col">
          <span>Senha: </span>
          <input
            type="password"
            id="password"
            className="default_input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <span className="flex justify-center">
          <Buttons type="submit" color="default">
            Entrar
          </Buttons>
        </span>
      </form>
    </div>
  );
}
