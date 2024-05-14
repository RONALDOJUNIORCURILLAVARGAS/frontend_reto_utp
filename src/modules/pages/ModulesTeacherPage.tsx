
import { ModulesLayout } from "../layout/ModulesLayout";
import { DropdownFilter } from "../components/DropdownFilter";
import { StudentBoard } from "../components/StudentBoard";
import { ModalRegisterRequest } from "../components/ModalRegisterRequest";
import { useState } from "react";

export const ModulesTeacherPage = () => {
 


  
   const [modalData, setModalData] = useState<any>(null);
   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
 

   const handleOpenModal = (data: any) => {
     setModalData(data);
     setIsModalVisible(true);
   };
   const handleCloseModal = () => {
    console.log('serrando modal');
     setIsModalVisible(false);
     //setModalData(null);
   }
 
  return (
    <>
      <ModulesLayout>
        <div>
          <div className="w-full text-[40px] mt-4 font-semibold">
            Listado de notas
          </div>
          <DropdownFilter/>
          <StudentBoard  onSendDataModal={handleOpenModal} />
        </div>
      </ModulesLayout>
      <ModalRegisterRequest 
      isVisible={isModalVisible}
      onClose={handleCloseModal}
      data={modalData} />
    </>
  );
};
