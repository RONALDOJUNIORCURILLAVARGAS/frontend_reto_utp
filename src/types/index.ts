export interface StudentRow  {
    estado_solicitud_id:    boolean;
    alumno_nombres:         string;
    alumno_apellidos:       string;
    alumno_codigo:          string;
    nota_valor:             number;
    tipo_evaluacion_id:     number;
    tipo_evaluacion_nombre: string;
    solicitud_id:           number | null;
    nota_id:                number;
};