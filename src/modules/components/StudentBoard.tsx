import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { StudentRow } from "../../types";

interface StudentBoardProps {
  onSendDataModal: (data: any) => void;
}
export const StudentBoard = ({ onSendDataModal }: StudentBoardProps) => {
  const { students, lookingStudents } = useSelector(
    (state: RootState) => state.teacher
  );
  const onVisibleModal = (data: any) => {
    onSendDataModal(data);
  };
  if (lookingStudents) {
    if (students.length === 0) {
      return (
        <div className="text-center w-full min-h-[200px] flex items-center justify-center  text-[20px]">
          No se encontraron resultados para su búsqueda
        </div>
      );
    }

    return (
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-black uppercase bg-gray-50  font-bold">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Código
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Alumno
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Nota
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student: StudentRow) => (
                <tr
                  key={student.nota_id}
                  className="odd:bg-white  border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap text-gray-400"
                  >
                    {student.alumno_codigo}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {`${student.alumno_nombres} ${student.alumno_apellidos}`}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {student.nota_valor}
                  </td>

                  <td className="px-6 py-4 flex items-center justify-center">
                    {!student.estado_solicitud_id ? (
                      <button
                        type="button"
                        className="user-select-none hover:scale-105 transition-all duration-200 font-medium rounded-[5px] bg-red-utp text-white px-4 py-2 flex items-center gap-3"
                        onClick={() => {
                          onVisibleModal(student);
                        }}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Registrar Solicitud
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="pointer-events-none user-select-none font-medium rounded-[5px] bg-gray-utp text-white px-4 py-2"
                      >
                        Pendiente #{student.solicitud_id}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};
