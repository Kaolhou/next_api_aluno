import { prisma } from "@/lib/prisma";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async function ({}) {
  await prisma.aluno.create({
    data: {
      nome: "andré",
      idade: 20,
    },
  });
  return {
    props: {},
  };
};

export default function Teste() {
  return <>asdçasda</>;
}
