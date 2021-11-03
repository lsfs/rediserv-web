export type UsuarioJwt = {
  serialVersionUID?: number,
  id: number,
  email: string,
  nome: string,
  authorities: string[],
  unidade: number,
  cargo: number
} ;
