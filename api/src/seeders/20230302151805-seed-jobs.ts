import { QueryInterface } from 'sequelize';

const up = (queryInterface: QueryInterface): Promise<number | object> =>
  queryInterface.sequelize.transaction(async (transaction) => {
    const jobs = [
      {
        id: '2c1d76c2-a96a-4864-91e1-edfafdaa26a7',
        description: 'work',
        price: 200,
        contractId: '522373ca-7242-4324-bd0b-74dcb0f28d1b',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '06f74fd7-26c6-48e9-a0f5-9225caaa8fc2',
        description: 'work',
        price: 201,
        contractId: '44d99162-8ed6-4b15-8328-a4ae7a88a986',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1b24c026-b01a-4a70-be7f-0e1f27115523',
        description: 'work',
        price: 202,
        contractId: 'f5d4c719-73f0-478e-983f-88fad57dcd07',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cd7e510a-9651-4eba-9a43-8a0e96a77a4',
        description: 'work',
        price: 200,
        contractId: '0d561a92-c95e-4e66-b577-91203403bc23',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6d22be55-b6f5-4717-9d34-38ee8f1c42db',
        description: 'work',
        price: 200,
        contractId: '3fc0c472-e125-45d3-b55d-97d808782206',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '74e2028b-3bd6-4515-a76f-929f6ff1d6d6',
        description: 'work',
        price: 2020,
        paid: true,
        paymentDate: new Date('2020-08-15T19:11:26.737Z'),
        contractId: '3fc0c472-e125-45d3-b55d-97d808782206',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6df14518-ac39-426c-80bb-82d4f2188f14',
        description: 'work',
        price: 200,
        paid: true,
        paymentDate: new Date('2020-08-15T19:11:26.737Z'),
        contractId: '44d99162-8ed6-4b15-8328-a4ae7a88a986',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'c92e64d7-e1b5-4fd7-8fb9-8de72d042b81',
        description: 'work',
        price: 200,
        paid: true,
        paymentDate: new Date('2020-08-16T19:11:26.737Z'),
        contractId: 'f5d4c719-73f0-478e-983f-88fad57dcd07',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3d0b8441-1fac-42d8-b6cd-5575f97465ef',
        description: 'work',
        price: 200,
        paid: true,
        paymentDate: new Date('2020-08-17T19:11:26.737Z'),
        contractId: '522373ca-7242-4324-bd0b-74dcb0f28d1b',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9b322328-4d2c-4955-a094-65bda8a8acbb',
        description: 'work',
        price: 200,
        paid: true,
        paymentDate: new Date('2020-08-17T19:11:26.737Z'),
        contractId: 'eece2a64-bb97-4728-802d-e78f83eb5bcd',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f99dc6bf-d97c-4f0d-9232-ff7cd58118bb',
        description: 'work',
        price: 21,
        paid: true,
        paymentDate: new Date('2020-08-10T19:11:26.737Z'),
        contractId: '522373ca-7242-4324-bd0b-74dcb0f28d1b',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f88b2631-9682-4701-ac50-178e05d8cd68',
        description: 'work',
        price: 21,
        paid: true,
        paymentDate: new Date('2020-08-15T19:11:26.737Z'),
        contractId: '44d99162-8ed6-4b15-8328-a4ae7a88a986',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '46f2e48f-bca6-4792-aba5-d17bb18708b1',
        description: 'work',
        price: 121,
        paid: true,
        paymentDate: new Date('2020-08-15T19:11:26.737Z'),
        contractId: 'f5d4c719-73f0-478e-983f-88fad57dcd07',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5552af04-8fe4-48d1-89e9-c48d44816735',
        description: 'work',
        price: 121,
        paid: true,
        paymentDate: new Date('2020-08-14T23:11:26.737Z'),
        contractId: 'f5d4c719-73f0-478e-983f-88fad57dcd07',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return Promise.all([
      queryInterface.bulkInsert('Jobs', jobs, {
        transaction,
        // @ts-ignore
        ignoreDuplicates: true,
      }),
    ]);
  });

const down = (queryInterface: QueryInterface): Promise<object | object> => queryInterface.bulkDelete('Jobs', {});

export { down, up };
