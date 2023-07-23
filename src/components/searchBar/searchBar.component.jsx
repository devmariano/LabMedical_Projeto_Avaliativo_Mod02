import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ setValorBuscado }) => {
  return (
    <InputGroup className="flex mr-4 items-center justify-center">
      <InputGroup.Text className="text-orange-500 w-5 h-6">
        <AiOutlineSearch />
      </InputGroup.Text>
      <Form.Control
        className='h-6 rounded-md w-28 md:w-auto border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-orange-400 text-left'
        type='text'
        placeholder='Digite o nome do paciente'
        onChange={(e) => setValorBuscado(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;