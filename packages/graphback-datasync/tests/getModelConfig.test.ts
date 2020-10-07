import { getModelConfigFromGlobal, ClientSideWins, ServerSideWins } from "../src";

describe('getModelConfigFromGlobal', () => {

  it ('can set default config without configuration', () => {
    expect(getModelConfigFromGlobal('Test')).toMatchObject({
      enabled: false,
      conflictResolution: ClientSideWins,
      deltaTTL: 172800,
    })
    expect(getModelConfigFromGlobal('Test', undefined)).toMatchObject({
      enabled: false,
      conflictResolution: ClientSideWins,
      deltaTTL: 172800,
    })
  })

  it ('can override default config', () => {
    expect(getModelConfigFromGlobal('Test', { enabled: true })).toMatchObject({
      enabled: true,
      conflictResolution: ClientSideWins,
      deltaTTL: 172800,
    });

    expect(getModelConfigFromGlobal('Test', { enabled: true, models: { Test: { deltaTTL: 30, conflictResolution: ServerSideWins }} })).toMatchObject({
      enabled: true,
      conflictResolution: ServerSideWins,
      deltaTTL: 30,
    });
  })
})