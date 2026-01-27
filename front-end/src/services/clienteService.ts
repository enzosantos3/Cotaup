import { ClienteDTO } from "@/types/cliente";

const getBaseURL = () => {
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_API_URL
            ? `http://localhost:3000${process.env.NEXT_PUBLIC_API_URL}`
            : 'http://localhost:3000/api';
    }
    return process.env.NEXT_PUBLIC_API_URL || '/api';
};

export const clienteService = {

    getAllClientes: async (): Promise<ClienteDTO[]> => {
        const response = await fetch(`${getBaseURL()}/clientes`, {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
    },

    getClienteById: async (id: number): Promise<ClienteDTO> => {
        const response = await fetch(`${getBaseURL()}/clientes/${id}`, {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao buscar cliente');
        return response.json();
    },

    postCriarCliente: async (cliente: Omit<ClienteDTO, 'id'>) : Promise<ClienteDTO> => {
        const response = await fetch(`${getBaseURL()}/clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
    }
};
