import React, { useState,useEffect } from 'react';
import Input from './components/Input'; // Импортируем компонент Input

const App = () => {
  const [rows, setRows] = useState([
    [
      {element: '', element_value: 0},
      {element: '', element_value: 0},
      {element: '', element_value: 0},
      {element: '', element_value: 0},
      {element: '', element_value: 0},
      {element: '', element_value: 0},
      {element: '', element_value: 0},
      {element: '', element_value: 0}
    ]
  ]);

  const [inputs, setInputs] = useState({});



  const handleInputNameChange = (index, value) => {

    const newRows = [...rows];
    newRows[newRows.length - 1][index].element = value[0];
    newRows[newRows.length - 1][index].number = value[1];
    setRows(newRows);
    renderRows();

    setInputs(prevInputs => ({ ...prevInputs, ["input_"+index]: value[0] + ':' + value[1]}));

  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const guess =  new URLSearchParams(inputs).toString();;
      const response = await fetch(`http://localhost:8000/api/check-elements?${guess}`);
      const data= await response.json();


      console.log(data);



      const newRows = [...rows];
      
      
      newRows.splice(newRows.length - 1, 0, data);

      data.forEach((input, index) => {
        if (input.element_value === 1) {
          newRows[newRows.length - 1][index].element_value = input.element_value; 
        }else{
          newRows[newRows.length - 1][index].element = '';
        }

        if (input.number_value === 1 && input.number) {
         
          newRows[newRows.length - 1][index].number_value = input.number_value; 
        }else{
          newRows[newRows.length - 1][index].number = input.number;
        }

        if( input.number_value === 0){
          newRows[newRows.length - 2][index].number = ''; 

        }


      });
      
      setRows(newRows);
      


    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  useEffect(() => {
    renderRows();
  }, [rows]);

  
  useEffect(() => {
    renderRows();
  }, []);


  const renderRows = () => {
    return rows.map((row, rowIndex) =>
      <div className='flex flex-row my-2'>
        {
          row.map((cell, cellIndex) => (
            <Input
              key={`${rowIndex}-${cellIndex}`}
              row={rowIndex}
              index={cellIndex}
              element={cell.element}
              element_value ={cell.element_value}
              number={cell.number}
              number_value={cell.number_value}
              handleInputNameChange={handleInputNameChange}

            />
          ))

        }
      
      </div>

    );
  };



  

  return (
    <div className='w-full flex flex-row justify-center pt-24'>

 
      <div className='w-fit flex-col'>
        <p>C,Si,Mn,Ni,S,P,Cr,Cu,Mo,V,Ti,W,Nb,Ce,Co,Zr,N,B,Ca,Р,As,Al,Fe,Pb,Zn,Ag,Sb,Bi,Sn,Cd,Mg,Na,Be</p>

        <form  className='flex flex-col my-4' onSubmit={handleSubmit}>
          {renderRows()}
        <button className=' rounded-md shadow-md w-fit px-4 h-12 mx-1 hover:bg-slate-100 uppercase' type="submit">Проверить</button>
        
        </form>

       
      </div>




    </div>
  );
};

export default App;