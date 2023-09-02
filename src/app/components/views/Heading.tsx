import React from 'react'

const Heading = ({heading, details}: {heading:string, details:string}) => {
  return (
    <div className="text-center space-y-3">
      <p className="text-blue-800 text-sm">{heading}</p>
      <h3 className="text-3xl text-gray-800 font-bold capitalize">{details}</h3>
    </div>
  );
}

export default Heading