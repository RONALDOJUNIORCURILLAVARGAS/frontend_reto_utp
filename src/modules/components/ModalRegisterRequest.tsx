import {
  faCheck,
  faPaperclip,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { StudentRow } from "../../types";
import { sendChangeNotes } from "../../services";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ModalRegisterRequestProps {
  isVisible: boolean;
  onClose: () => void;
  data: StudentRow;
}
type StateSend = "" | "loading" | "success" | "error";

export const ModalRegisterRequest = ({
  isVisible,
  onClose,
  data,
}: ModalRegisterRequestProps) => {
  const { user_id, user_token } = useSelector((state: RootState) => state.auth);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [newNote, setNewNote] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [errorNewNote, setErrorNewNote] = useState<boolean>(false);
  const [errorFile, setErrorFile] = useState<boolean>(false);
  const [stateSend, setStateSend] = useState<StateSend>("");
  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const isValidInput =
      /^\d{0,2}(\.\d{0,1})?$/.test(inputValue) &&
      parseFloat(inputValue) >= 0 &&
      parseFloat(inputValue) <= 20;
    if (isValidInput || inputValue === "") {
      setNewNote(inputValue);
    }
  };
  const validateInput = () => {
    setErrorNewNote(newNote.length === 0);
    setErrorFile(!selectedFile);
    return newNote.length === 0 || !selectedFile;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInput()) return;

    setStateSend("loading");
    const response = await sendChangeNotes({
      user_id: user_id.toString(),
      file: selectedFile!,
      nota_id: data.nota_id.toString(),
      nota_nueva: newNote,
      user_token: user_token,
    });
    if (response) setStateSend("success");
    else setStateSend("error");
  };
  const clearStates = () => {
    setSelectedFile(null);
    setNewNote("");
    setStateSend("");
    setErrorNewNote(false);
    setErrorFile(false);
  };
  const CloseModal = () => {
    onClose();
    clearStates();
  };
  //Limpiar por cada alumno seleccionado
  useEffect(() => {
    clearStates();
  }, [data]);

  //Formato de archivos a aceptar
  const accept = ".pdf,.png,.jpg";
  if (isVisible) {
    return (
      <div className="absolute w-screen h-screen bg-black/50 z-10 top-0 left-0 px-[12px] flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="relative w-full max-w-[500px]  flex flex-col justify-center items-center bg-white rounded-[15px] px-4 md:px-8 pb-12 pt-4"
        >
          <button
            className="absolute top-0 right-4 text-[40px] font-bold"
            onClick={CloseModal}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h1 className="text-[24px] font-bold">Registrar solicitud</h1>

          <div className="w-full grid grid-cols-2 gap-[10px]">
            <div className="flex flex-col">
              <div className="h-[60px] flex items-center font-semibold justify-between">
                <span>Alumno</span> <span>:</span>
              </div>
              <div className="h-[60px] flex items-center font-semibold justify-between">
                <span>Código</span> <span>:</span>
              </div>
              <div className="h-[60px] flex items-center font-semibold justify-between">
                <span>Nota actual</span> <span>:</span>{" "}
              </div>
              <div className="h-[60px] flex items-center font-semibold justify-between">
                <span>Nota nueva</span>
                <span>:</span>{" "}
              </div>
              <div className="h-[60px] flex items-center font-semibold justify-between">
                <span>Evidencia</span>
                <span>:</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="h-[60px] flex items-center">
                <span>{data.alumno_nombres + " " + data.alumno_apellidos}</span>
              </div>
              <div className="h-[60px] flex items-center">
                <span>{data.alumno_codigo}</span>
              </div>
              <div className="h-[60px] flex items-center">
                <span>{data.nota_valor}</span>{" "}
              </div>
              <div className="h-[60px] flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Ingrese la nueva nota"
                  className={`w-full rounded-[5px] border outline-none border-gray-400 p-3 ${
                    errorNewNote ? "border-red-500 border-2" : ""
                  }`}
                  value={newNote}
                  onChange={handleChangeNote}
                />
              </div>
              <div className="h-[60px] flex items-center">
                <button
                  type="button"
                  className={`items-center text-ellipsis justify-center text-gray-400 hover:text-gray-600 flex gap-[8px] rounded-[5px] border border-gray-400 p-3 w-full
                   ${errorFile ? "border-red-500 border-2" : ""}
                  `}
                  onClick={() => inputFileRef.current?.click()}
                >
                  <FontAwesomeIcon icon={faPaperclip} />

                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {selectedFile ? selectedFile.name : "Seleccionar archivo"}
                  </span>
                </button>
                <input
                  type="file"
                  ref={inputFileRef}
                  accept={accept}
                  onChange={(e) => setSelectedFile(e.target.files?.item(0))}
                  hidden
                />
              </div>
            </div>
          </div>
          {(errorNewNote || errorFile) && (
            <div className="text-red-utp text-sm w-full text-right py-4">
              Completar los campos marcados en rojo*
            </div>
          )}
          <div className="text-gray-400 text-sm w-full text-right py-4">
            Seleccionar archivo de tipo pdf,png,jpg*
          </div>
          <button
            type="submit"
            className={`btn   rounded-[5px] w-full text-white font-bold hover:scale-105 transition-all duration-200 ${
              stateSend === "loading"
                ? " cursor-not-allowed pointer-events-none bg-slate-500 "
                : " bg-red-utp p-3"
            }`}
          >
            <span>Registrar solicitud</span>
          </button>
          {stateSend === "error" && (
            <div className=" rounded-[5px] w-full px-3 py-1 bg-red-300 flex gap-3 items-center text-red-900 mt-3">
              <FontAwesomeIcon icon={faXmark} /> <span>Error de envio </span>
            </div>
          )}

          {stateSend === "success" && (
            <div className="rounded-[5px] w-full px-3 py-1  flex gap-3 items-center bg-green-300 text-green-900 mt-3">
              <FontAwesomeIcon icon={faCheck} />{" "}
              <span>La solicitud ha sido creada con éxito</span>
            </div>
          )}
        </form>
      </div>
    );
  }
};
