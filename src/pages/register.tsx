import { Buttons } from "@/components/Buttons";
import axios, { AxiosError } from "axios";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState<{
    username: string;
    password: string;
    nome: string;
  }>({
    username: "",
    password: "",
    nome: "",
  });
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const data = await axios.post("/api/register", form);
      await axios.post("/api/login", data.data);
      router.push("/alunos");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }

  return (
    <div className="flex items-center h-screen shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-zinc-200 max-w-sm m-auto px-20 rounded"
      >
        <h1 className="py-7">Login</h1>
        <label htmlFor="nome" className="mb-4 flex flex-col ">
          <span>Nome: </span>
          <input
            type="text"
            id="nome"
            className="default_input"
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </label>
        <label htmlFor="username" className="mb-4 flex flex-col ">
          <span>Usuário: </span>
          <input
            type="text"
            id="username"
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
            Registar
          </Buttons>
        </span>
      </form>
    </div>
  );
}
