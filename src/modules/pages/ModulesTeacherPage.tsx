import { ModulesLayout } from "../layout/ModulesLayout";
import { DropdownFilter } from "../components/DropdownFilter";
import { StudentBoard } from "../components/StudentBoard";
import { ModalRegisterRequest } from "../components/ModalRegisterRequest";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { getSearchFilterTeacher } from "../../services";
import { useDispatch } from "react-redux";
import { FilterRow } from "../../types";
const initialFilter: FilterRow = {
  course: "",
  evaluation: "",
  user_token: "",
};
export const ModulesTeacherPage = () => {
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [lastFilter, setLastFilter] = useState<FilterRow>(initialFilter);

  const handleOpenModal = (data: any) => {
    setModalData(data);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
   
    setIsModalVisible(false);
    //setModalData(null);
  };
  const handleToast = (state: boolean) => {
    if (state) {
      getFilter(lastFilter)
      toast.success("La solicitud ha sido creada con éxito");
      
    } else {
      toast.error("Error al crear la solicitud, intente nuevamente");
    }
  };
  const validationInputToast = (state: boolean) => {
    if (state) {
      toast.warning("Completar los campos marcados en rojo*");
    } 
  }
  const getFilter = (filter: FilterRow) => {
    setLastFilter(filter);
    getSearchFilterTeacher(
      {
        course: filter.course,
        type_evaluation: filter.evaluation,
        user_token: filter.user_token,
      },
      dispatch
    );
  };

  return (
    <>
      <ModulesLayout>
        <div>
          <div className="w-full text-[40px] mt-4 font-semibold">
            Listado de notas
          </div>
          <DropdownFilter onSendFilter={getFilter} />
          <StudentBoard onSendDataModal={handleOpenModal} />
        </div>
      </ModulesLayout>
      <ModalRegisterRequest
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onToast={handleToast}
        onValidation={validationInputToast}
        data={modalData}
      />
      <Toaster richColors/>
    </>
  );
};
