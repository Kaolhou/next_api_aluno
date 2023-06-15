import { Aluno } from "@/lib/prisma";
import Link from "next/link";
import { Buttons } from "./Buttons";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useRouter } from "next/router";
import CreateUpdateModal from "./CreateUpdateModal";
interface TableProps {
  att: string[];
  data: Aluno[];
}
export type crudType = "create" | "delete" | "update" | "";
export function Table({ att, data }: TableProps) {
  const router = useRouter();
  const [modal, setModal] = useState<crudType>("");
  const [userData, setUserData] = useState<Aluno>({
    id: 0,
    idade: 0,
    nome: "",
  });
  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      <DeleteModal
        isOpen={modal == "delete"}
        setModal={setModal}
        user={userData}
        refresh={refreshData}
      />
      <CreateUpdateModal
        isOpen={modal == "create" || modal == "update"}
        setModal={setModal}
        user={modal == "update" ? userData : { id: 0, idade: 0, nome: "" }}
        refresh={refreshData}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-end">
          <Buttons
            color="green"
            onClick={() => {
              setUserData({ id: 0, idade: 0, nome: "" });
              setModal("create");
            }}
          >
            Adicionar
          </Buttons>
          <Buttons color="light" onClick={refreshData}>
            Atualizar
          </Buttons>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {att.map((i, key) => {
                return (
                  <th scope="col" className="px-6 py-3" key={key}>
                    {i}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((i) => {
              return (
                <tr
                  key={i.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    <Link href={`/alunos/${i.id}`}>{i.id}</Link>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i.nome}
                  </th>
                  <td className="px-6 py-4">{i.idade}</td>
                  <td className="px-6 py-4">
                    <Buttons
                      color="default"
                      onClick={() => {
                        setUserData(i);
                        setModal("update");
                      }}
                    >
                      Atualizar
                    </Buttons>
                    <Buttons
                      color="red"
                      onClick={() => {
                        setUserData(i);
                        setModal("delete");
                      }}
                    >
                      Deletar
                    </Buttons>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
