import React from 'react';
import { InputGroup } from 'react-bootstrap';
import { CustomFormControl, CustomAiOutlineSearch, CustomInputGroupText } from './SearchBar.style';

const SearchBar = ({ setValorBuscado }) => {
  return (
    <InputGroup className="flex mr-4 items-center justify-center">
      <CustomInputGroupText>
        <CustomAiOutlineSearch />
      </CustomInputGroupText>
      <CustomFormControl
        className='border-3'
        type='text'
        placeholder='Digite o nome do paciente'
        onChange={(e) => setValorBuscado(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;