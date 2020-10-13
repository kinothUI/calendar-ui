/**
 * Helper function to produce the right shape of a reducer-action
 */
export function action(type, payload) {
  return {
    type,
    ...payload,
  };
}
