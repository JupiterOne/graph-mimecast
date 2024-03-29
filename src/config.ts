import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
  IntegrationIngestionConfigFieldMap,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';
import { INGESTION_SOURCE_IDS } from './steps/constants';

/**
 * A type describing the configuration fields required to execute the
 * integration for a specific account in the data provider.
 *
 * When executing the integration in a development environment, these values may
 * be provided in a `.env` file with environment variables. For example:
 *
 * - `CLIENT_ID=123` becomes `instance.config.clientId = '123'`
 * - `CLIENT_SECRET=abc` becomes `instance.config.clientSecret = 'abc'`
 *
 * Environment variables are NOT used when the integration is executing in a
 * managed environment. For example, in JupiterOne, users configure
 * `instance.config` in a UI.
 */
export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  clientId: {
    type: 'string',
  },
  clientSecret: {
    type: 'string',
    mask: true,
  },
  appKey: {
    type: 'string',
    mask: true,
  },
  appId: {
    type: 'string',
  },
};

/**
 * Properties provided by the `IntegrationInstance.config`. This reflects the
 * same properties defined by `instanceConfigFields`.
 */
export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The provider API client ID used to authenticate requests.
   */
  clientId: string;

  /**
   * The provider API client secret used to authenticate requests.
   */
  clientSecret: string;

  /**
   * The appKey for your JupiterOne integration with your mimecast account. Used to authenticate requests.
   */
  appKey: string;

  /**
   * The appId for your JupiterOne integration with your mimecast account. Used to authenticate requests.
   */
  appId: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.clientId || !config.clientSecret) {
    throw new IntegrationValidationError(
      'Config requires all of {clientId, clientSecret, appKey, appId}',
    );
  }

  const apiClient = createAPIClient(config, context.logger);
  await apiClient.verifyAuthentication();
}

export const ingestionConfig: IntegrationIngestionConfigFieldMap = {
  [INGESTION_SOURCE_IDS.AWARENESS_CAMPAIGNS]: {
    title: 'Mimecast Awareness Campaigns',
    description:
      'Organized effort aimed at educating employees about cybersecurity.',
    defaultsToDisabled: false,
    cannotBeDisabled: false,
  },
  [INGESTION_SOURCE_IDS.DOMAINS]: {
    title: 'Mimecast Domains',
    description: 'A web address or email domain being secured by Mimecast.',
    defaultsToDisabled: false,
    cannotBeDisabled: false,
  },
  [INGESTION_SOURCE_IDS.USERS]: {
    title: 'Mimecast Users',
    description:
      "An individual using Mimecast's email and web security services.",
    defaultsToDisabled: false,
    cannotBeDisabled: false,
  },
};
