export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      diagnoses: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          last_name: string
          first_name: string
          last_name_kana: string | null
          first_name_kana: string | null
          birth_date: string
          birth_time: string | null
          birth_prefecture: string | null
          gender: string
          core_value: string | null
          stage1_results: Json
          stage2_and_3_results: Json | null
          fortune_raw_data: Json | null
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          last_name: string
          first_name: string
          last_name_kana?: string | null
          first_name_kana?: string | null
          birth_date: string
          birth_time?: string | null
          birth_prefecture?: string | null
          gender: string
          core_value?: string | null
          stage1_results: Json
          stage2_and_3_results?: Json | null
          fortune_raw_data?: Json | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          last_name?: string
          first_name?: string
          last_name_kana?: string | null
          first_name_kana?: string | null
          birth_date?: string
          birth_time?: string | null
          birth_prefecture?: string | null
          gender?: string
          core_value?: string | null
          stage1_results?: Json
          stage2_and_3_results?: Json | null
          fortune_raw_data?: Json | null
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      serial_codes: {
        Row: {
          id: string
          code: string
          diagnosis_id: string
          created_at: string
          used_at: string | null
          is_used: boolean
          access_count: number
          last_access_ip: string | null
          last_access_at: string | null
        }
        Insert: {
          id?: string
          code: string
          diagnosis_id: string
          created_at?: string
          used_at?: string | null
          is_used?: boolean
          access_count?: number
          last_access_ip?: string | null
          last_access_at?: string | null
        }
        Update: {
          id?: string
          code?: string
          diagnosis_id?: string
          created_at?: string
          used_at?: string | null
          is_used?: boolean
          access_count?: number
          last_access_ip?: string | null
          last_access_at?: string | null
        }
      }
      line_integrations: {
        Row: {
          id: string
          serial_code_id: string | null
          clicked_at: string
          line_user_id: string | null
          integrated_at: string | null
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          serial_code_id?: string | null
          clicked_at?: string
          line_user_id?: string | null
          integrated_at?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          serial_code_id?: string | null
          clicked_at?: string
          line_user_id?: string | null
          integrated_at?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      app_settings: {
        Row: {
          id: string
          key: string
          value: string
          description: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          value: string
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: string
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
      }
      image_assets: {
        Row: {
          id: string
          category: string
          key: string
          display_name: string
          file_name: string
          storage_url: string
          file_size: number | null
          mime_type: string | null
          width: number | null
          height: number | null
          uploaded_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: string
          key: string
          display_name: string
          file_name: string
          storage_url: string
          file_size?: number | null
          mime_type?: string | null
          width?: number | null
          height?: number | null
          uploaded_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: string
          key?: string
          display_name?: string
          file_name?: string
          storage_url?: string
          file_size?: number | null
          mime_type?: string | null
          width?: number | null
          height?: number | null
          uploaded_at?: string
          updated_at?: string
        }
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
  }
}
