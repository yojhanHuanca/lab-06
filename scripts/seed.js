import connectDB from "../src/db/database.js";
import mongoose from "mongoose";
import User from "../src/models/User.js";
import Post from "../src/models/Post.js";

await connectDB();
const examples = [
  { name: "Lucía", lastName: "Campos", email: "lucia.campos@example.test", age: 24, phoneNumber: "900000001", password: "demo2026lucia" },
  { name: "Mateo", lastName: "Rivas", email: "mateo.rivas@example.test", age: 28, phoneNumber: "900000002", password: "demo2026mateo" },
  { name: "Alma", lastName: "Flores", email: "alma.flores@example.test", age: 22, phoneNumber: "900000003", password: "demo2026alma" }
];
const users = [];
for (const example of examples) {
  const user = await User.findOneAndUpdate({ email: example.email }, { $setOnInsert: example }, { upsert: true, new: true, runValidators: true });
  users.push(user);
}
const stories = [
  { title: "La ciudad antes del ruido", content: "Un paseo al amanecer cambia la manera de mirar las calles que conocemos.", user: users[0]._id, hashtags: ["ciudad", "fotografia"], imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200" },
  { title: "Pequeñas ideas, grandes días", content: "A veces basta una conversación corta para empezar un proyecto inesperado.", user: users[1]._id, hashtags: ["ideas", "comunidad"] },
  { title: "Notas desde el jardín", content: "Aprender a cuidar una planta también es una forma de aprender a tener paciencia.", user: users[2]._id, hashtags: ["naturaleza", "vida"], imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200" },
  { title: "Una pausa para crear", content: "Reservar unos minutos para dibujar ayuda a descubrir otras formas de pensar.", user: users[0]._id, hashtags: ["arte", "creatividad"] }
];
for (const story of stories) {
  await Post.updateOne({ title: story.title, user: story.user }, { $setOnInsert: story }, { upsert: true, runValidators: true });
}
console.log(`Datos de demostración listos: ${users.length} usuarios y ${stories.length} publicaciones.`);
await mongoose.disconnect();
