import React from "react";
import { Star } from "lucide-react";

// Komponen Review untuk menampilkan review individual
const Review = ({ review }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
        fill={index < rating ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{review.author}</h3>
          <p className="text-sm text-gray-500">{review.date}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex">{renderStars(review.rating)}</div>
        </div>
      </div>
      <p className="mt-3 text-gray-600">{review.text}</p>
    </div>
  );
};

// Data review
const reviews = [
  {
    author: "Nina Holloway",
    date: "29 Aug 2017",
    rating: 4,
    text: "So you're going abroad, you've chosen your destination and now you have to choose a hotel. Ten years ago, you'd have probably visited your local travel agent and trusted the face-to-face advice you were given by the so called 'experts'. Whether its a driving tour, a cruise or a bus, leaf viewing is a great way to spend",
  },
  {
    author: "Steve Fletcher",
    date: "30 Aug 2017",
    rating: 4,
    text: "hether its a driving tour, a cruise or a bus, leaf viewing is a great way to spend a fall vacation. It's also big tour business and the are many options. As you dream of that hot apple cider on a crisp afternoon do a quick check list hether its a driving tour, a cruise or a bus, leaf viewing is a great way to spend a fall vacation. It's also big tour business",
  },
  {
    author: "Oscar Rogers",
    date: "29 Aug 2017",
    rating: 3,
    text: "It's also big tour business and the are many options. As you dream of that hot apple cider on a crisp afternoon do a quick check list leaf viewing is a great way to spend a fall vacation. It's also big tour business and the are many options. As you dream of that hot apple cider on a crisp afternoon do a quick check list",
  },
];

// Komponen utama yang akan diekspor
const ReviewPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-light">
      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewPage;