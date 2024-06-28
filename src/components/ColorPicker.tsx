// import { useState } from 'react';
// import { SketchPicker } from 'react-color';

// const ColorPicker = () => {
//   const [color, setColor] = useState('#ffffff');
//   const [displayColorPicker, setDisplayColorPicker] = useState(false);

//   const handleClick = () => {
//     setDisplayColorPicker(!displayColorPicker);
//   };

//   const handleClose = () => {
//     setDisplayColorPicker(false);
//   };

//   const handleChange = (color: any) => {
//     setColor(color.hex);
//   };

//   return (
//     <div className="relative">
//       <div
//         className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
//         style={{ backgroundColor: color }}
//         onClick={handleClick}
//       />
//       {displayColorPicker ? (
//         <div className="absolute z-10">
//           <div
//             className="fixed top-0 right-0 bottom-0 left-0"
//             onClick={handleClose}
//           />
//           <SketchPicker color={color} onChange={handleChange} />
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default ColorPicker;
