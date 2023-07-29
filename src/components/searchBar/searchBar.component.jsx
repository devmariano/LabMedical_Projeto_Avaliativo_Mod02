import React from 'react';
import { InputGroup } from 'react-bootstrap';
import { CustomFormControl, CustomAiOutlineSearch, CustomInputGroupText } from './SearchBar.style';

const SearchBar = ({ setSearchValue }) => {
  return (
    <InputGroup className="flex mr-4 items-center justify-center">
      <CustomInputGroupText>
        <CustomAiOutlineSearch />
      </CustomInputGroupText>
      <CustomFormControl
        className='border-3'
        type='text'
        placeholder='Digite o nome do paciente'
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;