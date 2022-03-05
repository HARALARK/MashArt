import multer from "multer"
import path from "path"

const imageStorage = multer.memoryStorage({
  destination: "backend/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|webp)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"))
    }
    cb(undefined, true)
  },
})

export { upload }
