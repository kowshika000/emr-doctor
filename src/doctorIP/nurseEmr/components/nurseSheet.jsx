// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Checkbox,
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const accordionData = {
//   "Family History": ["Diabetes", "Thrombosis", "Hypertension", "Cancer", "Others"],
//   "Birth History": [
//     "Past Obstetrical History",
//     "Miscarriage",
//     "Baby's Sex",
//     "Remarks",
//   ],
//   "Sensitivity / Allergy": ["Drug Allergy", "Sensitivity/ Allergy"],
//   "Medication History": ["Current Medications", "Medication History"],
//   "Other History": [
//     "Smear History",
//     "Contraception",
//     "Urinary History",
//     "Sonomammogram History",
//     "Bowel History",
//     "Other History",
//   ],
// };

// function NurseSheet() {
//   const [expanded, setExpanded] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [tableData, setTableData] = useState({});
//   const [isEditing, setIsEditing] = useState({});
//   const [checkboxState, setCheckboxState] = useState({});

//   const handleAccordionChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : null);
//   };

//   const handleInputChange = (accordion, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [accordion]: { ...prev[accordion], [field]: value },
//     }));
//   };

//   const handleSave = (accordion) => {
//     setTableData((prev) => ({
//       ...prev,
//       [accordion]: formData[accordion],
//     }));
//     setIsEditing((prev) => ({
//       ...prev,
//       [accordion]: false,
//     }));
//   };

//   const handleCheckboxChange = (accordion, field, checked) => {
//     setCheckboxState((prev) => ({
//       ...prev,
//       [accordion]: { ...prev[accordion], [field]: checked },
//     }));
//   };

//   const handleAddRecords = (accordion) => {
//     setIsEditing((prev) => ({
//       ...prev,
//       [accordion]: true,
//     }));
//     setFormData((prev) => ({
//       ...prev,
//       [accordion]: tableData[accordion],
//     }));
//   };

//   const handleDelete = (accordion, field) => {
//     setTableData((prev) => {
//       const newData = { ...prev[accordion] };
//       delete newData[field];
//       return { ...prev, [accordion]: newData };
//     });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       {Object.keys(accordionData).map((accordion) => (
//         <Accordion
//           key={accordion}
//           expanded={expanded === accordion}
//           onChange={handleAccordionChange(accordion)}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls={`${accordion}-content`}
//             id={`${accordion}-header`}
//           >
//             <Typography variant="h6">{accordion}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             {isEditing[accordion] || !tableData[accordion] ? (
//               <>
//                 <Typography variant="subtitle1">
//                   Please fill the fields below:
//                 </Typography>
//                 <Grid container spacing={2} sx={{ marginTop: 2 }}>
//                   {accordionData[accordion].map((field) => (
//                     <Grid
//                       item
//                       xs={12}
//                       sm={6} // Two columns on small screens
//                       md={4} // Three columns on medium screens
//                       lg={3} // Four columns on large screens
//                       key={field}
//                     >
//                       <TextField
//                         fullWidth
//                         label={field}
//                         variant="outlined"
//                         multiline
//                         value={formData[accordion]?.[field] || ""}
//                         onChange={(e) =>
//                           handleInputChange(accordion, field, e.target.value)
//                         }
//                       />
//                       <Checkbox
//                         checked={checkboxState[accordion]?.[field] || false}
//                         onChange={(e) =>
//                           handleCheckboxChange(
//                             accordion,
//                             field,
//                             e.target.checked
//                           )
//                         }
//                       />
//                       <Typography variant="caption">
//                         Include in record
//                       </Typography>
//                     </Grid>
//                   ))}
//                 </Grid>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ marginTop: 2 }}
//                   onClick={() => handleSave(accordion)}
//                 >
//                   Save
//                 </Button>
//               </>
//             ) : (
//               <>
//                 {tableData[accordion] &&
//                 Object.keys(tableData[accordion]).length > 0 ? (
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Field Name</TableCell>
//                         <TableCell>Details</TableCell>
//                         <TableCell>Options</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {Object.keys(tableData[accordion] || {}).map((field) => (
//                         <TableRow key={field}>
//                           <TableCell>{field}</TableCell>
//                           <TableCell>{tableData[accordion][field]}</TableCell>
//                           <TableCell>
//                             <Button
//                               color="secondary"
//                               onClick={() => handleDelete(accordion, field)}
//                             >
//                               Delete
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 ) : (
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ marginTop: 2, color: "gray" }}
//                   >
//                     No records available
//                   </Typography>
//                 )}
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   sx={{ marginTop: 2 }}
//                   onClick={() => handleAddRecords(accordion)}
//                 >
//                   Add Records
//                 </Button>
//               </>
//             )}
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </div>
//   );
// }

// export default NurseSheet;


// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Checkbox,
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const accordionData = {
//   "Medical History": [
//     "Past Medical History",
//     "Past Treatment History",
//     "Socio-economic History",
//     "Hypertension (B P)",
//     "Hyper Acidity",
//     "Birth Weight",
//     "Delivery",
//     "Development History",
//     "Medical History",
//     "Past Surgical History",
//     "Special Habits",
//     "Occupational Hazards",
//     "Diabetes (Sugar)",
//     "Cardiac Disease (Heart)",
//     "Pregnancy",
//     "Neonatal",
//     "Diet History",
//     "Pacemaker",
//   ],
//   "Family History": [
//     "Diabetes",
//     "Thrombosis",
//     "Hypertension",
//     "Cancer",
//     "Others",
//   ],
//   "Birth History": [
//     "Past Obstetrical History",
//     "Miscarriage",
//     "Baby's Sex",
//     "Remarks",
//   ],
//   "Sensitivity / Allergy": ["Drug Allergy", "Sensitivity/ Allergy"],
//   "Medication History": ["Current Medications", "Medication History"],
//   "Other History": [
//     "Smear History",
//     "Contraception",
//     "Urinary History",
//     "Sonomammogram History",
//     "Bowel History",
//     "Other History",
//   ],
// };



// const labels = [
//   "Past Medical History",
//   "Past Treatment History",
//   "Socio-economic History",
//   "Hypertension (B P)",
//   "Hyper Acidity",
//   "Birth Weight",
//   "Delivery",
//   "Development History",
//   "Medical History",
//   "Past Surgical History",
//   "Special Habits",
//   "Occupational Hazards",
//   "Diabetes (Sugar)",
//   "Cardiac Disease (Heart)",
//   "Pregnancy",
//   "Neonatal",
//   "Diet History",
//   "Pacemaker",
// ];

// const AccordionComponent = ({ title }) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [tableData, setTableData] = useState([]);

//   const handleCheckboxChange = () => {
//     setIsChecked((prev) => !prev);
//   };

//   const handleInputChange = (label, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [label]: value,
//     }));
//   };

//   const handleSave = () => {
//     const newData = Object.entries(formData).map(([key, value]) => ({
//       name: key,
//       details: value,
//     }));
//     setTableData((prev) => [...prev, ...newData]);
//     setFormData({});
//     setIsChecked(false);
//   };

//   const handleEdit = (index) => {
//     const item = tableData[index];
//     setFormData({ [item.name]: item.details });
//     handleDelete(index);
//     setIsChecked(true);
//   };

//   const handleDelete = (index) => {
//     setTableData((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <Accordion>
//       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//         <Typography variant="h6">{title}</Typography>
//         <Checkbox
//           checked={isChecked}
//           onChange={handleCheckboxChange}
//           color="primary"
//         />
//       </AccordionSummary>
//       <AccordionDetails>
//         {isChecked && (
//           <Grid container spacing={2}>
//             {labels.map((label) => (
//               <Grid item xs={12} sm={6} key={label}>
//                 <TextField
//                   fullWidth
//                   label={label}
//                   multiline
//                   rows={3}
//                   value={formData[label] || ""}
//                   onChange={(e) => handleInputChange(label, e.target.value)}
//                   variant="outlined"
//                 />
//               </Grid>
//             ))}
//             <Grid item xs={12}>
//               <Button variant="contained" color="primary" onClick={handleSave}>
//                 Save
//               </Button>
//             </Grid>
//           </Grid>
//         )}
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Details</TableCell>
//               <TableCell>Options</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableData.map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.details}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => handleEdit(index)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => handleDelete(index)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// const NurseSheet = () => {
//     // return (
//     //     <>
//     //         <Box
//     //             sx={{
//     //                 display: 'flex',
//     //                 flexDirection: 'column',
//     //                 gap: 2,
//     //                 p: 2,
//     //                 borderRadius: '8px',
//     //                 backgroundColor: '#f5fcff',
//     //                 boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     //                 margin: ' auto',
//     //                 maxWidth: 'auto',
//     //                 marginTop: "15px",
//     //                 height: "600px",
//     //                 width: "auto",
//     //                 overflowY: "auto"
//     //             }}
//     //         >
//     //             <div class="row">

//     //             </div>
//     //         </Box>
//     //     </>
//     // )

//     const sections = [
//         "Medical History",
//         "Social History",
//         "Family History",
//         "Birth History",
//         "Past Obstetrical History",
//         "Sensitivity / Allergy",
//         "Medication History",
//         "Other History",
//       ];
    
//       return (
//         <Grid container spacing={2} padding={2}>
//           {sections.map((section) => (
//             <Grid item xs={12} key={section}>
//               <AccordionComponent title={section} />
//             </Grid>
//           ))}
//         </Grid>
//       );    
// }
// export default NurseSheet;