interface User {
    name: string;
    email: string;
    address: string;
    cpf: string;
    birthdate: Date;
    password: string;
}

const mockupUser: User = {
  name: 'Patrick Matias',
  email: 'pms@gmail.com',
  address: 'Rua 5B n43, Fundos',
  cpf: '403.532.432-01',
  birthdate: new Date(2003, 11, 22),
  password: '123'
}

export { User, mockupUser }
