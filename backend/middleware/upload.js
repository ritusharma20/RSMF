// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/stories/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({ storage });



// export default upload;


// ye mera cv add krk cv m rkhta tha 
// import multer from "multer";
// import fs from "fs";

// // 🔥 ensure folders exist
// const makeDir = (path) => {
//   if (!fs.existsSync(path)) {
//     fs.mkdirSync(path, { recursive: true });
//   }
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {

//     if (file.fieldname === "cv") {
//       makeDir("uploads/cv");
//       cb(null, "uploads/cv"); // ✅ CV folder
//     }

//     else if (file.fieldname === "image") {
//       makeDir("uploads/stories");
//       cb(null, "uploads/stories"); // ✅ image folder
//     }

//     else {
//       cb(new Error("Invalid field ❌"), false);
//     }
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// // 🔥 FILE FILTER
// const fileFilter = (req, file, cb) => {

//   // ✅ CV → only PDF
//   if (file.fieldname === "cv") {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDF allowed for CV ❌"), false);
//     }
//   }

//   // ✅ IMAGE → only images
//   else if (file.fieldname === "image") {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only Image allowed ❌"), false);
//     }
//   }

//   else {
//     cb(new Error("Invalid file type ❌"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;

import multer from "multer";
import fs from "fs";

// 🔥 ensure folder exists
const makeDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    // ✅ CV
    if (file.fieldname === "cv") {
      makeDir("uploads/cv");
      cb(null, "uploads/cv");
    }

    // ✅ STORY IMAGE
    else if (file.fieldname === "image") {
      makeDir("uploads/stories");
      cb(null, "uploads/stories"); // 👈 stories me hi jayega
    }

    // ✅ REPORT PDF
    else if (file.fieldname === "pdf") {
      makeDir("uploads/reports");
      cb(null, "uploads/reports");
    }

    else {
      cb(new Error("Invalid field ❌"), false);
    }
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// 🔥 FILE FILTER
const fileFilter = (req, file, cb) => {

  // CV → PDF only
  if (file.fieldname === "cv") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF allowed for CV ❌"), false);
    }
  }

  // STORY IMAGE → only images
  else if (file.fieldname === "image") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed ❌"), false);
    }
  }

  // REPORT → PDF only
  else if (file.fieldname === "pdf") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF allowed for Report ❌"), false);
    }
  }

  else {
    cb(new Error("Invalid file type ❌"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;