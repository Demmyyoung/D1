// Consolidated model data — each entry powers a full archive profile
// Add or remove models here to update the talent gallery

const models = [
  {
    slug: "david",
    name: "David",
    archiveName: "David's Archive",
    guestUsername: "Guest_Client",
    tagline: "Model · Creative · Muse",
    bio: "Lagos-based model with a passion for editorial and high-fashion work. Currently represented by select agencies across West Africa. Open to international bookings.",
    stats: {
      height: "5'10\"",
      bust: '32"',
      waist: '24"',
      hips: '35"',
      shoe: "9 US",
      eyes: "Brown",
      hair: "Black",
    },
    agency: "Independent",
    location: "Lagos, Nigeria",
    contact: "bookings@david.com",
    joined: "February 2026",
    profilePhoto: "/photos/IMG_4290.jpg",
    photos: [
      {
        id: 1,
        src: "/photos/IMG_4290.jpg",
        caption: "Studio session — natural light",
        date: "February 20, 2026",
        album: "Studio",
      },
      {
        id: 2,
        src: "/photos/IMG_4292.jpg",
        caption: "Editorial look",
        date: "February 19, 2026",
        album: "Studio",
      },
      {
        id: 3,
        src: "/photos/IMG_4396.jpg",
        caption: "On location",
        date: "February 15, 2026",
        album: "On Location",
      },
      {
        id: 4,
        src: "/photos/IMG_5279.jpg",
        caption: "Golden hour portrait",
        date: "February 10, 2026",
        album: "Portraits",
      },
      {
        id: 5,
        src: "/photos/IMG_5660.jpg",
        caption: "Campaign shoot",
        date: "February 5, 2026",
        album: "Campaigns",
      },
      {
        id: 6,
        src: "/photos/IMG_5661.jpg",
        caption: "Behind the scenes",
        date: "January 28, 2026",
        album: "Campaigns",
      },
      {
        id: 7,
        src: "/photos/IMG_5662.jpg",
        caption: "Monochrome series",
        date: "January 20, 2026",
        album: "Portraits",
      },
    ],
  },
];

export default models;

// Helper: find a model by slug
export function getModelBySlug(slug) {
  return models.find((m) => m.slug === slug) || null;
}

// Helper: get albums for a specific model's photos
export function getModelAlbums(photos) {
  const albumMap = {};
  photos.forEach((photo) => {
    if (!albumMap[photo.album]) {
      albumMap[photo.album] = [];
    }
    albumMap[photo.album].push(photo);
  });
  return albumMap;
}
