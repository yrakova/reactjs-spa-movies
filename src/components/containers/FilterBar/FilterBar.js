import React from 'react';
import { connect } from 'react-redux';
import FilterItem from '~/components/FilterItem';
import { GENRES } from '~/services/mock-data';
import {
  actionUiAddFilter,
  actionUiRemoveFilter,
} from '../../../store/actions/search-actions';

const FilterBar = ({
  selectedGenres,
  addFilter,
  removeFilter,
}) => {
  const onFilterItemToggle = (title, selected) => {
    if (selected) {
      addFilter(title);
    } else {
      removeFilter(title);
    }
  };

  const isSelected = (genre) => selectedGenres.includes(genre);

  return GENRES.map((genre) => (
    <FilterItem
      key={genre}
      title={genre}
      selected={isSelected(genre)}
      onToggle={onFilterItemToggle}
    />
  ));
};

FilterBar.propTypes = {};

FilterBar.defaultProps = {};

const mapStateToProps = (state) => ({
  selectedGenres: state.searchReducer.filters,
});

const mapDispatchToProps = (dispatch) => ({
  addFilter: (filter) => dispatch(actionUiAddFilter(filter)),
  removeFilter: (filter) => dispatch(actionUiRemoveFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
