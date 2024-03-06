import { QueryInterface } from 'sequelize';

const up = (queryInterface: QueryInterface): Promise<number | object> =>
  queryInterface.sequelize.transaction(async (transaction) => {
    const contracts = [
      {
        id: '522373ca-7242-4324-bd0b-74dcb0f28d1b',
        terms: 'bla bla bla',
        status: 'TERMINATED',
        clientId: '5f03cc98-448b-4433-a4a2-8d50026c093f',
        contractorId: 'de0345f3-cea3-4b9d-8d6d-046c3b6c2884',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '44d99162-8ed6-4b15-8328-a4ae7a88a986',
        terms: 'bla bla bla',
        status: 'TERMINATED',
        clientId: '5f03cc98-448b-4433-a4a2-8d50026c093f',
        contractorId: 'e9baa1cd-7222-41dd-ae3a-a00767e5abef',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f5d4c719-73f0-478e-983f-88fad57dcd07',
        terms: 'bla bla bla',
        status: 'TERMINATED',
        clientId: '17a3c052-731f-43e6-9a0d-bd72ff5eb563',
        contractorId: 'e9baa1cd-7222-41dd-ae3a-a00767e5abef',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '0d561a92-c95e-4e66-b577-91203403bc23',
        terms: 'bla bla bla',
        status: 'TERMINATED',
        clientId: '17a3c052-731f-43e6-9a0d-bd72ff5eb563',
        contractorId: '1b0bea72-2894-4dab-9233-4942b98fa009',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'eece2a64-bb97-4728-802d-e78f83eb5bcd',
        terms: 'bla bla bla',
        status: 'NEW',
        clientId: '2bf7dc56-e711-457f-8db7-2baa991b8b10',
        contractorId: '70a3684b-192d-4a32-923c-b0617ca29b8e',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '03c69d08-5db5-40a6-b3ed-6441739a94c5',
        terms: 'bla bla bla',
        status: 'IN_PROGRESS',
        clientId: '2bf7dc56-e711-457f-8db7-2baa991b8b10',
        contractorId: '1b0bea72-2894-4dab-9233-4942b98fa009',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3fc0c472-e125-45d3-b55d-97d808782206',
        terms: 'bla bla bla',
        status: 'IN_PROGRESS',
        clientId: '160fe7e5-0459-4c5a-a5d7-368af5865a07',
        contractorId: '1b0bea72-2894-4dab-9233-4942b98fa009',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2feecaca-1f8b-4fc0-88f8-68a398ba7272',
        terms: 'bla bla bla',
        status: 'IN_PROGRESS',
        clientId: '160fe7e5-0459-4c5a-a5d7-368af5865a07',
        contractorId: 'e9baa1cd-7222-41dd-ae3a-a00767e5abef',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '25d8da8f-ce11-4139-955d-3afa0f2c8607',
        terms: 'bla bla bla',
        status: 'IN_PROGRESS',
        clientId: '160fe7e5-0459-4c5a-a5d7-368af5865a07',
        contractorId: '70a3684b-192d-4a32-923c-b0617ca29b8e',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return Promise.all([
      queryInterface.bulkInsert('Contracts', contracts, {
        transaction,
        // @ts-ignore
        ignoreDuplicates: true,
      }),
    ]);
  });

const down = (queryInterface: QueryInterface): Promise<object | object> => queryInterface.bulkDelete('Contracts', {});

export { down, up };
