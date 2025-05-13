export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      license: {
        Row: {
          end_date: string | null
          id: string
          license_key: string
          organization_id: string
          start_date: string
          status: string
          users_allowed: number
        }
        Insert: {
          end_date?: string | null
          id?: string
          license_key: string
          organization_id: string
          start_date?: string
          status?: string
          users_allowed: number
        }
        Update: {
          end_date?: string | null
          id?: string
          license_key?: string
          organization_id?: string
          start_date?: string
          status?: string
          users_allowed?: number
        }
        Relationships: [
          {
            foreignKeyName: "license_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
        ]
      }
      license_module: {
        Row: {
          license_id: string
          module_id: string
        }
        Insert: {
          license_id: string
          module_id: string
        }
        Update: {
          license_id?: string
          module_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "license_module_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "license"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "license_module_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "module"
            referencedColumns: ["id"]
          },
        ]
      }
      module: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      organization: {
        Row: {
          contact_email: string
          created_at: string | null
          id: string
          name: string
          status: string
        }
        Insert: {
          contact_email: string
          created_at?: string | null
          id?: string
          name: string
          status?: string
        }
        Update: {
          contact_email?: string
          created_at?: string | null
          id?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          last_login: string | null
          organization_id: string
          role_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          last_login?: string | null
          organization_id: string
          role_id: string
          status?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          last_login?: string | null
          organization_id?: string
          role_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
        ]
      }
      role: {
        Row: {
          id: string
          name: string
          organization_id: string
          permissions: Json | null
        }
        Insert: {
          id?: string
          name: string
          organization_id: string
          permissions?: Json | null
        }
        Update: {
          id?: string
          name?: string
          organization_id?: string
          permissions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "role_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
        ]
      }
      session: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          profile_id: string
          status: string
          token: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          profile_id: string
          status?: string
          token: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          profile_id?: string
          status?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
