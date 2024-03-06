import { QueryInterface } from 'sequelize';

const up = (queryInterface: QueryInterface): Promise<number | object> =>
  queryInterface.sequelize.transaction(async (transaction) => {
    const profiles = [
      {
        id: '5f03cc98-448b-4433-a4a2-8d50026c093f',
        firstName: 'Harry',
        lastName: 'Potter',
        profession: 'Wizard',
        balance: 1150,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '17a3c052-731f-43e6-9a0d-bd72ff5eb563',
        firstName: 'Mr',
        lastName: 'Robot',
        profession: 'Hacker',
        balance: 231.11,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2bf7dc56-e711-457f-8db7-2baa991b8b10',
        firstName: 'John',
        lastName: 'Snow',
        profession: 'Knows nothing',
        balance: 451.3,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '160fe7e5-0459-4c5a-a5d7-368af5865a07',
        firstName: 'Ash',
        lastName: 'Kethcum',
        profession: 'Pokemon master',
        balance: 1000.3,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'de0345f3-cea3-4b9d-8d6d-046c3b6c2884',
        firstName: 'John',
        lastName: 'Lenon',
        profession: 'Musician',
        balance: 64,
        type: 'CONTRACTOR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e9baa1cd-7222-41dd-ae3a-a00767e5abef',
        firstName: 'Linus',
        lastName: 'Torvalds',
        profession: 'Programmer',
        balance: 1214,
        type: 'CONTRACTOR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1b0bea72-2894-4dab-9233-4942b98fa009',
        firstName: 'Alan',
        lastName: 'Turing',
        profession: 'Programmer',
        balance: 22,
        type: 'CONTRACTOR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '70a3684b-192d-4a32-923c-b0617ca29b8e',
        firstName: 'Aragorn',
        lastName: 'II Elessar Telcontarvalds',
        profession: 'Fighter',
        balance: 314,
        type: 'CONTRACTOR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '60a3684b-192d-4a32-923c-b0617ca29b8e',
        firstName: 'Aragorn',
        lastName: 'II Elessar Telcontarvalds',
        profession: 'Fighter',
        balance: 314,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return Promise.all([
      queryInterface.bulkInsert('Profiles', profiles, {
        transaction,
        // @ts-ignore
        ignoreDuplicates: true,
      }),
    ]);
  });

const down = (queryInterface: QueryInterface): Promise<object | object> => queryInterface.bulkDelete('Profiles', {});

export { down, up };
