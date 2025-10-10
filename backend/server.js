import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://event-management-frontend-xlhq.onrender.com"
}));

app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcho030.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  status: String
});
const Event = mongoose.model('Event', eventSchema);


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    
    // Generate a simple token (in production, use JWT)
    const token = `token_${user._id}_${Date.now()}`;
    
    res.json({ 
      message: 'Login successful', 
      user: { id: user._id, name: user.name, email: user.email },
      token: token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});


app.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.patch('/events/:id', async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE event by ID
app.delete("/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
