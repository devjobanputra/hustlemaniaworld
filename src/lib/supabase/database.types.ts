export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
      tees: {
        Row: {
          id: string;
          name: string;
          price: number;
          description: string;
          stock: Json;
          is_limited: boolean;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          description: string;
          stock: Json;
          is_limited?: boolean;
          image_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          description?: string;
          stock?: Json;
          is_limited?: boolean;
          image_url?: string;
          created_at?: string;
        };
      };
      drops: {
        Row: {
          id: string;
          drop_name: string;
          launch_timestamp: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          drop_name: string;
          launch_timestamp: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          drop_name?: string;
          launch_timestamp?: string;
          is_active?: boolean;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          total_amount: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_amount: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_amount?: number;
          status?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
