export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number; // 1 -> 5
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  rating: number;
  price: number;
  cover: string;
  description: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export const INITIAL_BOOKS: Book[] = [
  {
    id: "1",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    genre: "Kỹ năng sống",
    pages: 228,
    rating: 4.8,
    price: 85000,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    description:
      "Nhà Giả Kim là cuốn sách kinh điển về hành trình theo đuổi ước mơ và lắng nghe tiếng gọi từ trái tim. Cuốn sách giúp bạn nhận ra những dấu hiệu của vũ trụ và tìm thấy kho báu thực sự của cuộc đời mình.",
  },
  {
    id: "2",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    genre: "Kỹ năng sống",
    pages: 320,
    rating: 4.6,
    price: 90000,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    description:
      "Nghệ thuật thu phục lòng người và đối nhân xử thế xuất sắc nhất mọi thời đại. Một cuốn sách nền tảng cho sự thành công trong công việc và các mối quan hệ xã hội.",
  },
  {
    id: "3",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    genre: "Kỹ năng sống",
    pages: 280,
    rating: 4.3,
    price: 75000,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    description:
      "Cuốn sách truyền cảm hứng sống tích cực, chủ động học hỏi và trải nghiệm cho thế hệ trẻ. Bạn hối tiếc vì những gì mình đã làm hay những gì mình chưa từng dám làm?",
  },
  {
    id: "4",
    title: "Harry Potter và Hòn Đá Phù Thủy",
    author: "J.K. Rowling",
    genre: "Văn học",
    pages: 350,
    rating: 4.9,
    price: 120000,
    cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400",
    description:
      "Tác phẩm giả tưởng lừng danh đưa độc giả bước vào thế giới phù thủy Hogwarts đầy màu sắc ma thuật, tình bạn diệu kỳ và lòng dũng cảm phi thường.",
  },
  {
    id: "5",
    title: "Hoàng Tử Bé",
    author: "Antoine de Saint-Exupéry",
    genre: "Văn học",
    pages: 120,
    rating: 4.7,
    price: 65000,
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
    description:
      "Tác phẩm văn học kinh điển về tình yêu thương, sự ngây thơ và những giá trị cốt lõi vô hình mà mắt trần không thể nhìn thấy được.",
  },
  {
    id: "6",
    title: "Lược Sử Loài Người (Sapiens)",
    author: "Yuval Noah Harari",
    genre: "Lịch sử",
    pages: 512,
    rating: 4.8,
    price: 185000,
    cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400",
    description:
      "Một cái nhìn bao quát đầy kinh ngạc về tiến trình phát triển của giống loài Homo Sapiens từ thời kỳ đồ đá cho đến kỷ nguyên trí tuệ nhân tạo.",
  },
];

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  "1": [
    {
      id: "rev_1",
      userName: "Nguyễn Văn Đức",
      rating: 5,
      comment: "Cuốn sách rất hay và giàu tính nhân văn! Đọc đi đọc lại nhiều lần vẫn thấy thấm thía.",
      date: "2026-10-18",
    },
    {
      id: "rev_2",
      userName: "Lê Văn Nguyên",
      rating: 4.5,
      comment: "Nội dung truyền cảm hứng tuyệt vời, bìa đẹp, giao hàng nhanh.",
      date: "2026-10-19",
    },
  ],
  "2": [
    {
      id: "rev_3",
      userName: "Trần Mai Anh",
      rating: 5,
      comment: "Cuốn sách gối đầu giường của mọi người, kỹ năng giao tiếp rất thực tế.",
      date: "2026-10-17",
    },
  ],
  "3": [
    {
      id: "rev_4",
      userName: "Đoàn Thị Thảo Nguyên",
      rating: 4,
      comment: "Rất phù hợp cho các bạn sinh viên đang tìm hướng đi cho tương lai.",
      date: "2026-10-15",
    },
  ],
  "4": [
    {
      id: "rev_5",
      userName: "Hoàng Minh",
      rating: 5,
      comment: "Kinh điển! Tuổi thơ của biết bao nhiêu thế hệ độc giả yêu thích phép thuật.",
      date: "2026-10-12",
    },
  ],
};

/**
 * Tính điểm đánh giá trung bình từ mảng reviews (Bài tập 3)
 */
export function calculateAverageRating(reviews: Review[]): number {
  if (!reviews || reviews.length === 0) return 5.0;
  const total = reviews.reduce((sum, item) => sum + item.rating, 0);
  const avg = total / reviews.length;
  return Math.round(avg * 10) / 10;
}
