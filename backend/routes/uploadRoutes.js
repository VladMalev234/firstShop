import path from  'path'
import express from 'express'
import multer from 'multer'
const router = express.Router() 

// для того чтоб загружать или добавлять файлы картинки при обновлении товара
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')

    },
    filename(req, file, cd){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    },
})

//для проверки типа файла который загружает пользователь для отсеивания ненужных
function checkFileType (file, cb) {
    //регулярное выражени для проверки
    const filetypes = /jpg|png|jpeg/
    //возвращает true если разрешения фала совпадет с регулярным выражением
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only')
    }
}

const upload = multer({
    storage,
    fieleFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

//upload.single - количество картинок которое можн загрузить
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router