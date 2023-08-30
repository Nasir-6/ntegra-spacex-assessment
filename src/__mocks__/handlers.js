import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  // Handles a GET allLaunches request
  rest.get('https://api.spacexdata.com/v4/launches', (req, res, ctx) =>
    res(
      ctx.json([
        {
          date_utc: '2006-03-24T22:30:00.000Z',
          details: 'Engine failure at 33 seconds and loss of vehicle',
          id: '5eb87cd9ffd86e000604b32a',
          launchpad: '5e9e4502f5090995de566f86',
          name: 'FalconSat',
          rocket: '5e9d0d95eda69955f709d1eb',
          success: false,
        },
        {
          date_utc: '2007-03-21T01:10:00.000Z',
          details:
            'Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage',
          id: '5eb87cdaffd86e000604b32b',
          launchpad: '5e9e4502f5090995de566f86',
          name: 'DemoSat',
          rocket: '5e9d0d95eda69955f709d1eb',
          success: false,
        },
        {
          date_utc: '2008-08-03T03:34:00.000Z',
          details: 'Residual stage 1 thrust led to collision between stage 1 and stage 2',
          id: '5eb87cdbffd86e000604b32c',
          launchpad: '5e9e4502f5090995de566f86',
          name: 'Trailblazer',
          rocket: '5e9d0d95eda69955f709d1eb',
          success: false,
        },
        {
          date_utc: '2008-09-28T23:15:00.000Z',
          details:
            'Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1',
          id: '5eb87cdbffd86e000604b32d',
          launchpad: '5e9e4502f5090995de566f86',
          name: 'RatSat',
          rocket: '5e9d0d95eda69955f709d1eb',
          success: true,
        },
        {
          date_utc: '2009-07-13T03:35:00.000Z',
          details: null,
          id: '5eb87cdcffd86e000604b32e',
          launchpad: '5e9e4502f5090995de566f86',
          name: 'RazakSat',
          rocket: '5e9d0d95eda69955f709d1eb',
          success: true,
        },
        {
          date_utc: '2022-11-18T22:00:00.000Z',
          details: null,
          id: '633f71cc0531f07b4fdf59c0',
          launchpad: '5e9e4502f509094188566f88',
          name: 'CRS-26',
          rocket: '5e9d0d95eda69973a809d1ec',
          success: null,
        },
        {
          date_utc: '2022-11-01T00:00:00.000Z',
          details: null,
          id: '633f71820531f07b4fdf59bd',
          launchpad: '5e9e4501f509094ba4566f84',
          name: 'Starlink 4-37 (v1.5)',
          rocket: '5e9d0d95eda69973a809d1ec',
          success: null,
        },
        {
          date_utc: '2022-11-01T00:00:00.000Z',
          details: null,
          id: '6243ba08af52800c6e919270',
          launchpad: '5e9e4501f509094ba4566f84',
          name: 'O3b mPower 1,2',
          rocket: '5e9d0d95eda69973a809d1ec',
          success: null,
        },
        {
          date_utc: '2022-12-05T00:00:00.000Z',
          details: null,
          id: '633f724c0531f07b4fdf59c5',
          launchpad: '5e9e4502f509092b78566f87',
          name: 'SWOT',
          rocket: '5e9d0d95eda69973a809d1ec',
          success: null,
        },
        {
          date_utc: '2022-11-01T00:00:00.000Z',
          details: null,
          id: '633f72000531f07b4fdf59c2',
          launchpad: '5e9e4501f509094ba4566f84',
          name: 'SES-18 & SES-19',
          rocket: '5e9d0d95eda69973a809d1ec',
          success: null,
        },
        {
          date_utc: '2022-12-01T00:00:00.000Z',
          details: null,
          id: '633f72580531f07b4fdf59c6',
          launchpad: '5e9e4501f509094ba4566f84',
          name: 'Transporter-6',
          rocket: '5e9d0d95eda69973a809d1ec',
          success: null,
        },
      ])
    )
  ),

  // The ones below handle some of the GET LaunchById requests which are mocked for testing
  rest.get('https://api.spacexdata.com/v4/launches/5eb87cd9ffd86e000604b32a', (req, res, ctx) =>
    res(
      ctx.json({
        date_utc: '2006-03-24T22:30:00.000Z',
        details: 'Engine failure at 33 seconds and loss of vehicle',
        id: '5eb87cd9ffd86e000604b32a',
        launchpad: '5e9e4502f5090995de566f86',
        name: 'FalconSat',
        rocket: '5e9d0d95eda69955f709d1eb',
        success: false,
      })
    )
  ),

  rest.get('https://api.spacexdata.com/v4/launches/5eb87cdbffd86e000604b32d', (req, res, ctx) =>
    res(
      ctx.json({
        date_utc: '2008-09-28T23:15:00.000Z',
        details:
          'Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1',
        id: '5eb87cdbffd86e000604b32d',
        launchpad: '5e9e4502f5090995de566f86',
        name: 'RatSat',
        rocket: '5e9d0d95eda69955f709d1eb',
        success: true,
      })
    )
  ),

  rest.get('https://api.spacexdata.com/v4/launches/633f72580531f07b4fdf59c6', (req, res, ctx) =>
    res(
      ctx.json({
        date_utc: '2022-12-01T00:00:00.000Z',
        details: null,
        id: '633f72580531f07b4fdf59c6',
        launchpad: '5e9e4501f509094ba4566f84',
        name: 'Transporter-6',
        rocket: '5e9d0d95eda69973a809d1ec',
        success: null,
      })
    )
  ),
];

// 11 get alllaunches to test pages etc.!
