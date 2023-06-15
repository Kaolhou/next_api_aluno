import { Modal, ModalBody, ModalHeader } from "./ModalBase";
import { crudType } from "./Table";
import { GrClose } from "react-icons/gr";
import { Aluno } from "@/lib/prisma";
import { Buttons } from "./Buttons";
import axios, { AxiosError } from "axios";
import cookie from "cookie";

interface DeleteModalProps {
  isOpen: boolean;
  setModal: (a: crudType) => void;
  user: Aluno;
  refresh: () => void;
}

export default function DeleteModal({
  isOpen,
  setModal,
  user,
  refresh,
}: DeleteModalProps) {
  async function handleDelete() {
    try {
      await axios.delete(`/api/${user.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.parse(document.cookie)["auth_jwt"]}`,
        },
      });
      setModal("");
      refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        // eslint-disable-next-line no-console
        console.error(error);
        alert(error.response?.data);
      }
    }
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <span>Deseja realmente deletar {user.nome}?</span>
        <GrClose size={25} onClick={() => setModal("")} />
      </ModalHeader>
      <ModalBody>
        <Buttons onClick={handleDelete} color="red">
          Deletar
        </Buttons>
      </ModalBody>
    </Modal>
  );
}
