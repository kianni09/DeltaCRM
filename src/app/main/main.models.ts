export interface Project {
    _id: string,
    name: string
}

export interface Service {
    _id: string,
    name: string
}

export interface Client {
    _id: string,
    project_id: string,
    name: string
}

export interface QueryTemplate {
    _id: string,
    body: Query
}

export interface Query {
    project_id: string,
    date: string,
    term: string,
    client_name: string,
    query: string,
    query_id: string,
    servicies: QueryService[],
    status: boolean
}

export interface QueryService {
    service_name: string,
    comment: string
}

export interface QueryRow {
    id: string,
    project_id: string,
    date: string,
    term: string,
    client_name: string,
    query: string,
    query_id: string,
    servicies: QueryService[],
    status: boolean
}

export interface Message {
    message_id?: number | string,
    user_id: number | string,
    user_name: string,
    date: Date,
    text: string
}