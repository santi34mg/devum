export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      Posts: {
        Row: {
          created_at: string
          id: number
          post_caption: string
          post_title: string
          project_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          post_caption: string
          post_title?: string
          project_id: number
        }
        Update: {
          created_at?: string
          id?: number
          post_caption?: string
          post_title?: string
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Posts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Proyect"
            referencedColumns: ["id"]
          },
        ]
      }
      PostsTags: {
        Row: {
          created_at: string
          id: number
          post_id: number | null
          tag: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id?: number | null
          tag?: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number | null
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "PostsTags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["id"]
          },
        ]
      }
      Proyect: {
        Row: {
          created_at: string
          deadline: string | null
          general_description: string | null
          id: number
          published_by: string
          requirements_description: string
          title: string
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          general_description?: string | null
          id?: number
          published_by?: string
          requirements_description?: string
          title?: string
        }
        Update: {
          created_at?: string
          deadline?: string | null
          general_description?: string | null
          id?: number
          published_by?: string
          requirements_description?: string
          title?: string
        }
        Relationships: []
      }
      Student: {
        Row: {
          career_year: number
          created_at: string
          first_name: string | null
          gender: string
          general_mark_avg: number
          has_past_experience: boolean
          id: number
          last_name: string | null
          passed_credits: number
          passed_make_avg: number
          personal_email: string | null
          phone_number: string | null
          university_email: string | null
        }
        Insert: {
          career_year: number
          created_at?: string
          first_name?: string | null
          gender?: string
          general_mark_avg: number
          has_past_experience: boolean
          id?: number
          last_name?: string | null
          passed_credits: number
          passed_make_avg: number
          personal_email?: string | null
          phone_number?: string | null
          university_email?: string | null
        }
        Update: {
          career_year?: number
          created_at?: string
          first_name?: string | null
          gender?: string
          general_mark_avg?: number
          has_past_experience?: boolean
          id?: number
          last_name?: string | null
          passed_credits?: number
          passed_make_avg?: number
          personal_email?: string | null
          phone_number?: string | null
          university_email?: string | null
        }
        Relationships: []
      }
      StudentLikesPost: {
        Row: {
          created_at: string
          id: number
          post_id: number | null
          student_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          post_id?: number | null
          student_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number | null
          student_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "StudentLikesPost_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "StudentLikesPost_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
