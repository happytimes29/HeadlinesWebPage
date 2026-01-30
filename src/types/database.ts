export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          slug: string;
          locale: string;
          title: string;
          content: string;
          category: string | null;
          summary: string | null;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          locale?: string;
          title: string;
          content: string;
          category?: string | null;
          summary?: string | null;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          locale?: string;
          title?: string;
          content?: string;
          category?: string | null;
          summary?: string | null;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
