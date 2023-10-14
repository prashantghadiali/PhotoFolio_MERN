const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PhotoFolio');
  console.log("Database Connected...");
}

const albumSchema = new mongoose.Schema({
  album: String,
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
});

const Album = mongoose.model('Album', albumSchema);

const imageSchema = new mongoose.Schema({
  title: String,
  path: String,
  album: String
});

const Image = mongoose.model('Image', imageSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded())

server.get("/getalbums", async (req, res) => {
  try {
    const docs = await Album.find({});
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

server.post('/addalbum', async (req, res) => {
  try {
    console.log("from backend:", req.body);
    const albumObject = new Album({ album: req.body.album });
    const doc = await albumObject.save();
    console.log("saved data in DB:", doc);
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

server.get('/albumItem/:id', async (req, res) => {
  try {
    const albumId = req.params.id;
    const albumItem = await Album.findById(albumId);
    console.log("Backend ID", albumItem);
    res.json(albumItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

server.post("/addimage", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { title, path, albumId } = req.body;
    // Find the album by ID
    const album = await Album.findById(albumId);
    console.log("backend", title, path, album);
    // Create a new image and add it to the album
    const image = new Image({
      title,
      path,
      album:albumId
    });
    await image.save();
    album.images.push(image);
    await album.save();
    console.log("saved in backend...");
    return res.json(image);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});


server.get("/getimages/:id", async (req, res) => {
  try {
    console.log("backend album id", req.params.id);
    const albumId = req.params.id;
    const images = await Image.find({album: albumId});
    if (!images || images.length === 0) {
      return res.status(404).json([])
    }
    console.log("images", images);
    return res.json(images)
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
})

// delete image object
server.delete('/deleteimg/:id', (req, res) => {
  const  id  = req.params.id;
  console.log("backend delete id :", id);
  // Delete the object with the specified ID from the database
  Image.deleteOne({ _id: id })
      .then(() => {
        console.log('Image deleted successfully');
        return res.json({messeage: "Image deleted successfully"})
      })
      .catch((err) => {
        console.error(err);
      });
});

server.patch('/edit/', async (req, res) => {
  console.log("patch body :", req.body);
  const {editid, title, path} = req.body;
  const updateImage = await Image.findByIdAndUpdate(
        { _id: editid },
        { $set: {title:title, path:path} }
    );
  await updateImage.save();
  console.log("updated image in backend", updateImage);
  return res.json(updateImage);
  
})

server.listen(8000, () => {
  console.log("server started on port 8000");
});