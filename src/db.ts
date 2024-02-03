let pacientes: string[]  = [];

export const getPaceintes = () => {
    return pacientes;
}

export const addPaciente = (paciente: string) => {
    pacientes.push(paciente);
}