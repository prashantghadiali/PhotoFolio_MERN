import * as React from 'react';
import Home from './components/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AlbumItem from './components/AlbumItem';
import Navbar from './components/Navbar';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          children: [
            {
              index: true,
              element: <Home />
            },
            {
              path: "/albumItem/:id",
              element: <AlbumItem />
            }
          ]
        }
      ],
    },
  ]);
  return (
    <>    
      <RouterProvider router={router} />
    </>
  );
}

export default App;
