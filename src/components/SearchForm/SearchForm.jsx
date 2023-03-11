import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    search: '',
  };

  onChange = e => {
    this.setState({ search: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.search);
    e.target.reset();
  };

  render() {
    const { onChange, onSubmit } = this;
    return (
      <SearchFormStyled onSubmit={onSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={onChange}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
