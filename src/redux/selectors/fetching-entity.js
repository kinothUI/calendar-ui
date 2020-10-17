import _ from 'lodash';
import { EntityDescriptions } from 'redux/reducers/entity';

export function getFetchingEntity(state) {
  /**
   * @type {String}
   */
  const entity = _.find(EntityDescriptions, (entityDescription) => {
    const entityReducer = state.entities[entityDescription.toLowerCase()];

    return entityReducer.isFetching && entityDescription;
  });

  if (entity) return _.camelCase(entity);

  return undefined;
}
