import styled from 'styled-components'

export const App = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh; 
  background-color: #288c9d;
`;

export const Main = styled.main`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #fff;
  color: #666;
  flex: 1;
  width: 100%;
  padding-bottom: 3rem;
`;