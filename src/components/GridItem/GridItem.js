import React from "react";

function GridItem(item) {

  
  const formatValue = (value) => {
    const formattedValue = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value);
    
    return formattedValue;
  };
  
  console.log(item);
  return (
    <tr>
      <td>{item.item.nome}</td>
      <td>{item.item.nomeCategiria}</td>
      <td  className="text-center">
        {item.item.tipo === 1 ? (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" color="red" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{color: "red"}}>
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v116h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5h-67V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12z"></path>
          </svg>
        ) : (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" color="green" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{color: "green"}}>
            <path d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z"></path>
          </svg>
        )}
      </td>
      <td className="text-center">{formatValue(item.item.valor)}</td>
    </tr>
  );
}

export default GridItem;
