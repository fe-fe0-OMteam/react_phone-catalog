import { Route, Routes } from 'react-router-dom';
import { Default } from './Default';
import { Phones } from './Phones/Phones';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="/phones" element={<Phones />}>
        <Route path=":phoneId" />
      </Route>
    </Routes>
  );
};
