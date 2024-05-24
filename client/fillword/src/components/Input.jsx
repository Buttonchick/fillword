
import React, { useState,useEffect} from 'react';




const Input = ({ index,row, element,element_value, number, number_value, handleInputNameChange}) => {


    const [outputElement, setOutputElement] = useState(element || "");
    const [outputNumber, setOutputNumber] = useState(number);

    useEffect(() => {
        handleInputNameChange(index, [outputElement, outputNumber]);
    }, [outputElement, outputNumber]);



    let element_style;
    let element_isDisabled;

    switch (element_value) {
        case 1:
          element_style = { backgroundColor: 'bg-lime-500', color: 'text-white' };
          element_isDisabled = true;
          break;
        case 2:
          element_style = { backgroundColor: 'bg-amber-400', color: 'text-black' };
          element_isDisabled = true;
          break;
        case 3:
          element_style = { backgroundColor: 'bg-gray-500', color: 'text-white' };
          element_isDisabled = true;
          break;
        default:
          element_style = { backgroundColor: 'bg-white ', color: 'text-black' };
          element_isDisabled = false;
          
      }

      let number_style;
      let number_isDisabled;

      switch (number_value) {
        case 1:
          number_style = 'hidden';
          number_isDisabled = true;
          break;
        case 2:
          number_style = 'fill-red-500';
          number_isDisabled = true;
          break;
        case 3:
          number_style = 'fill-blue-500 rotate-180';
          number_isDisabled = true;
          break;
        default:
          number_style = 'hidden';
          number_isDisabled = false;
          
      }
      
      

return (
    <div
      className={`
        flex flex-col  items-center justify-center
        rounded-md shadow-md w-20 h-20 mx-1 p-2 
        ${element_style.backgroundColor}
      `}
    >

       

        <input
            key={'input_'+row+'_'+index}
            type="text"
            disabled={element_isDisabled}
            value={element}
            className={`text-center text-2xl font-semibold rounded-md w-full h-full`}
            onChange={(e) => {
              let input = e.target.value;
              input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
              setOutputElement(input);
            }}
            
            maxLength={2}
        />

       {(number)&& <div className='flex flex-row justify-between items-center mt-2'>


        <input
            key={'input_'+row+'_'+index}
            type="text"
            disabled={number_isDisabled}
            value={number}
            className={`text-center italic rounded-md w-full h-wull`}
            onChange={(e) => {
                setOutputNumber(e.target.value);
            }}

            
            
        />


        
        <svg className = {`h-4 w-4 absolute  ${number_style}`} xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" >
          <path  d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/>
        </svg>
        
        </div>}
    </div>
  );
};

export default Input;