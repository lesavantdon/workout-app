const mongoose = require("mongoose");
require('dotenv').config();
const Yoga = require('../be/config/models/yoga');

const yogaData = [
  {
    type: "Hatha Yoga",
    main: [
      { pose: "Mountain Pose", sanskrit: "Tadasana" },
      { pose: "Cat-Cow Pose", sanskrit: "Marjaryasana-Bitilasana" },
      { pose: "Downward Dog", sanskrit: "Adho Mukha Svanasana" },
      { pose: "Warrior I", sanskrit: "Virabhadrasana I" },
      { pose: "Warrior II", sanskrit: "Virabhadrasana II" },
      { pose: "Triangle Pose", sanskrit: "Trikonasana" },
      { pose: "Chair Pose", sanskrit: "Utkatasana" },
      { pose: "Cobra Pose", sanskrit: "Bhujangasana" },
      { pose: "Bridge Pose", sanskrit: "Setu Bandhasana" },
      { pose: "Tree Pose", sanskrit: "Vrikshasana" },
      { pose: "Plank Pose", sanskrit: "Phalakasana" },
      { pose: "Child’s Pose", sanskrit: "Balasana" },
      { pose: "Corpse Pose", sanskrit: "Savasana" },
    ],
  },
  {
    type: "Kundalini Yoga",
    main: [
      { pose: "Spinal Flex", sanskrit: "Sukhasana Spinal Flex" },
      { pose: "Cat-Cow Pose", sanskrit: "Marjaryasana-Bitilasana" },
      { pose: "Breath of Fire in Easy Pose", sanskrit: "Sukhasana Kapalabhati" },
      { pose: "Ego Eradicator", sanskrit: "Ego Eradicator" },
      { pose: "Kundalini Lotus Pose", sanskrit: "Padmasana Kundalini" },
      { pose: "Frog Pose", sanskrit: "Mandukasana" },
      { pose: "Kirtan Kriya Meditation", sanskrit: "Kirtan Kriya" },
      { pose: "Sat Kriya", sanskrit: "Sat Kriya" },
      { pose: "Dynamic Cobra Pose", sanskrit: "Bhujangasana" },
      { pose: "Shoulder Shrugs", sanskrit: "Kundalini Shoulder Shrugs" },
      { pose: "Leg Lifts", sanskrit: "Uttanpadasana" },
      { pose: "Relaxation", sanskrit: "Savasana" },
    ],
  },
  {
    type: "Yin Yoga",
    main: [
      { pose: "Child’s Pose", sanskrit: "Balasana" },
      { pose: "Butterfly Pose", sanskrit: "Baddha Konasana" },
      { pose: "Sphinx Pose", sanskrit: "Salamba Bhujangasana" },
      { pose: "Dragon Pose", sanskrit: "Utthan Pristhasana" },
      { pose: "Shoelace Pose", sanskrit: "Gomukhasana" },
      { pose: "Twisted Root", sanskrit: "Supta Garudasana" },
      { pose: "Sleeping Swan Pose", sanskrit: "Kapotasana" },
      { pose: "Reclining Twist", sanskrit: "Supta Matsyendrasana" },
      { pose: "Half Butterfly", sanskrit: "Ardha Baddha Konasana" },
      { pose: "Caterpillar Pose", sanskrit: "Paschimottanasana" },
      { pose: "Banana Pose", sanskrit: "Bananasana" },
      { pose: "Corpse Pose", sanskrit: "Savasana" },
    ],
  },
  {
    type: "Vinyasa Yoga",
    main: [
      { pose: "Sun Salutation A", sanskrit: "Surya Namaskar A" },
      { pose: "Sun Salutation B", sanskrit: "Surya Namaskar B" },
      { pose: "Cobra Pose", sanskrit: "Bhujangasana" },
      { pose: "Upward Facing Dog", sanskrit: "Urdhva Mukha Svanasana" },
      { pose: "Warrior I", sanskrit: "Virabhadrasana I" },
      { pose: "Warrior II", sanskrit: "Virabhadrasana II" },
      { pose: "Downward Facing Dog", sanskrit: "Adho Mukha Svanasana" },
      { pose: "Chair Pose", sanskrit: "Utkatasana" },
      { pose: "Tree Pose", sanskrit: "Vrikshasana" },
      { pose: "Chaturanga Dandasana", sanskrit: "Chaturanga Dandasana" },
      { pose: "Child’s Pose", sanskrit: "Balasana" },
      { pose: "Corpse Pose", sanskrit: "Savasana" },
    ],
  },
  {
    type: "Power Yoga",
    main: [
      { pose: "Downward Dog", sanskrit: "Adho Mukha Svanasana" },
      { pose: "Warrior I", sanskrit: "Virabhadrasana I" },
      { pose: "Warrior II", sanskrit: "Virabhadrasana II" },
      { pose: "Plank Pose", sanskrit: "Phalakasana" },
      { pose: "Chaturanga Dandasana", sanskrit: "Chaturanga Dandasana" },
      { pose: "Upward Facing Dog", sanskrit: "Urdhva Mukha Svanasana" },
      { pose: "Cobra Pose", sanskrit: "Bhujangasana" },
      { pose: "Chair Pose", sanskrit: "Utkatasana" },
      { pose: "Crow Pose", sanskrit: "Bakasana" },
      { pose: "Tree Pose", sanskrit: "Vrikshasana" },
      { pose: "Boat Pose", sanskrit: "Navasana" },
      { pose: "Child’s Pose", sanskrit: "Balasana" },
    ],
  },
];

const seedYoga = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!");

    // Clear existing data
    await Yoga.deleteMany();
    console.log("Yoga collection cleared.");

    // Insert new data
    await Yoga.insertMany(yogaData);
    console.log("Yoga data seeded!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding yoga data:", error);
    mongoose.connection.close();
  }
};

seedYoga();
