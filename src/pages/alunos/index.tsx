import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Aluno, prisma } from "@/lib/prisma";
import { Table } from "@/components/Table";
import Jwt, { UserData } from "@/lib/jwt";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
export const getServerSideProps: GetServerSideProps<{
  isValid: boolean;
  data: Aluno[];
  user: UserData;
}> = async ({ req, res }) => {
  try {
    const token = req.cookies["auth_jwt"];
    if (!token) throw new Error("ablué blué");

    const user = Jwt.verify<UserData>(token);

    const data = await prisma.aluno.findMany();
    return {
      props: {
        data: data ?? [],
        isValid: true,
        user,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        statusCode: 301,
      },
      props: {
        isValid: false,
      },
    };
  }
};

export default function Alunos({
  data,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  function handleLogout() {
    document.cookie = "auth_jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/");
  }

  return (
    <div>
      <header className="div_container flex justify-between items-center">
        <h1 className="my-3">Olá {user.nome}!</h1>
        <FiLogOut size={25} onClick={handleLogout} className="cursor-pointer" />
      </header>
      <main className="div_container">
        <Table att={["id", "nome", "idade", "-"]} data={data} />
      </main>
    </div>
  );
}
