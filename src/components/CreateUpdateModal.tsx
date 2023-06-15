import { Modal, ModalBody, ModalHeader } from "./ModalBase";
import { Aluno } from "@/lib/prisma";
import { GrClose } from "react-icons/gr";
import { crudType } from "./Table";
import { FormEvent } from "react";
import { Buttons } from "./Buttons";
import { useState } from "react";
import axios from "axios";
interface CreateUpdateModalProps {
  isOpen: boolean;
  user: Aluno;
  setModal: (a: crudType) => void;
  refresh: () => void;
}

export default function CreateUpdateModal({
  isOpen,
  user,
  setModal,
  refresh,
}: CreateUpdateModalProps) {
  const isCreate = user.id == 0;

  const [form, setForm] = useState<{ nome: string; idade: number; id: number }>(
    user
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isCreate) {
      const { id, ...data } = form;
      await axios.post("/api/new", data);
      setModal("");
      refresh();
    } else {
      const { id, ...data } = form;
      await axios.patch(`/api/${user.id}`, data);
      setModal("");
      refresh();
    }
  }

  return (
    <Modal isOpen={isOpen} width="w-1/2">
      <ModalHeader>
        <span>{`${isCreate ? "Criar" : "Atualizar"} aluno`}</span>
        <GrClose size={25} onClick={() => setModal("")} />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          {isCreate ? null : (
            <label htmlFor="nome" className="mb-4 flex flex-col ">
              <span>Id: </span>
              <input
                type="text"
                id="nome"
                readOnly
                defaultValue={user.id}
                className="default_input"
              />
            </label>
          )}
          <label htmlFor="nome" className="mb-4 flex flex-col ">
            <span>Nome: </span>
            <input
              type="text"
              id="nome"
              defaultValue={user.nome}
              className="default_input"
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </label>
          <label htmlFor="age" className="mb-4 flex flex-col">
            <span>Idade: </span>
            <input
              type="text"
              id="age"
              defaultValue={user.idade}
              className="default_input"
              onChange={(e) =>
                setForm({ ...form, idade: Number(e.target.value) })
              }
            />
          </label>
          <span className="flex justify-center">
            <Buttons type="submit" color={isCreate ? "green" : "default"}>
              {isCreate ? "Criar" : "Atualizar"}
            </Buttons>
          </span>
        </form>
      </ModalBody>
    </Modal>
  );
}
